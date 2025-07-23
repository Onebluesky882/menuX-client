import React, { useRef } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

type ImageUploadProps = {
  images: File[];
  setImages: (images: File[]) => void;
  error?: string;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  images,
  setImages,
  error,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 5) files.splice(5);
    setImages(files);
  };

  // Preview as base64 URLs
  const imagePreviews = images.map((file) => ({
    name: file.name,
    url: URL.createObjectURL(file),
  }));

  return (
    <div>
      <Label className="font-medium mb-1">Photos (3-5)</Label>
      <div className="flex items-center gap-4 mt-1 flex-col sm:flex-row">
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFilesChange}
          className="hidden"
        />
        <Button
          type="button"
          className="px-4 py-2 font-normal bg-blue-50 text-primary border border-gray-200"
          onClick={() => inputRef.current?.click()}
        >
          {images.length ? `${images.length} selected` : "Choose images"}
        </Button>
        <div className="text-xs text-gray-500">{images.length} / 5 images</div>
      </div>
      {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
      <div className="flex gap-2 mt-2 overflow-x-auto">
        {imagePreviews.map(({ url, name }, idx) => (
          <div
            key={idx}
            className="w-20 h-20 rounded overflow-hidden border bg-gray-50"
          >
            <img
              src={url}
              alt={name}
              className="object-cover w-full h-full"
              onLoad={() => URL.revokeObjectURL(url)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
