import { postSlipApi } from "@/Api/slip-verifications.api";
import QrCodeRender from "@/components/shops/QrcodeRender";
import QrcodePreview from "@/components/slipVerification/QrcodePreview";
import { RequestCamera, Webcam } from "@/components/slipVerification/Webcam";
import type { Qrcode, ReceiveBank } from "@/type/qrcode.type";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BounceLoader, ClipLoader } from "react-spinners";
import { shopAPI } from "../../../Api/shop.api";

const VerifyBankReceive = () => {
  const [openCamera, setOpenCamera] = useState(false);
  const [qrcode, setQrcode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [slipVerify, setSlipVerify] = useState<Qrcode>();
  const [isReset, setIsReset] = useState(false); // ✅ Reset flag

  const { shopId } = useParams();

  const handleScan = useCallback((qrcode_data: string) => {
    console.log("🔍 QR Code scanned:", qrcode_data);
    setQrcode(qrcode_data);
    setOpenCamera(false);
    setIsReset(false); // ✅ Clear reset flag when new scan
  }, []);

  const handleCamera = useCallback(() => {
    setOpenCamera(prev => !prev);
  }, []);

  useEffect(() => {
    const verifySlip = async () => {
      if (!qrcode || isReset) return; // ✅ Don't verify if reset

      try {
        const prepareData = {
          amount: 1,
          qrcode_data: qrcode as string,
        };

        setLoading(true);
        const res = await postSlipApi.postSlip(prepareData);

        if (res && res.data && res.data.data) {
          setSlipVerify(res.data.data);
        } else {
          throw new Error("No data received");
        }
      } catch (error) {
        console.error("❌ Slip verification failed:", error);

        // ✅ Set reset flag and clear everything after 3 seconds
        setTimeout(() => {
          setIsReset(true);
          setQrcode(null);
          setSlipVerify(undefined);
          setLoading(false);
          setOpenCamera(false);

          // ✅ Clear reset flag after a brief moment to enable new scans
          setTimeout(() => {
            setIsReset(false);
          }, 500);
        }, 3000);
      } finally {
        if (!isReset) {
          setLoading(false);
        }
      }
    };

    verifySlip();
  }, [qrcode, isReset]);

  const [process, setProcess] = useState(false);

  const handleSubmitBank = async () => {
    if (!shopId || !slipVerify) {
      console.error("Missing shopId or slip data");
      return;
    }

    try {
      setProcess(true);
      const insertBank: ReceiveBank = {
        receiverName: slipVerify?.receiver_name,
        receiveBank: slipVerify?.receiver_bank,
        receiverId: slipVerify?.receiver_id,
      };

      await shopAPI.patchShopReceiveBank(shopId, insertBank);

      // ✅ Reset after successful save
      setTimeout(() => {
        setIsReset(true);
        setQrcode(null);
        setSlipVerify(undefined);
        setOpenCamera(false);

        setTimeout(() => {
          setIsReset(false);
        }, 500);
      }, 1000);
    } catch (error) {
      console.error("insert failed");
    } finally {
      setProcess(false);
    }
  };

  // ✅ Don't render anything during reset
  if (isReset) {
    return (
      <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-lg border text-gray-800 space-y-6 text-xl font-medium leading-relaxed">
        <div className="text-center py-8">
          <BounceLoader color="#9EB973" />
          <p className="text-sm text-gray-500 mt-2">กำลังรีเซ็ต...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-lg border text-gray-800 space-y-6 text-xl font-medium leading-relaxed">
      {/* Header / ร้าน */}
      <div className="text-center border-b pb-4">
        <h1 className="text-2xl font-bold tracking-wide text-blue-600">
          MenuX
        </h1>
        <p className="text-xl">Verification Payment Account</p>
      </div>

      {/* camera section */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 max-w-xl mx-auto">
        {!openCamera && <RequestCamera />}

        <QrCodeRender codeSlip={qrcode as string} setCodeSlip={setQrcode} />
        <Webcam
          openCamera={openCamera}
          handleCamera={handleCamera}
          handleScan={handleScan}
        />
      </div>

      <div className="wrap-anywhere flex flex-col">
        ข้อมูลที่ได้รับ : {qrcode && <div>{qrcode}</div>}
        {loading ? (
          <div className="flex justify-center py-6">
            <BounceLoader color="#9EB973" />
          </div>
        ) : slipVerify ? (
          <>
            <QrcodePreview data={slipVerify} />
            <button
              disabled={process}
              onClick={handleSubmitBank}
              className={`${
                process
                  ? "bg-amber-200/50"
                  : "bg-amber-200 rounded-xl py-2 mx-2 my-4 shadow-sm"
              }`}
            >
              {process ? <ClipLoader /> : "บันทึกข้อมูลธนาคารผู้รับ"}
            </button>
          </>
        ) : qrcode ? (
          <div className="text-center py-4">
            <p className="text-red-500 mb-2">ไม่พบข้อมูลสลิป</p>
            <p className="text-sm text-gray-500">ระบบจะรีเซ็ตใน 3 วินาที...</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default VerifyBankReceive;
