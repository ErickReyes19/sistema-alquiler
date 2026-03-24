export type UploadedAsset = {
  url: string;
  publicId: string;
  bytes?: number;
  format?: string;
  width?: number;
  height?: number;
  resourceType?: string;
  originalFilename?: string;
};

export function normalizeUploadedAssets(input: unknown): UploadedAsset[] {
  if (!Array.isArray(input)) {
    return [];
  }

  return input
    .filter((asset): asset is Record<string, unknown> => !!asset && typeof asset === 'object')
    .map((asset) => ({
      url: typeof asset.url === 'string' ? asset.url : '',
      publicId: typeof asset.publicId === 'string' ? asset.publicId : '',
      bytes: typeof asset.bytes === 'number' ? asset.bytes : undefined,
      format: typeof asset.format === 'string' ? asset.format : undefined,
      width: typeof asset.width === 'number' ? asset.width : undefined,
      height: typeof asset.height === 'number' ? asset.height : undefined,
      resourceType:
        typeof asset.resourceType === 'string' ? asset.resourceType : undefined,
      originalFilename:
        typeof asset.originalFilename === 'string' ? asset.originalFilename : undefined,
    }))
    .filter((asset) => asset.url && asset.publicId);
}
