import imageCompression from "browser-image-compression";
import { convertBlobUrlToFile } from "./convertBlobUrlFile";

export async function compressAndUpload(
  previewUrl: string,
  uploader: (formData: FormData) => Promise<string>,
  metadata: { type: string; shopId: string; menuId: string }
): Promise<string | null> {
  try {
    const image = await convertBlobUrlToFile(previewUrl);

    const compressed = await imageCompression(image, {
      maxSizeMB: 0.5,
      useWebWorker: true,
      maxWidthOrHeight: 1024,
    });

    const imageReducted = new File([compressed], image.name, {
      type: compressed.type,
    });

    const formData = new FormData();
    formData.append("file", imageReducted);
    formData.append("type", metadata.type);
    formData.append("shopId", metadata.shopId);
    formData.append("menuId", metadata.menuId);
    console.log("[compressAndUpload] FormData prepared");

    const uploaded = await uploader(formData);

    return uploaded;
  } catch (err) {
    return null;
  }
}
