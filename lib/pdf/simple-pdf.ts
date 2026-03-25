const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;
const LEFT_MARGIN = 40;
const TOP_MARGIN = 50;
const BOTTOM_MARGIN = 40;
const FONT_SIZE = 11;
const LINE_HEIGHT = 15;
const MAX_CHARS_PER_LINE = 92;

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

function buildPages(lines: string[]) {
  const maxLinesPerPage = Math.floor((PAGE_HEIGHT - TOP_MARGIN - BOTTOM_MARGIN) / LINE_HEIGHT);
  const prepared: string[] = [];

  for (const line of lines) {
    if (!line.trim()) {
      prepared.push("");
      continue;
    }

    prepared.push(...wrapLine(line, MAX_CHARS_PER_LINE));
  }

  const pages: string[][] = [];
  for (let i = 0; i < prepared.length; i += maxLinesPerPage) {
    pages.push(prepared.slice(i, i + maxLinesPerPage));
  }

  return pages.length ? pages : [[""]];
}

export function createSimplePdf(lines: string[]) {
  const pages = buildPages(lines);
  const objects: string[] = [];
  const kids: number[] = [];

  objects.push("<< /Type /Catalog /Pages 2 0 R >>");
  objects.push("__PAGES__");

  const fontObjectNumber = 3;
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");

  for (const pageLines of pages) {
    const contentCommands: string[] = ["BT", `/F1 ${FONT_SIZE} Tf`];
    let currentY = PAGE_HEIGHT - TOP_MARGIN;

    for (const line of pageLines) {
      contentCommands.push(`1 0 0 1 ${LEFT_MARGIN} ${currentY} Tm (${escapePdfText(line)}) Tj`);
      currentY -= LINE_HEIGHT;
    }

    contentCommands.push("ET");
    const contentStream = contentCommands.join("\n");

    const contentObjectNumber = objects.length + 1;
    objects.push(`<< /Length ${contentStream.length} >>\nstream\n${contentStream}\nendstream`);

    const pageObjectNumber = objects.length + 1;
    kids.push(pageObjectNumber);
    objects.push(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 ${fontObjectNumber} 0 R >> >> /Contents ${contentObjectNumber} 0 R >>`,
    );
  }

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
