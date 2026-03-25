const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;
const LEFT_MARGIN = 54;
const RIGHT_MARGIN = 54;
const TOP_MARGIN = 64;
const BOTTOM_MARGIN = 58;

type PdfBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "spacer"; size?: number }
  | { type: "signature"; leftLabel: string; rightLabel: string };

export type PdfDocumentDefinition = {
  title: string;
  subtitle?: string;
  metadataLine?: string;
  blocks: PdfBlock[];
  footer?: string;
};

type FontName = "regular" | "bold";
type PreparedLine = {
  type: "line";
  text: string;
  size: number;
  font: FontName;
  color: [number, number, number];
  indent?: number;
  marginTop?: number;
  marginBottom?: number;
};

type SignatureRow = {
  type: "signature";
  leftLabel: string;
  rightLabel: string;
};

type PreparedElement = PreparedLine | SignatureRow;

function sanitizeText(text: string) {
  return text
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[•·]/g, "-");
}

function escapePdfText(text: string) {
  const safe = sanitizeText(text);
  let encoded = "";

  for (const char of safe) {
    if (char === "\\") {
      encoded += "\\\\";
      continue;
    }

    if (char === "(") {
      encoded += "\\(";
      continue;
    }

    if (char === ")") {
      encoded += "\\)";
      continue;
    }

    const code = char.charCodeAt(0);
    if (code >= 32 && code <= 126) {
      encoded += char;
      continue;
    }

    if (code <= 255) {
      encoded += `\\${code.toString(8).padStart(3, "0")}`;
      continue;
    }

    encoded += "?";
  }

  return encoded;
}

function estimateTextWidth(text: string, size: number) {
  return sanitizeText(text).length * size * 0.49;
}

function wrapText(text: string, maxWidth: number, size: number) {
  const safe = sanitizeText(text).trim();
  if (!safe) return [""];

  const words = safe.split(/\s+/);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const tentative = current ? `${current} ${word}` : word;
    if (estimateTextWidth(tentative, size) <= maxWidth) {
      current = tentative;
      continue;
    }

    if (!current) {
      lines.push(word);
      continue;
    }

    lines.push(current);
    current = word;
  }

  if (current) lines.push(current);
  return lines;
}

function prepareElements(def: PdfDocumentDefinition): PreparedElement[] {
  const elements: PreparedElement[] = [
    {
      type: "line",
      text: def.title,
      size: 20,
      font: "bold",
      color: [17, 24, 39],
      marginBottom: 8,
    },
  ];

  if (def.subtitle) {
    elements.push({
      type: "line",
      text: def.subtitle,
      size: 12,
      font: "regular",
      color: [55, 65, 81],
      marginBottom: 4,
    });
  }

  if (def.metadataLine) {
    elements.push({
      type: "line",
      text: def.metadataLine,
      size: 10,
      font: "regular",
      color: [107, 114, 128],
      marginBottom: 16,
    });
  }

  elements.push({
    type: "line",
    text: "",
    size: 11,
    font: "regular",
    color: [31, 41, 55],
    marginBottom: 8,
  });

  for (const block of def.blocks) {
    if (block.type === "spacer") {
      elements.push({
        type: "line",
        text: "",
        size: 10,
        font: "regular",
        color: [31, 41, 55],
        marginBottom: block.size ?? 10,
      });
      continue;
    }

    if (block.type === "heading") {
      elements.push({
        type: "line",
        text: block.text,
        size: 13,
        font: "bold",
        color: [30, 64, 175],
        marginTop: 10,
        marginBottom: 4,
      });
      continue;
    }

    if (block.type === "paragraph") {
      const maxWidth = PAGE_WIDTH - LEFT_MARGIN - RIGHT_MARGIN;
      const lines = wrapText(block.text, maxWidth, 11);
      lines.forEach((line, index) => {
        elements.push({
          type: "line",
          text: line,
          size: 11,
          font: "regular",
          color: [31, 41, 55],
          marginBottom: index === lines.length - 1 ? 8 : 2,
        });
      });
      continue;
    }

    if (block.type === "list") {
      const maxWidth = PAGE_WIDTH - LEFT_MARGIN - RIGHT_MARGIN - 14;
      for (const item of block.items) {
        const lines = wrapText(item, maxWidth, 11);
        lines.forEach((line, index) => {
          elements.push({
            type: "line",
            text: line,
            size: 11,
            font: "regular",
            color: [31, 41, 55],
            indent: index === 0 ? 14 : 24,
            marginBottom: index === lines.length - 1 ? 4 : 2,
          });
        });
      }
      elements.push({ type: "line", text: "", size: 11, font: "regular", color: [31, 41, 55], marginBottom: 4 });
      continue;
    }

    elements.push({
      type: "signature",
      leftLabel: block.leftLabel,
      rightLabel: block.rightLabel,
    });
  }

  if (def.footer) {
    elements.push({ type: "line", text: "", size: 10, font: "regular", color: [31, 41, 55], marginBottom: 10 });
    elements.push({
      type: "line",
      text: def.footer,
      size: 9,
      font: "regular",
      color: [107, 114, 128],
    });
  }

  return elements;
}

