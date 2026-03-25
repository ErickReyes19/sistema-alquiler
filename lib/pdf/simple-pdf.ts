const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;
const LEFT_MARGIN = 40;
const RIGHT_MARGIN = 40;
const TOP_MARGIN = 44;
const BOTTOM_MARGIN = 44;
const FONT_SIZE = 11;
const LINE_HEIGHT = 15;
const MAX_CHARS_PER_LINE = 92;

const BRAND_BLUE = "0.09 0.24 0.49";
const BRAND_SOFT = "0.94 0.96 0.99";
const MUTED_TEXT = "0.28 0.28 0.28";

const SEP_REGEX = /^[-_]{20,}$/;
const SECTION_REGEX = /^[IVX]+\./;

function sanitizeText(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"');
}

function escapePdfText(text: string) {
  return sanitizeText(text).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrapLine(line: string, maxChars: number) {
  if (line.length <= maxChars) return [line];

  const words = line.split(" ");
  const chunks: string[] = [];
  let current = "";

  for (const word of words) {
    const tentative = current ? `${current} ${word}` : word;
    if (tentative.length <= maxChars) {
      current = tentative;
      continue;
    }

    if (current) {
      chunks.push(current);
      current = word;
    } else {
      chunks.push(word.slice(0, maxChars));
      current = word.slice(maxChars);
    }
  }

  if (current) chunks.push(current);
  return chunks;
}

type PreparedLine = {
  text: string;
  kind: "title" | "subtitle" | "section" | "separator" | "body" | "empty" | "highlight" | "columns";
};

function classifyLine(line: string, index: number): PreparedLine {
  if (!line.trim()) return { text: "", kind: "empty" };
  if (SEP_REGEX.test(line)) return { text: line, kind: "separator" };
  if (line.includes(" || ")) return { text: line, kind: "columns" };
  if (line.startsWith("!! ")) return { text: line.replace(/^!!\s*/, ""), kind: "highlight" };
  if (index === 0) return { text: line, kind: "title" };
  if (index === 1) return { text: line, kind: "subtitle" };
  if (SECTION_REGEX.test(line)) return { text: line, kind: "section" };
  return { text: line, kind: "body" };
}

function splitContent(lines: string[]) {
  const prepared: PreparedLine[] = [];

  for (let i = 0; i < lines.length; i += 1) {
    const classified = classifyLine(lines[i], i);
    if (classified.kind === "empty" || classified.kind === "separator") {
      prepared.push(classified);
      continue;
    }

    for (const chunk of wrapLine(classified.text, MAX_CHARS_PER_LINE)) {
      prepared.push({ ...classified, text: chunk });
    }
  }

  return prepared;
}

function lineHeight(line: PreparedLine) {
  if (line.kind === "title") return 24;
  if (line.kind === "subtitle") return 20;
  if (line.kind === "section") return 19;
  if (line.kind === "highlight") return 18;
  if (line.kind === "columns") return 18;
  return LINE_HEIGHT;
}

function buildPages(lines: string[]) {
  const prepared = splitContent(lines);
  const pages: PreparedLine[][] = [];
  let currentPage: PreparedLine[] = [];
  let usedHeight = 0;
  const usableHeight = PAGE_HEIGHT - TOP_MARGIN - BOTTOM_MARGIN - 54;

  for (const line of prepared) {
    const needed = lineHeight(line);
    if (usedHeight + needed > usableHeight && currentPage.length > 0) {
      pages.push(currentPage);
      currentPage = [];
      usedHeight = 0;
    }

    currentPage.push(line);
    usedHeight += needed;
  }

  if (currentPage.length === 0) currentPage.push({ text: "", kind: "empty" });
  pages.push(currentPage);

  return pages;
}

function xForCentered(text: string, fontSize: number) {
  const roughWidth = sanitizeText(text).length * (fontSize * 0.48);
  return Math.max(LEFT_MARGIN, (PAGE_WIDTH - roughWidth) / 2);
}

function renderHeader(commands: string[], totalPages: number, pageNumber: number) {
  commands.push(`${BRAND_SOFT} rg`);
  commands.push(`${LEFT_MARGIN} ${PAGE_HEIGHT - TOP_MARGIN - 12} ${PAGE_WIDTH - LEFT_MARGIN - RIGHT_MARGIN} 42 re f`);
  commands.push("0 g");
  commands.push(`${BRAND_BLUE} RG`);
  commands.push("1.4 w");
  commands.push(`${LEFT_MARGIN} ${PAGE_HEIGHT - TOP_MARGIN - 12} m ${PAGE_WIDTH - RIGHT_MARGIN} ${PAGE_HEIGHT - TOP_MARGIN - 12} l S`);

  commands.push("BT");
  commands.push("/F2 10 Tf");
  commands.push(`${BRAND_BLUE} rg`);
  commands.push(`1 0 0 1 ${LEFT_MARGIN + 8} ${PAGE_HEIGHT - TOP_MARGIN + 4} Tm (Sistema de Gestion de Alquileres) Tj`);
  commands.push("ET");

  commands.push("BT");
  commands.push("/F1 9 Tf");
  commands.push(`${MUTED_TEXT} rg`);
  commands.push(
    `1 0 0 1 ${PAGE_WIDTH - RIGHT_MARGIN - 120} ${PAGE_HEIGHT - TOP_MARGIN + 4} Tm (Pagina ${pageNumber} de ${totalPages}) Tj`,
  );
  commands.push("ET");
}

function renderFooter(commands: string[]) {
  commands.push(`${BRAND_BLUE} RG`);
  commands.push("0.8 w");
  commands.push(`${LEFT_MARGIN} ${BOTTOM_MARGIN + 14} m ${PAGE_WIDTH - RIGHT_MARGIN} ${BOTTOM_MARGIN + 14} l S`);
}

export function createSimplePdf(lines: string[]) {
  const pages = buildPages(lines);
  const objects: string[] = [];
  const kids: number[] = [];

  objects.push("<< /Type /Catalog /Pages 2 0 R >>");
  objects.push("__PAGES__");

  const regularFontObjectNumber = 3;
  const boldFontObjectNumber = 4;
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");

  pages.forEach((pageLines, pageIndex) => {
    const contentCommands: string[] = [];
    renderHeader(contentCommands, pages.length, pageIndex + 1);

    let currentY = PAGE_HEIGHT - TOP_MARGIN - 42;

    for (const line of pageLines) {
      if (line.kind === "separator") {
        currentY -= 6;
        contentCommands.push(`${BRAND_BLUE} RG`);
        contentCommands.push("1 w");
        contentCommands.push(`${LEFT_MARGIN} ${currentY} m ${PAGE_WIDTH - RIGHT_MARGIN} ${currentY} l S`);
        currentY -= 10;
        continue;
      }

      if (line.kind === "empty") {
        currentY -= LINE_HEIGHT - 2;
        continue;
      }

      if (line.kind === "columns") {
        const [left, right] = line.text.split(" || ").map((part) => part.trim());
        const midPoint = PAGE_WIDTH / 2;
        contentCommands.push("BT");
        contentCommands.push("/F1 11 Tf");
        contentCommands.push(`${MUTED_TEXT} rg`);
        contentCommands.push(`1 0 0 1 ${LEFT_MARGIN} ${currentY} Tm (${escapePdfText(left ?? "")}) Tj`);
        contentCommands.push("ET");
        contentCommands.push("BT");
        contentCommands.push("/F1 11 Tf");
        contentCommands.push(`${MUTED_TEXT} rg`);
        contentCommands.push(`1 0 0 1 ${midPoint + 12} ${currentY} Tm (${escapePdfText(right ?? "")}) Tj`);
        contentCommands.push("ET");
        currentY -= lineHeight(line);
        continue;
      }

      const isCentered = line.kind === "title" || line.kind === "subtitle";
      const fontSize =
        line.kind === "title"
          ? 15
          : line.kind === "subtitle"
            ? 10
            : line.kind === "section"
              ? 12
              : line.kind === "highlight"
                ? 11
                : FONT_SIZE;
      const fontRef = line.kind === "body" ? "/F1" : "/F2";
      const x = isCentered ? xForCentered(line.text, fontSize) : LEFT_MARGIN;

      if (line.kind === "highlight") {
        const highlightWidth = PAGE_WIDTH - LEFT_MARGIN - RIGHT_MARGIN;
        const highlightHeight = 14;
        contentCommands.push(`${BRAND_SOFT} rg`);
        contentCommands.push(`${LEFT_MARGIN} ${currentY - 3} ${highlightWidth} ${highlightHeight} re f`);
      }

      contentCommands.push("BT");
      contentCommands.push(`${fontRef} ${fontSize} Tf`);
      contentCommands.push(`${line.kind === "body" ? MUTED_TEXT : BRAND_BLUE} rg`);
      contentCommands.push(
        `1 0 0 1 ${line.kind === "highlight" ? xForCentered(line.text, fontSize) : x} ${currentY} Tm (${escapePdfText(line.text)}) Tj`,
      );
      contentCommands.push("ET");

      currentY -= lineHeight(line);
    }

    renderFooter(contentCommands);

    const contentStream = contentCommands.join("\n");
    const contentObjectNumber = objects.length + 1;
    objects.push(`<< /Length ${contentStream.length} >>\nstream\n${contentStream}\nendstream`);

    const pageObjectNumber = objects.length + 1;
    kids.push(pageObjectNumber);
    objects.push(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 ${regularFontObjectNumber} 0 R /F2 ${boldFontObjectNumber} 0 R >> >> /Contents ${contentObjectNumber} 0 R >>`,
    );
  });

  objects[1] = `<< /Type /Pages /Kids [${kids.map((id) => `${id} 0 R`).join(" ")}] /Count ${kids.length} >>`;

  let body = "%PDF-1.4\n";
  const offsets: number[] = [0];

  for (let index = 0; index < objects.length; index += 1) {
    offsets.push(body.length);
    body += `${index + 1} 0 obj\n${objects[index]}\nendobj\n`;
  }

  const xrefOffset = body.length;
  body += `xref\n0 ${objects.length + 1}\n`;
  body += "0000000000 65535 f \n";

  for (let index = 1; index < offsets.length; index += 1) {
    body += `${offsets[index].toString().padStart(10, "0")} 00000 n \n`;
  }

  body += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new TextEncoder().encode(body);
}

export function downloadPdf(lines: string[], filename: string) {
  const bytes = createSimplePdf(lines);
  const blob = new Blob([bytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
