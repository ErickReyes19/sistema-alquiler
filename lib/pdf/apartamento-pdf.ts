import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import type { ApartamentoView } from '@/app/(protected)/apartamentos/type';

const formatCurrency = (amount: number) =>
  `L ${new Intl.NumberFormat('es-HN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)}`;

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

export async function downloadApartamentoPdf(apartamento: ApartamentoView) {
  const fechaGeneracion = format(new Date(), 'dd/MM/yyyy HH:mm', { locale: es });

  const habitacionesHtml = apartamento.habitaciones.length
    ? apartamento.habitaciones
        .map(
          (habitacion) => `
          <tr>
            <td>${escapeHtml(habitacion.tipoHabitacionNombre)}</td>
            <td>${habitacion.cantidad}</td>
            <td>${habitacion.activo ? 'Activa' : 'Inactiva'}</td>
          </tr>`,
        )
        .join('')
    : `<tr><td colspan="3" class="empty">No hay habitaciones registradas.</td></tr>`;

  const serviciosHtml = apartamento.servicios.length
    ? apartamento.servicios
        .map(
          (servicio) => `
          <tr>
            <td>${escapeHtml(servicio.servicioNombre)}</td>
            <td>${servicio.incluido ? 'Incluido' : 'No incluido'}</td>
            <td>${servicio.costoAdicional > 0 ? formatCurrency(servicio.costoAdicional) : '-'}</td>
            <td>${servicio.clave ? escapeHtml(servicio.clave) : '-'}</td>
          </tr>`,
        )
        .join('')
    : `<tr><td colspan="4" class="empty">No hay servicios registrados.</td></tr>`;

  const imagenesHtml = apartamento.imagenes?.length
    ? apartamento.imagenes
        .map(
          (imagen, index) => `
          <figure class="image-card">
            <img src="${escapeHtml(imagen.url)}" alt="Imagen ${index + 1} del apartamento ${escapeHtml(apartamento.numero)}" />
            <figcaption>${imagen.originalFilename ? escapeHtml(imagen.originalFilename) : `Imagen ${index + 1}`}</figcaption>
          </figure>`,
        )
        .join('')
    : '<p class="empty">No hay imágenes registradas.</p>';

  const html = `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <title>Ficha Apartamento ${escapeHtml(apartamento.numero)}</title>
        <style>
          @page { size: A4; margin: 18mm; }
          * { box-sizing: border-box; }
          body {
            font-family: Inter, Segoe UI, Roboto, Arial, sans-serif;
            color: #111827;
            font-size: 12px;
            line-height: 1.5;
          }
          .header {
            border: 1px solid #dbeafe;
            background: linear-gradient(135deg, #eff6ff, #f8fafc);
            border-radius: 12px;
            padding: 18px;
            margin-bottom: 18px;
          }
          .title { margin: 0; font-size: 24px; color: #1d4ed8; }
          .subtitle { margin: 6px 0 0; color: #334155; }
          .meta { margin-top: 6px; color: #64748b; font-size: 11px; }
          .section { margin-top: 20px; page-break-inside: avoid; }
          .section h2 {
            font-size: 15px;
            color: #1e40af;
            border-bottom: 1px solid #dbeafe;
            padding-bottom: 5px;
            margin-bottom: 10px;
          }
          .table {
            width: 100%;
            border-collapse: collapse;
            overflow: hidden;
            border-radius: 8px;
          }
          .table th,
          .table td {
            border: 1px solid #e2e8f0;
            padding: 8px;
            text-align: left;
            vertical-align: top;
          }
          .table th {
            background-color: #f8fafc;
            color: #0f172a;
            font-weight: 600;
          }
          .empty { color: #64748b; text-align: center; padding: 14px; }
          .gallery {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
          }
          .image-card {
            margin: 0;
            border: 1px solid #e2e8f0;
            border-radius: 10px;
            overflow: hidden;
            background: #fff;
            break-inside: avoid;
          }
          .image-card img {
            width: 100%;
            height: 180px;
            object-fit: cover;
            display: block;
            background: #f8fafc;
          }
          .image-card figcaption {
            padding: 6px 8px;
            color: #475569;
            font-size: 10px;
            border-top: 1px solid #e2e8f0;
          }
          .footer {
            margin-top: 18px;
            color: #64748b;
            font-size: 10px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <header class="header">
          <h1 class="title">Ficha Informativa de Apartamento</h1>
          <p class="subtitle">Apartamento #${escapeHtml(apartamento.numero)}</p>
          <p class="subtitle">Dirección: ${escapeHtml(apartamento.direccion ?? 'No registrada')}</p>
          <p class="meta">Documento generado: ${fechaGeneracion}</p>
        </header>

        <section class="section">
          <h2>Habitaciones</h2>
          <table class="table">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Cantidad</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>${habitacionesHtml}</tbody>
          </table>
        </section>

        <section class="section">
          <h2>Servicios</h2>
          <table class="table">
            <thead>
              <tr>
                <th>Servicio</th>
                <th>Incluido</th>
                <th>Costo adicional</th>
                <th>Clave</th>
              </tr>
            </thead>
            <tbody>${serviciosHtml}</tbody>
          </table>
        </section>

        <section class="section">
          <h2>Imágenes del apartamento</h2>
          <div class="gallery">${imagenesHtml}</div>
        </section>

        <p class="footer">Ficha para compartir con potenciales inquilinos.</p>
      </body>
    </html>
  `;

  const printWindow = window.open('', '_blank', 'noopener,noreferrer,width=1024,height=768');
  if (!printWindow) return;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();

  const images = Array.from(printWindow.document.images);
  await Promise.all(
    images.map(
      (image) =>
        new Promise<void>((resolve) => {
          if (image.complete) {
            resolve();
            return;
          }
          image.onload = () => resolve();
          image.onerror = () => resolve();
        }),
    ),
  );

  printWindow.focus();
  printWindow.print();
  printWindow.close();
}
