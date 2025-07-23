import { create } from "zustand";
interface ImageItem {
  previewUrl: string; // blob url
  status: "idle" | "uploading" | "uploaded" | "error";
  uploadedUrl?: string;
  type?: string;
  shopId?: string;
  menuId?: string;
}

interface ImagesState {
  images: ImageItem[];
  addImage: (img: ImageItem) => void;
  uploadImage: (index: number, data: Partial<ImageItem>) => void;
  resetImages: () => void;
}

const useImagesStore = create<ImagesState>((set) => ({
  images: [],
  addImage: (image) =>
    set((state) => ({
      images: [...state.images, image],
    })),
  uploadImage: (index, data) =>
    set((state) => {
      const updated = [...state.images];
      updated[index] = { ...updated[index], ...data };
      return { images: updated };
    }),
  resetImages: () => set({ images: [] }),
}));

export default useImagesStore;
