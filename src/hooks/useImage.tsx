import { imagesApi } from "@/Api/images.api";
import { uploadImageApi } from "@/Api/uploadImage.api";
import useImagesStore from "@/stores/uploadImages";
import { compressAndUpload } from "@/utils/imageCompression";
import { useState } from "react";

export type MenuImage = { id: string; url: string; menuId: string };

const useImages = () => {
  const images = useImagesStore((state) => state.images);
  const addImage = useImagesStore((state) => state.addImage);
  const uploadImage = useImagesStore((state) => state.uploadImage);
  const resetImages = useImagesStore((state) => state.resetImages);
  const [menuImage, setMenuImage] = useState<MenuImage[]>([]);
  const upload = async () => {
    const uploadedUrl = await Promise.all(
      images.map(async (img, index) => {
        uploadImage(index, { status: "uploading" });

        const result = await compressAndUpload(
          img.previewUrl,
          async (formData) => {
            const res = await uploadImageApi.create(formData);
            return res.data.imageUrl || res.data.url || null;
          },
          {
            type: img.type ?? "",
            shopId: img.shopId ?? "", // <---
            menuId: img.menuId ?? "", // <---
          }
        );
        if (result) {
          uploadImage(index, { status: "uploaded", uploadedUrl: result });

          return result;
        } else {
          uploadImage(index, { status: "error" });
          return null;
        }
      })
    );

    return uploadedUrl.filter((url): url is string => url !== null);
  };

  const getMenuImage = async (shopId: string, type: string) => {
    const res = await imagesApi.getImages(shopId, type);

    const items = res.data.data;
    setMenuImage(items);
  };

  return {
    upload,
    images,
    addImage,
    uploadImage,
    resetImages,
    getMenuImage,
    menuImage,
  };
};
export default useImages;
