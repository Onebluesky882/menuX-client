import { checkSlipApi, type SlipVerify } from "@/Api/slip-verifications.api";
import QrCodeRender from "@/components/shops/QrcodeRender";
import { QrcodeReceive } from "@/components/slipVerification/qrcodeReceive";
import { RequestCamera, Webcam } from "@/components/slipVerification/Webcam";
import { slipVerifySchema } from "@/schema/slipVerifySchema";

import { useEffect, useState, useCallback } from "react";

const VerifyBankReceive = () => {
  const [openCamera, setOpenCamera] = useState(false);
  const [qrcode, setQrcode] = useState<SlipVerify[]>([]);

  const handleScan = useCallback((qrcode_data: string) => {
    const data: SlipVerify = {
      amount: 1,
      qrcode_data,
    };
    setQrcode([data]);
    setOpenCamera(false);
  }, []);

  const handleCamera = useCallback(() => {
    setOpenCamera((prev) => !prev);
  }, []);

  const verifySlip = useCallback(async () => {
    if (qrcode.length === 0) return;
    try {
      const prepareData: SlipVerify = {
        amount: 1,
        qrcode_data: qrcode[0].qrcode_data,
      };
      const parsed = slipVerifySchema.safeParse(prepareData);

      if (!parsed.success) {
        throw new Error();
      }
      await checkSlipApi.postSlip(parsed.data);
    } catch (error) {
      console.error("❌ Slip verification failed:", error);
    }
  }, []);

  useEffect(() => {
    verifySlip();
  }, [verifySlip]);

  const renderQrCodeData = () => {
    const hasQrData = qrcode.some((item) => item.qrcode_data?.trim());
    if (hasQrData) {
      return (
        <div className="bg-gray-100 p-3 rounded-lg text-sm text-gray-800 break-words">
          <h3 className="font-medium mb-1">QR Code slip:</h3>
          <div className="space-y-1">
            {qrcode.map((item, index) => (
              <div key={`qr-${index}`} className="font-mono text-xs">
                {item.qrcode_data}
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-lg border text-gray-800 space-y-6 text-xl font-medium leading-relaxed">
      {/* Header / ร้าน */}
      <div className="text-center border-b pb-4">
        <h1 className="text-4xl font-bold tracking-wide text-blue-600">
          MenuX
        </h1>
        <p className="text-xl">Test verification own slip</p>
      </div>

      {/* Qr Code  receive*/}
      {!openCamera && <QrcodeReceive />}

      {/* camera section */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 max-w-xl mx-auto">
        {!openCamera && <RequestCamera QrCodeRender={QrCodeRender} />}
        <Webcam
          openCamera={openCamera}
          handleCamera={handleCamera}
          handleScan={handleScan}
        />

        {/* QR Code Data Display */}
        {renderQrCodeData()}
      </div>
    </div>
  );
};

export default VerifyBankReceive;
