const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;
const LEFT_MARGIN = 38;
const RIGHT_MARGIN = 38;
const TOP_MARGIN = 56;
const BOTTOM_MARGIN = 52;
const FONT_SIZE = 11;
const LINE_HEIGHT = 18;
const MAX_CHARS_PER_LINE = 84;

type LineKind =
  | "title"
  | "subtitle"
  | "section"
  | "separator"
  | "body"
  | "empty"
  | "highlight"
  | "columns"
  | "meta"
  | "note"
  | "legal";

type PreparedLine = {
  text: string;
  kind: LineKind;
  left?: string;
  right?: string;
};

function sanitizeText(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[•·]/g, "|")
    .replace(/¢/g, "L");
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

    if (!current) {
      chunks.push(word.slice(0, maxChars));
      current = word.slice(maxChars);
      continue;
    }

    chunks.push(current);
    current = word;
  }

  if (current) chunks.push(current);
  return chunks;
}

function lineHeight(line: PreparedLine) {
  switch (line.kind) {
    case "title":
      return 36;
    case "meta":
      return 23;
    case "subtitle":
      return 20;
    case "section":
      return 30;
    case "highlight":
      return 24;
    case "legal":
      return 20;
    case "columns":
      return 20;
    case "empty":
      return 12;
    default:
      return LINE_HEIGHT;
  }
}

function fontSizeFor(line: PreparedLine) {
  switch (line.kind) {
    case "title":
      return 20;
    case "meta":
      return 10;
    case "subtitle":
      return 10;
    case "section":
      return 13;
    case "highlight":
      return 12;
    case "note":
      return 10;
    default:
      return FONT_SIZE;
  }
}

function estimateTextWidth(text: string, size: number) {
  return sanitizeText(text).length * size * 0.48;
}

function xForCentered(text: string, fontSize: number) {
  const width = estimateTextWidth(text, fontSize);
  return Math.max(LEFT_MARGIN, (PAGE_WIDTH - width) / 2);
}

function parseLine(line: string): PreparedLine {
  if (!line.trim()) return { text: "", kind: "empty" };

  if (line.startsWith("@title ")) return { text: line.slice(7).trim(), kind: "title" };
  if (line.startsWith("@meta ")) return { text: line.slice(6).trim(), kind: "meta" };
  if (line.startsWith("@section ")) return { text: line.slice(9).trim(), kind: "section" };
  if (line.startsWith("@highlight ")) return { text: line.slice(11).trim(), kind: "highlight" };
  if (line.startsWith("@legal ")) return { text: line.slice(7).trim(), kind: "legal" };
  if (line.startsWith("@note ")) return { text: line.slice(6).trim(), kind: "note" };

  if (line.startsWith("@row ")) {
    const row = line.slice(5);
    const [left, right] = row.split("||").map((x) => x?.trim() ?? "");
    return {
      text: row,
      kind: "columns",
      left: left ?? "",
      right: right ?? "",
    };
  }

  if (/^[-_]{20,}$/.test(line)) return { text: line, kind: "separator" };
  return { text: line, kind: "body" };
}

function splitContent(lines: string[]) {
  const prepared: PreparedLine[] = [];

  for (const rawLine of lines) {
    const parsed = parseLine(rawLine);

    if (parsed.kind === "columns" && parsed.left && parsed.right) {
      const rightWidth = Math.max(parsed.right.length, 12);
      const maxLeft = Math.max(30, MAX_CHARS_PER_LINE - rightWidth - 8);
      const leftChunks = wrapLine(parsed.left, maxLeft);
      const rightChunks = wrapLine(parsed.right, rightWidth + 6);
      const maxChunks = Math.max(leftChunks.length, rightChunks.length);

      for (let i = 0; i < maxChunks; i += 1) {
        prepared.push({
          kind: "columns",
          text: `${leftChunks[i] ?? ""} || ${rightChunks[i] ?? ""}`,
          left: leftChunks[i] ?? "",
          right: rightChunks[i] ?? "",
        });
      }

      continue;
    }

    for (const chunk of wrapLine(parsed.text, MAX_CHARS_PER_LINE)) {
      prepared.push({ ...parsed, text: chunk });
    }
  }

  return prepared;
}

