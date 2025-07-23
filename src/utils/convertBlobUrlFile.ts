export async function convertBlobUrlToFile(blobUrl: string): Promise<File> {
  const response = await fetch(blobUrl);
  const blob = await response.blob();

  // Determine file type and extension
  const mimeType = blob.type || "image/jpeg";
  const extension = mimeType.split("/")[1] || "jpg";

  // Generate unique file name
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).slice(2, 8);
  const fileName = `${timestamp}-${randomString}.${extension}`;

  return new File([blob], fileName, { type: mimeType });
}
