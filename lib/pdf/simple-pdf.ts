const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;
const LEFT_MARGIN = 40;
const RIGHT_MARGIN = 40;
const TOP_MARGIN = 44;
const BOTTOM_MARGIN = 44;
const FONT_SIZE = 11;
const LINE_HEIGHT = 15;
const MAX_CHARS_PER_LINE = 92;

type LineKind =
  | "title"
  | "subtitle"
  | "section"
  | "separator"
  | "body"
  | "empty"
  | "highlight"
  | "columns";

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
      return 24;
    case "subtitle":
      return 18;
    case "section":
      return 19;
    case "highlight":
      return 17;
    case "columns":
      return 16;
    case "empty":
      return 10;
    default:
      return LINE_HEIGHT;
  }
}

function fontSizeFor(line: PreparedLine) {
  switch (line.kind) {
    case "title":
      return 17;
    case "subtitle":
      return 10;
    case "section":
      return 12;
    case "highlight":
      return 11;
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
  if (line.startsWith("@meta ")) return { text: line.slice(6).trim(), kind: "subtitle" };
  if (line.startsWith("@section ")) return { text: line.slice(9).trim(), kind: "section" };
  if (line.startsWith("@highlight ")) return { text: line.slice(11).trim(), kind: "highlight" };
  if (line.startsWith("@legal ")) return { text: line.slice(7).trim(), kind: "body" };
  if (line.startsWith("@note ")) return { text: line.slice(6).trim(), kind: "subtitle" };

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

  if (line.kind === "empty") return "";
  if (line.kind === "separator") {
    return `0.7 w ${LEFT_MARGIN} ${y} m ${PAGE_WIDTH - RIGHT_MARGIN} ${y} l S\n`;
  }

  if (line.kind === "columns" && line.left !== undefined && line.right !== undefined) {
    const left = escapePdfText(line.left);
    const right = escapePdfText(line.right);
    const rightX = PAGE_WIDTH - RIGHT_MARGIN - estimateTextWidth(line.right, FONT_SIZE);
    return `BT /F1 ${FONT_SIZE} Tf 1 0 0 1 ${LEFT_MARGIN} ${y} Tm (${left}) Tj ET\nBT /F1 ${FONT_SIZE} Tf 1 0 0 1 ${Math.max(
      LEFT_MARGIN + 210,
      rightX,
    )} ${y} Tm (${right}) Tj ET\n`;
  }

  const escaped = escapePdfText(line.text);
  let x = LEFT_MARGIN;

  if (line.kind === "title" || line.kind === "subtitle") {
    x = xForCentered(line.text, fontSize);
  }

  return `BT /F1 ${fontSize} Tf 1 0 0 1 ${x} ${y} Tm (${escaped}) Tj ET\n`;
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
  const bytes = createSimplePdf(lines);
  const blob = new Blob([bytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
