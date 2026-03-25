import crypto from 'node:crypto';

import { UploadedAsset } from '@/lib/uploaded-asset';

type CloudinaryConfig = {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  folderPrefix: string;
  maxFileSizeMb: number;
  maxFilesPerRequest: number;
};

function getCloudinaryConfig(): CloudinaryConfig {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      'Faltan credenciales de Cloudinary. Configura CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY y CLOUDINARY_API_SECRET.',
    );
  }

  return {
    cloudName,
    apiKey,
    apiSecret,
    folderPrefix: process.env.CLOUDINARY_FOLDER_PREFIX ?? 'sistema-alquiler',
    maxFileSizeMb: Number(process.env.CLOUDINARY_MAX_FILE_SIZE_MB ?? 8),
    maxFilesPerRequest: Number(process.env.CLOUDINARY_MAX_FILES_PER_REQUEST ?? 10),
  };
}

function signCloudinaryParams(params: Record<string, string | number>, apiSecret: string) {
  const payload = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return crypto.createHash('sha1').update(`${payload}${apiSecret}`).digest('hex');
}

export async function uploadBufferToCloudinary({
  buffer,
  mimeType,
  originalFilename,
  purpose,
}: {
  buffer: Buffer;
  mimeType: string;
  originalFilename: string;
  purpose: 'apartamentos' | 'recibos';
}): Promise<UploadedAsset> {
  const config = getCloudinaryConfig();
  const timestamp = Math.floor(Date.now() / 1000);
  const folder = `${config.folderPrefix}/${purpose}`;
  const signature = signCloudinaryParams({ folder, timestamp }, config.apiSecret);

  const formData = new FormData();
  formData.append('api_key', config.apiKey);
  formData.append('timestamp', String(timestamp));
  formData.append('signature', signature);
  formData.append('folder', folder);
  formData.append('file', new Blob([buffer], { type: mimeType }), originalFilename);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData,
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message ?? 'No se pudo subir la imagen a Cloudinary.');
  }

  return {
    url: data.secure_url,
    publicId: data.public_id,
    bytes: data.bytes,
    format: data.format,
    width: data.width,
    height: data.height,
    resourceType: data.resource_type,
    originalFilename,
  };
}

export async function deleteAssetFromCloudinary(publicId: string): Promise<void> {
  const config = getCloudinaryConfig();
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = signCloudinaryParams({ public_id: publicId, timestamp }, config.apiSecret);

  const formData = new FormData();
  formData.append('api_key', config.apiKey);
  formData.append('timestamp', String(timestamp));
  formData.append('signature', signature);
  formData.append('public_id', publicId);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${config.cloudName}/image/destroy`,
    {
      method: 'POST',
      body: formData,
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message ?? 'No se pudo eliminar la imagen de Cloudinary.');
  }

  if (data?.result !== 'ok' && data?.result !== 'not found') {
    throw new Error('Cloudinary no confirmó la eliminación de la imagen.');
  }
}

export function getCloudinaryUploadLimits() {
  const config = getCloudinaryConfig();
  return {
    maxFileSizeMb: config.maxFileSizeMb,
    maxFilesPerRequest: config.maxFilesPerRequest,
  };
}
