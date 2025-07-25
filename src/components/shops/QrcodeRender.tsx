import { decodeQR } from "@/lib/scanQrcode";
import { useRef, useState } from "react";
import { BsFillImageFill } from "react-icons/bs";

type QrCodeRenderProps = {
  codeSlip: string;
  setCodeSlip: React.Dispatch<React.SetStateAction<string | null>>;
};
const QrCodeRender = ({ setCodeSlip }: QrCodeRenderProps) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];

    if (!file) return;
    const code = await decodeQR(file);
    setCodeSlip(code);
  };
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {" "}
        แสกนเพื่อบันทึกข้อมูลบัญชีรับเงิน
      </h2>
      <div className="flex flex-col border border-dashed gap-2  border-gray-300 rounded-xl p-4   justify-center items-center mb-4 bg-gray-50">
        <span className="text-[14px] text-gray-500">อัพโหลดสลิป</span>
        <BsFillImageFill
          onClick={handleClick}
          size={40}
          className="text-gray-400"
        />
      </div>
      <div className="flex items-center justify-center mb-4 text-sm text-gray-500">
        <span className="px-2">หรือ</span>
      </div>
      <input
        hidden
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default QrCodeRender;