function renderLine(line: PreparedLine, y: number) {
  const fontSize = fontSizeFor(line);
  const contentWidth = PAGE_WIDTH - LEFT_MARGIN - RIGHT_MARGIN;
  const toRgb = (r: number, g: number, b: number) =>
    `${(r / 255).toFixed(3)} ${(g / 255).toFixed(3)} ${(b / 255).toFixed(3)}`;
  const fill = (r: number, g: number, b: number) => `${toRgb(r, g, b)} rg\n`;

  if (line.kind === "empty") return "";
  if (line.kind === "separator") {
    return `${toRgb(203, 213, 225)} RG 0.8 w ${LEFT_MARGIN} ${y} m ${PAGE_WIDTH - RIGHT_MARGIN} ${y} l S\n`;
  }

  if (line.kind === "columns" && line.left !== undefined && line.right !== undefined) {
    const left = escapePdfText(line.left);
    const right = escapePdfText(line.right);
    const rightX = PAGE_WIDTH - RIGHT_MARGIN - estimateTextWidth(line.right, FONT_SIZE);
    return `${fill(248, 250, 252)}${LEFT_MARGIN - 5} ${y - 5} ${contentWidth + 10} 18 re f\n` +
      `${toRgb(100, 116, 139)} RG 0.2 w ${LEFT_MARGIN - 5} ${y - 5} ${contentWidth + 10} 18 re S\n` +
      `${fill(15, 23, 42)}BT /F1 ${FONT_SIZE} Tf 1 0 0 1 ${LEFT_MARGIN} ${y} Tm (${left}) Tj ET\n` +
      `${fill(30, 64, 175)}BT /F1 ${FONT_SIZE} Tf 1 0 0 1 ${Math.max(
      LEFT_MARGIN + 210,
      rightX,
    )} ${y} Tm (${right}) Tj ET\n`;
  }

  if (line.kind === "title") {
    const x = xForCentered(line.text, fontSize);
    const escaped = escapePdfText(line.text);
    return `${fill(30, 64, 175)}${LEFT_MARGIN - 8} ${y - 12} ${contentWidth + 16} 30 re f\n` +
      `${fill(255, 255, 255)}BT /F1 ${fontSize} Tf 1 0 0 1 ${x} ${y} Tm (${escaped}) Tj ET\n`;
  }

  if (line.kind === "meta") {
    const x = xForCentered(line.text, fontSize);
    const escaped = escapePdfText(line.text);
    return `${fill(51, 65, 85)}BT /F1 ${fontSize} Tf 1 0 0 1 ${x} ${y} Tm (${escaped}) Tj ET\n`;
  }

  if (line.kind === "section") {
    const escaped = escapePdfText(line.text.toUpperCase());
    return `${fill(219, 234, 254)}${LEFT_MARGIN - 6} ${y - 9} ${contentWidth + 12} 22 re f\n` +
      `${fill(30, 64, 175)}BT /F1 ${fontSize} Tf 1 0 0 1 ${LEFT_MARGIN} ${y} Tm (${escaped}) Tj ET\n`;
  }

  if (line.kind === "highlight") {
    const left = escapePdfText("TOTAL");
    const right = escapePdfText(line.text.replace(/^Total exigible\s*\|\|\s*/i, ""));
    const rightX = PAGE_WIDTH - RIGHT_MARGIN - estimateTextWidth(right, 13);
    return `${fill(239, 246, 255)}${LEFT_MARGIN - 5} ${y - 7} ${contentWidth + 10} 22 re f\n` +
      `${toRgb(30, 64, 175)} RG 1 w ${LEFT_MARGIN - 5} ${y - 7} ${contentWidth + 10} 22 re S\n` +
      `${fill(30, 64, 175)}BT /F1 11 Tf 1 0 0 1 ${LEFT_MARGIN} ${y} Tm (${left}) Tj ET\n` +
      `${fill(15, 23, 42)}BT /F1 13 Tf 1 0 0 1 ${Math.max(LEFT_MARGIN + 210, rightX)} ${y} Tm (${right}) Tj ET\n`;
  }

  if (line.kind === "legal") {
    const escaped = escapePdfText(line.text);
    return `${fill(71, 85, 105)}BT /F1 ${fontSize} Tf 1 0 0 1 ${LEFT_MARGIN + 6} ${y} Tm (${escaped}) Tj ET\n`;
  }

  if (line.kind === "note") {
    const escaped = escapePdfText(line.text);
    const x = xForCentered(line.text, fontSize);
    return `${fill(100, 116, 139)}BT /F1 ${fontSize} Tf 1 0 0 1 ${x} ${y} Tm (${escaped}) Tj ET\n`;
  }

  const escaped = escapePdfText(line.text);
  return `${fill(17, 24, 39)}BT /F1 ${fontSize} Tf 1 0 0 1 ${LEFT_MARGIN} ${y} Tm (${escaped}) Tj ET\n`;
}

function buildPdf(pages: string[]) {
  const objects: string[] = [];

  const addObject = (content: string) => {
    objects.push(content);
    return objects.length;
  };

  const fontObjectId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");

  const pageObjectIds: number[] = [];

  for (const content of pages) {
    const stream = `<< /Length ${content.length} >>\nstream\n${content}endstream`;
    const contentObjectId = addObject(stream);
    const pageObjectId = addObject(
      `<< /Type /Page /Parent 0 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 ${fontObjectId} 0 R >> >> /Contents ${contentObjectId} 0 R >>`,
    );
    pageObjectIds.push(pageObjectId);
  }

  const pagesObjectId = addObject(
    `<< /Type /Pages /Kids [${pageObjectIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageObjectIds.length} >>`,
  );

  for (const pageId of pageObjectIds) {
    objects[pageId - 1] = objects[pageId - 1].replace("/Parent 0 0 R", `/Parent ${pagesObjectId} 0 R`);
  }

  const catalogObjectId = addObject(`<< /Type /Catalog /Pages ${pagesObjectId} 0 R >>`);

  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [0];

  objects.forEach((obj, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${obj}\nendobj\n`;
  });

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";

  for (let i = 1; i <= objects.length; i += 1) {
    pdf += `${offsets[i].toString().padStart(10, "0")} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogObjectId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new TextEncoder().encode(pdf);
}

export function createSimplePdf(lines: string[]) {
  const preparedLines = splitContent(lines);
  const pages: string[] = [];

  let currentPage = "";
  let y = PAGE_HEIGHT - TOP_MARGIN;

  for (const line of preparedLines) {
    const needed = lineHeight(line);

    if (y - needed < BOTTOM_MARGIN) {
      pages.push(currentPage);
      currentPage = "";
      y = PAGE_HEIGHT - TOP_MARGIN;
    }

    y -= needed;
    currentPage += renderLine(line, y);
  }

  if (currentPage) pages.push(currentPage);
  if (pages.length === 0) pages.push("");

  return buildPdf(pages);
}

export function downloadPdf(lines: string[], filename: string) {
  if (typeof window === "undefined") return;

  const bytes = createSimplePdf(lines);
  const blob = new Blob([bytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.style.display = "none";

  document.body.appendChild(link);
  link.click();

  window.setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 1000);
}
