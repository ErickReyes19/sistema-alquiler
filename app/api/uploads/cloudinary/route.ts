import { NextResponse } from 'next/server';

import {
  getCloudinaryUploadLimits,
  uploadBufferToCloudinary,
} from '@/lib/cloudinary';
import { getTenantIdFromSession } from '@/lib/tenant-session';

export async function POST(request: Request) {
  try {
    await getTenantIdFromSession();

    const formData = await request.formData();
    const files = formData
      .getAll('files')
      .filter((file): file is File => file instanceof File);

    const purposeRaw = formData.get('purpose');
    const purpose = purposeRaw === 'recibos' ? 'recibos' : 'apartamentos';

    if (!files.length) {
      return NextResponse.json({ error: 'Debes enviar al menos una imagen.' }, { status: 400 });
    }

    const { maxFileSizeMb, maxFilesPerRequest } = getCloudinaryUploadLimits();

    if (files.length > maxFilesPerRequest) {
      return NextResponse.json(
        { error: `Máximo ${maxFilesPerRequest} imágenes por carga.` },
        { status: 400 },
      );
    }

    const maxBytes = maxFileSizeMb * 1024 * 1024;
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        return NextResponse.json(
          { error: 'Solo se permiten archivos de imagen.' },
          { status: 400 },
        );
      }

      if (file.size > maxBytes) {
        return NextResponse.json(
          {
            error: `La imagen ${file.name} supera el máximo permitido de ${maxFileSizeMb} MB.`,
          },
          { status: 400 },
        );
      }
    }

    const assets = await Promise.all(
      files.map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        return uploadBufferToCloudinary({
          buffer,
          mimeType: file.type,
          originalFilename: file.name,
          purpose,
        });
      }),
    );

    return NextResponse.json({ assets });
  } catch (error) {
    console.error('Error subiendo imágenes a Cloudinary:', error);
    return NextResponse.json(
      { error: 'No se pudieron subir las imágenes. Inténtalo de nuevo.' },
      { status: 500 },
    );
  }
}
