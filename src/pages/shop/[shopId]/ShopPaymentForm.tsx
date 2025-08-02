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

  const { shopId } = useParams();
  const handleScan = useCallback((qrcode_data: string) => {
    setQrcode(qrcode_data);
    setOpenCamera(false);
  }, []);

  const handleCamera = useCallback(() => {
    setOpenCamera(prev => !prev);
  }, []);

  useEffect(() => {
    const verifySlip = async () => {
      try {
        const prepareData = {
          amount: 1,
          qrcode_data: qrcode as string,
        };
        if (qrcode) {
          setLoading(true);
          const res = await postSlipApi.postSlip(prepareData);
          if (res) {
            setSlipVerify(res.data.data);
          }
        }
      } catch (error) {
        console.error("❌ Slip verification failed:", error);
      } finally {
        setLoading(false);
      }
    };
    verifySlip();
  }, [qrcode]);

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
    } catch (error) {
      console.error("insert failed");
    } finally {
      setProcess(false);
    }
  };

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
      <div className="wrap-anywhere flex flex-col ">
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
                  : "bg-amber-200  rounded-xl py-2 mx-2 my-4 shadow-sm"
              }`}
            >
              {process ? <ClipLoader /> : "บันทึกข้อมูลธนาคารผู้รับ"}
            </button>
          </>
        ) : (
          <p className="text-red-500">ไม่พบข้อมูลสลิป</p>
        )}
      </div>
    </div>
  );
};

export default VerifyBankReceive;
