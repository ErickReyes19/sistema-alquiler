import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import type { ApartamentoView } from '@/app/(protected)/apartamentos/type';

const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;
const LEFT_MARGIN = 50;
const RIGHT_MARGIN = 50;
const TOP_MARGIN = 60;
const BOTTOM_MARGIN = 50;
const CONTENT_WIDTH = PAGE_WIDTH - LEFT_MARGIN - RIGHT_MARGIN;
const IMAGE_GAP = 12;

type PreparedImage = {
  name: string;
  width: number;
  height: number;
  jpegHex: string;
};

type Page = {
  content: string;
  imageNames: string[];
};

const formatCurrency = (amount: number) =>
  `L ${new Intl.NumberFormat('es-HN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)}`;

const sanitizeText = (text: string) =>
  text
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[•·]/g, '-');

const escapePdfText = (text: string) => {
  const safe = sanitizeText(text);
  let encoded = '';

  for (const char of safe) {
    if (char === '\\') {
      encoded += '\\\\';
      continue;
    }

    if (char === '(') {
      encoded += '\\(';
      continue;
    }

    if (char === ')') {
      encoded += '\\)';
      continue;
    }

    const code = char.charCodeAt(0);
    if (code >= 32 && code <= 126) {
      encoded += char;
      continue;
    }

    if (code <= 255) {
      encoded += `\\${code.toString(8).padStart(3, '0')}`;
      continue;
    }

    encoded += '?';
  }

  return encoded;
};

const estimateTextWidth = (text: string, size: number) => sanitizeText(text).length * size * 0.49;

const wrapText = (text: string, maxWidth: number, size: number) => {
  const safe = sanitizeText(text).trim();
  if (!safe) return [''];

  const words = safe.split(/\s+/);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (estimateTextWidth(next, size) <= maxWidth) {
      current = next;
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
};

const numberColor = (r: number, g: number, b: number) => `${(r / 255).toFixed(3)} ${(g / 255).toFixed(3)} ${(b / 255).toFixed(3)}`;

const textLine = (text: string, x: number, y: number, size = 11, bold = false, color: [number, number, number] = [31, 41, 55]) => {
  const escaped = escapePdfText(text);
  const font = bold ? '/F2' : '/F1';
  return `BT ${font} ${size} Tf ${numberColor(color[0], color[1], color[2])} rg 1 0 0 1 ${x} ${y} Tm (${escaped}) Tj ET\n`;
};

const uint8ToHex = (bytes: Uint8Array) => Array.from(bytes, (value) => value.toString(16).padStart(2, '0')).join('');

const toJpegBytes = (dataUrl: string) => {
  const base64 = dataUrl.split(',')[1] ?? '';
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
};

const convertImageToJpeg = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('No se pudo cargar la imagen');

  const blob = await response.blob();
  const bitmap = await createImageBitmap(blob);
  const maxWidth = 1200;
  const scale = bitmap.width > maxWidth ? maxWidth / bitmap.width : 1;
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('No se pudo procesar la imagen');

  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, width, height);
  context.drawImage(bitmap, 0, 0, width, height);

  const jpegUrl = canvas.toDataURL('image/jpeg', 0.86);
  return {
    width,
    height,
    jpegHex: `${uint8ToHex(toJpegBytes(jpegUrl))}>`,
  };
};

