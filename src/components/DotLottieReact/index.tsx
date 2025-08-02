import QRcode_scanner from "@/assets/QRcode_scanner.json"; // ปรับ path ตามโครงสร้างโปรเจกต์
import touchAnimation from "@/assets/touch.json"; // ปรับ path ตามโครงสร้างโปรเจกต์
import Lottie from "lottie-react";

export const TouchClick = () => {
  return (
    <div className="relative">
      <div className="w-5 h-5 absolute bottom-1  right-1">
        <Lottie animationData={touchAnimation} loop autoplay />
      </div>
    </div>
  );
};

export const QrcodeLiveScan = () => {
  return (
    <div className="w-32 h-32">
      <Lottie animationData={QRcode_scanner} loop autoplay />
    </div>
  );
};

export default QrcodeLiveScan;
