import { useEffect, useRef, useState } from "react";
import { AiTwotoneCloseCircle } from "react-icons/ai";

type UploadImageProps = {
  onImagesSelected: (files: FileList) => void;
  trigger: boolean;
  onDialogClosed?: () => void;

  type: string;
  menuId: string;
  shopId: string;
};

const UploadImage = ({
  onImagesSelected,
  trigger,
  onDialogClosed,
}: UploadImageProps) => {
  const [previewUrl, setPreviewUrl] = useState<string[] | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    setPreviewUrl([...(previewUrl ?? []), ...urls]);
    onImagesSelected?.(files);
    onDialogClosed?.();
  };
  useEffect(() => {
    if (trigger) {
      fileInputRef.current?.click();
    }
  }, [trigger]);

  const removeImage = (idx: number) => {
    setPreviewUrl((prev) => prev?.filter((_, i) => i !== idx) || null);
  };

  return (
    <div>
      <input
        type="file"
        hidden
        multiple
        accept="image/*"
        onChange={handleChange}
        ref={fileInputRef}
      />
      <div className="flex flex-wrap gap-2">
        {previewUrl &&
          previewUrl.map((url, idx) => (
            <div
              key={idx}
              className="w-16 h-16  relative overflow-hidden  rounded-md  shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              {" "}
              <AiTwotoneCloseCircle
                onClick={() => removeImage(idx)}
                color="#CE3E62"
                className="absolute z-10 right-0"
              />
              <img
                src={url}
                alt="preview"
                className="w-full h-full object-cover "
              />{" "}
            </div>
          ))}
      </div>
    </div>
  );
};

export default UploadImage;