const buildPdf = (pages: Page[], images: PreparedImage[]) => {
  const objects: string[] = [];
  const addObject = (value: string) => {
    objects.push(value);
    return objects.length;
  };

  const regularFontId = addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
  const boldFontId = addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');

  const imageObjectIds = new Map<string, number>();
  for (const image of images) {
    const imageId = addObject(
      `<< /Type /XObject /Subtype /Image /Width ${image.width} /Height ${image.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter [/ASCIIHexDecode /DCTDecode] /Length ${image.jpegHex.length} >>\nstream\n${image.jpegHex}\nendstream`,
    );
    imageObjectIds.set(image.name, imageId);
  }

  const pageIds: number[] = [];
  for (const page of pages) {
    const contentId = addObject(`<< /Length ${page.content.length} >>\nstream\n${page.content}endstream`);
    const imageResource = page.imageNames.length
      ? `/XObject << ${page.imageNames.map((name) => `/${name} ${imageObjectIds.get(name)} 0 R`).join(' ')} >>`
      : '';

    const resource = `<< /Font << /F1 ${regularFontId} 0 R /F2 ${boldFontId} 0 R >> ${imageResource} >>`;
    const pageId = addObject(
      `<< /Type /Page /Parent 0 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources ${resource} /Contents ${contentId} 0 R >>`,
    );
    pageIds.push(pageId);
  }

  const pagesId = addObject(`<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pageIds.length} >>`);
  for (const pageId of pageIds) {
    objects[pageId - 1] = objects[pageId - 1].replace('/Parent 0 0 R', `/Parent ${pagesId} 0 R`);
  }
  const catalogId = addObject(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`);

  let pdf = '%PDF-1.4\n';
  const offsets: number[] = [0];
  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let index = 1; index <= objects.length; index += 1) {
    pdf += `${offsets[index].toString().padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new TextEncoder().encode(pdf);
};

export async function downloadApartamentoPdf(apartamento: ApartamentoView) {
  const fechaGeneracion = format(new Date(), 'dd/MM/yyyy HH:mm', { locale: es });

  const preparedImages = (
    await Promise.all(
      (apartamento.imagenes ?? []).map(async (image, index) => {
        try {
          const converted = await convertImageToJpeg(image.url);
          return {
            name: `Im${index + 1}`,
            width: converted.width,
            height: converted.height,
            jpegHex: converted.jpegHex,
          } as PreparedImage;
        } catch {
          return null;
        }
      }),
    )
  ).filter((image): image is PreparedImage => image !== null);

  const pages: Page[] = [{ content: '', imageNames: [] }];
  let pageIndex = 0;
  let cursorY = PAGE_HEIGHT - TOP_MARGIN;

  const ensureSpace = (required: number) => {
    if (cursorY - required >= BOTTOM_MARGIN) return;
    pages.push({ content: '', imageNames: [] });
    pageIndex += 1;
    cursorY = PAGE_HEIGHT - TOP_MARGIN;
  };

  const addLine = (text: string, size = 11, bold = false, color: [number, number, number] = [31, 41, 55], marginBottom = 6) => {
    ensureSpace(size + marginBottom + 6);
    cursorY -= size;
    pages[pageIndex].content += textLine(text, LEFT_MARGIN, cursorY, size, bold, color);
    cursorY -= marginBottom;
  };

  const addParagraph = (text: string, size = 11, marginBottom = 8) => {
    const lines = wrapText(text, CONTENT_WIDTH, size);
    for (const line of lines) {
      addLine(line, size, false, [31, 41, 55], 2);
    }
    cursorY -= marginBottom;
  };

  addLine('Ficha Informativa de Apartamento', 20, true, [29, 78, 216], 10);
  addLine(`Apartamento #${apartamento.numero}`, 12, true, [30, 64, 175], 6);
  addLine(`Dirección: ${apartamento.direccion ?? 'No registrada'}`, 11, false, [51, 65, 85], 4);
  addLine(`Documento generado: ${fechaGeneracion}`, 10, false, [100, 116, 139], 12);

  addLine('Habitaciones', 13, true, [30, 64, 175], 6);
  if (!apartamento.habitaciones.length) {
    addLine('- No hay habitaciones registradas.', 11, false, [71, 85, 105], 8);
  } else {
    for (const habitacion of apartamento.habitaciones) {
      addLine(`- ${habitacion.tipoHabitacionNombre}: ${habitacion.cantidad}`, 11, false, [31, 41, 55], 4);
    }
    cursorY -= 4;
  }

  addLine('Servicios', 13, true, [30, 64, 175], 6);
  if (!apartamento.servicios.length) {
    addLine('- No hay servicios registrados.', 11, false, [71, 85, 105], 8);
  } else {
    for (const servicio of apartamento.servicios) {
      addLine(
        `- ${servicio.servicioNombre}: ${servicio.incluido ? 'Incluido' : 'No incluido'}${servicio.costoAdicional > 0 ? ` | Costo ${formatCurrency(servicio.costoAdicional)}` : ''}`,
        11,
        false,
        [31, 41, 55],
        4,
      );
    }
    cursorY -= 6;
  }

  addLine('Imágenes del apartamento', 13, true, [30, 64, 175], 8);

  if (!preparedImages.length) {
    addParagraph('No se pudieron incluir imágenes en el PDF o no hay imágenes registradas para este apartamento.', 11, 0);
  } else {
    const cellWidth = (CONTENT_WIDTH - IMAGE_GAP) / 2;
    const maxImageHeight = 160;
    let column = 0;

    for (const image of preparedImages) {
      const scale = Math.min(cellWidth / image.width, maxImageHeight / image.height, 1);
      const drawWidth = image.width * scale;
      const drawHeight = image.height * scale;
      const blockHeight = drawHeight + 20;

      if (column === 0) ensureSpace(blockHeight + 8);
      if (column === 1 && cursorY - blockHeight < BOTTOM_MARGIN) {
        pages.push({ content: '', imageNames: [] });
        pageIndex += 1;
        cursorY = PAGE_HEIGHT - TOP_MARGIN;
        column = 0;
        ensureSpace(blockHeight + 8);
      }

      const x = LEFT_MARGIN + (column === 1 ? cellWidth + IMAGE_GAP : 0) + (cellWidth - drawWidth) / 2;
      const y = cursorY - drawHeight;

      pages[pageIndex].imageNames.push(image.name);
      pages[pageIndex].content += `q ${drawWidth.toFixed(2)} 0 0 ${drawHeight.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)} cm /${image.name} Do Q\n`;

      if (column === 1) {
        cursorY -= blockHeight + 10;
        column = 0;
      } else {
        column = 1;
      }
    }
  }

  const bytes = buildPdf(pages, preparedImages);
  const blob = new Blob([bytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `apartamento-${apartamento.id}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
}