function renderTextLine(line: PreparedLine, y: number) {
  const [r, g, b] = line.color;
  const x = LEFT_MARGIN + (line.indent ?? 0);
  const escaped = escapePdfText(line.text);
  const fontRef = line.font === "bold" ? "/F2" : "/F1";

  const prefix =
    line.indent === 14 && line.text ? `BT /F1 11 Tf 0.42 0.49 0.65 rg 1 0 0 1 ${LEFT_MARGIN} ${y} Tm (-) Tj ET\n` : "";

  return (
    prefix +
    `BT ${fontRef} ${line.size} Tf ${(r / 255).toFixed(3)} ${(g / 255).toFixed(3)} ${(b / 255).toFixed(3)} rg 1 0 0 1 ${x} ${y} Tm (${escaped}) Tj ET\n`
  );
}

function renderSignatureRow(row: SignatureRow, y: number) {
  const lineWidth = 180;
  const leftX = LEFT_MARGIN;
  const rightX = PAGE_WIDTH - RIGHT_MARGIN - lineWidth;

  const leftLabel = escapePdfText(row.leftLabel);
  const rightLabel = escapePdfText(row.rightLabel);

  return `${(59 / 255).toFixed(3)} ${(130 / 255).toFixed(3)} ${(246 / 255).toFixed(3)} RG 1 w ${leftX} ${y + 10} m ${leftX + lineWidth} ${y + 10} l S\n` +
    `${(59 / 255).toFixed(3)} ${(130 / 255).toFixed(3)} ${(246 / 255).toFixed(3)} RG 1 w ${rightX} ${y + 10} m ${rightX + lineWidth} ${y + 10} l S\n` +
    `BT /F1 10 Tf 0.420 0.455 0.553 rg 1 0 0 1 ${leftX + 8} ${y - 6} Tm (${leftLabel}) Tj ET\n` +
    `BT /F1 10 Tf 0.420 0.455 0.553 rg 1 0 0 1 ${rightX + 8} ${y - 6} Tm (${rightLabel}) Tj ET\n`;
}

function buildPdf(pages: string[]) {
  const objects: string[] = [];

  const addObject = (content: string) => {
    objects.push(content);
    return objects.length;
  };

  const regularFontId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>");
  const boldFontId = addObject(
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
  );

  const pageObjectIds: number[] = [];

  for (const content of pages) {
    const stream = `<< /Length ${content.length} >>\nstream\n${content}endstream`;
    const contentObjectId = addObject(stream);
    const pageObjectId = addObject(
      `<< /Type /Page /Parent 0 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 ${regularFontId} 0 R /F2 ${boldFontId} 0 R >> >> /Contents ${contentObjectId} 0 R >>`,
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

export function createDocumentPdf(definition: PdfDocumentDefinition) {
  const elements = prepareElements(definition);
  const pages: string[] = [];

  let currentPage = "";
  let y = PAGE_HEIGHT - TOP_MARGIN;

  for (const element of elements) {
    const marginTop = element.type === "line" ? (element.marginTop ?? 0) : 0;
    const marginBottom = element.type === "line" ? (element.marginBottom ?? 0) : 0;
    const elementHeight = element.type === "signature" ? 34 : element.size + 4;
    const needed = marginTop + elementHeight + marginBottom;

    if (y - needed < BOTTOM_MARGIN) {
      pages.push(currentPage);
      currentPage = "";
      y = PAGE_HEIGHT - TOP_MARGIN;
    }

    y -= marginTop;

    if (element.type === "signature") {
      y -= 22;
      currentPage += renderSignatureRow(element, y);
      y -= 12;
      continue;
    }

    y -= element.size;
    currentPage += renderTextLine(element, y);
    y -= marginBottom;
  }

  if (currentPage) pages.push(currentPage);
  if (pages.length === 0) pages.push("");

  return buildPdf(pages);
}

export function downloadDocumentPdf(definition: PdfDocumentDefinition, filename: string) {
  const bytes = createDocumentPdf(definition);
  const blob = new Blob([bytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
