import { decodeQR } from "@/lib/scanQrcode";
import { useRef } from "react";
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
    if (code) {
      setCodeSlip(code); // <-- สร้าง object ที่ตรงกับ SlipVerify
    }
  };
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {" "}
        แสกนสลิปเพื่อบันทึกข้อมูลบัญชีรับเงิน
      </h2>
      <div className="bg-gray-100 m-2 p-5">
        <p>
          <u>ขั้นตอน</u>
        </p>
        <ul className="text-gray-500 text-md">
          <li>1.โอนเงินไปบัญชีที่ท่านต้องการบันทึก 1 บาท</li>
          <li> หมายเหตุ ระบบยังไม่รองรับ แม่มณีและ k-shop</li>
          <li>2.แนบสลิป qrcode</li>
          <li>3.ยืนยันเพื่อบันทึกข้อมูล</li>
        </ul>
      </div>

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
