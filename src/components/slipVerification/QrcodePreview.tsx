import type { Qrcode } from "@/type/qrcode.type";

type QrcodePreviewProps = {
  data: Qrcode | null;
  onConfirm?: () => void;
};

const QrcodePreview = ({ data, onConfirm }: QrcodePreviewProps) => {
  if (!data) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 max-w-md w-full">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        📋 ข้อมูลจาก QR Code
      </h2>
      <div className="space-y-2 text-sm text-gray-700">
        <div>📅 วันที่: {new Date(data.date).toLocaleString("th-TH")}</div>
        <div>💰 จำนวนเงิน: {data.amount} บาท</div>
        <div>🏦 ธนาคารผู้โอน: {data.sender_bank}</div>
        <div>
          👤 ผู้โอน: {data.sender_name} ({data.sender_id})
        </div>
        <div>🏦 ธนาคารผู้รับ: {data.receiver_bank}</div>
        <div>
          👤 ผู้รับ: {data.receiver_name} ({data.receiver_id})
        </div>
        <div>🔖 เลขอ้างอิง: {data.ref}</div>
      </div>
      {onConfirm && (
        <button
          className="mt-4 w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-xl"
          onClick={onConfirm}
        >
          ✅ ยืนยันข้อมูล
        </button>
      )}
    </div>
  );
};

export default QrcodePreview;
