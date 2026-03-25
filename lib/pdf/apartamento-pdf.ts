import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import type { ApartamentoView } from '@/app/(protected)/apartamentos/type';
import { downloadDocumentPdf } from './document-pdf';

const formatCurrency = (amount: number) =>
  `L ${new Intl.NumberFormat('es-HN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)}`;

export function downloadApartamentoPdf(apartamento: ApartamentoView) {
  const fechaGeneracion = format(new Date(), 'dd/MM/yyyy HH:mm', { locale: es });

  const habitaciones = apartamento.habitaciones.map(
    (habitacion) =>
      `${habitacion.tipoHabitacionNombre}: ${habitacion.cantidad} (${habitacion.activo ? 'activa' : 'inactiva'})`,
  );

  const servicios = apartamento.servicios.length
    ? apartamento.servicios.map((servicio) => {
        const base = `${servicio.servicioNombre}: ${servicio.incluido ? 'incluido' : 'no incluido'}`;
        const conClave = servicio.clave ? `${base}, clave: ${servicio.clave}` : base;
        return servicio.costoAdicional > 0
          ? `${conClave}, costo adicional: ${formatCurrency(servicio.costoAdicional)}`
          : conClave;
      })
    : ['No se registran servicios para este apartamento.'];

  const imagenes = apartamento.imagenes?.length
    ? apartamento.imagenes.map(
        (imagen, index) =>
          `Imagen ${index + 1}: ${imagen.url}${
            imagen.originalFilename ? ` (archivo: ${imagen.originalFilename})` : ''
          }`,
      )
    : ['No se registran imágenes para este apartamento.'];

  downloadDocumentPdf(
    {
      title: `Ficha del apartamento #${apartamento.numero}`,
      subtitle: apartamento.activo ? 'Registro activo' : 'Registro inactivo',
      metadataLine: `Documento generado el ${fechaGeneracion}`,
      blocks: [
        {
          type: 'paragraph',
          text: `Dirección: ${apartamento.direccion ?? 'No registrada'}. Estado de disponibilidad: ${apartamento.disponible ? 'Disponible' : 'No disponible'}.`,
        },
        { type: 'heading', text: 'Habitaciones' },
        { type: 'list', items: habitaciones.length ? habitaciones : ['Sin habitaciones registradas.'] },
        { type: 'heading', text: 'Servicios' },
        { type: 'list', items: servicios },
        { type: 'heading', text: 'Imágenes' },
        { type: 'paragraph', text: 'Las siguientes URLs permiten visualizar las imágenes registradas del apartamento:' },
        { type: 'list', items: imagenes },
      ],
      footer:
        'Este documento resume la información del apartamento para compartirla con potenciales inquilinos.',
    },
    `apartamento-${apartamento.numero}.pdf`,
  );
}
