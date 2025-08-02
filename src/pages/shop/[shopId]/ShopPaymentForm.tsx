import { postSlipApi } from "@/Api/slip-verifications.api";
import QrCodeRender from "@/components/shops/QrcodeRender";
import QrcodePreview from "@/components/slipVerification/QrcodePreview";
import { RequestCamera, Webcam } from "@/components/slipVerification/Webcam";
import type { Qrcode, ReceiveBank } from "@/type/qrcode.type";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { shopAPI } from "../../../Api/shop.api";

const VerifyBankReceive = () => {
  const [openCamera, setOpenCamera] = useState(false);
  const [qrcode, setQrcode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [slipVerify, setSlipVerify] = useState<Qrcode>();
  const [isReset, setIsReset] = useState(false);
  const [saveProgress, setSaveProgress] = useState(0);
  const [process, setProcess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetKey, setResetKey] = useState(0);

  const { shopId } = useParams();
  const navigate = useNavigate();

  // todo after handle submit bank  redirect to shop detail

  const handleScan = useCallback((qrcode_data: string) => {
    setQrcode(qrcode_data);
    setOpenCamera(false);
    setIsReset(false);
    setError(null);
  }, []);

  const handleCamera = useCallback(() => {
    setOpenCamera(prev => !prev);
  }, []);

  useEffect(() => {
    const verifySlip = async () => {
      if (!qrcode || isReset) return;

      try {
        const prepareData = {
          amount: 1,
          qrcode_data: qrcode as string,
        };

        setLoading(true);
        setError(null);

        const res = await postSlipApi.postSlip(prepareData);

        if (res && res.data && res.data.data) {
          setSlipVerify(res.data.data);
        } else {
          throw new Error("No data received");
        }
      } catch (error: any) {
        console.error("❌ Slip verification failed:", error);

        let errorMessage = "เกิดข้อผิดพลาดในการตรวจสอบสลิป";
        if (error.response?.status === 400) {
          errorMessage = "ข้อมูล QR Code ไม่ถูกต้อง กรุณาสแกนใหม่";
        } else if (error.response?.status === 404) {
          errorMessage = "ไม่พบข้อมูลสลิป";
        }

        setError(errorMessage);

        setTimeout(() => {
          setQrcode(null);
          setSlipVerify(undefined);
          setError(null);
          setResetKey(prev => prev + 1);
        }, 3000);
      } finally {
        setLoading(false);
      }
    };

    verifySlip();
  }, [qrcode, isReset]);

  const handleSubmitBank = async () => {
    if (!shopId || !slipVerify) {
      console.error("Missing shopId or slip data");
      return;
    }

    try {
      setProcess(true);
      setSaveProgress(0);
      setError(null);

      console.log("💾 Starting bank information save...");

      // Step 1: Preparing data (25%)
      setSaveProgress(25);
      await new Promise(resolve => setTimeout(resolve, 800));

      const insertBank: ReceiveBank = {
        receiverName: slipVerify?.receiver_name,
        receiveBank: slipVerify?.receiver_bank,
        receiverId: slipVerify?.receiver_id,
      };

      console.log("✅ Data prepared:", insertBank);

      // Step 2: Validating data (50%)
      setSaveProgress(50);
      await new Promise(resolve => setTimeout(resolve, 600));

      // Step 3: Sending to server (75%)
      setSaveProgress(75);
      await shopAPI.patchShopReceiveBank(shopId, insertBank);

      console.log("✅ API call successful");
      await new Promise(resolve => setTimeout(resolve, 800));

      // Step 4: Complete (100%)
      setSaveProgress(100);
      console.log("✅ Bank information saved successfully");
      await new Promise(resolve => setTimeout(resolve, 600));

      // Show success message briefly
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Show success state and reset after delay
      console.log("✅ Process completed successfully");
      setTimeout(() => {
        setQrcode(null);
        setSlipVerify(undefined);
        setSaveProgress(0);
        setResetKey(prev => prev + 1);
      }, 2000);
    } catch (error: any) {
      console.error("❌ Insert bank data failed:", error);
      setError("การบันทึกข้อมูลล้มเหลว กรุณาลองใหม่อีกครั้ง");
      setSaveProgress(0);

      // Reset on error
      setTimeout(() => {
        setQrcode(null);
        setSlipVerify(undefined);
        setError(null);
        setResetKey(prev => prev + 1);
      }, 3000);
    } finally {
      setProcess(false);
    }
  };

  // Manual retry function
  const handleRetry = () => {
    setError(null);
    setQrcode(null);
    setSlipVerify(undefined);
    setResetKey(prev => prev + 1);
    setOpenCamera(true);
  };

  // Reset loading screen
  if (isReset) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center border border-white/20">
          <div className="mb-4">
            <BounceLoader color="#3B82F6" size={60} />
          </div>
          <p className="text-lg font-medium text-gray-700">
            กำลังรีเซ็ตระบบ...
          </p>
          <p className="text-sm text-gray-500 mt-2">โปรดรอสักครู่</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 mb-6">
          <div className="text-center border-b border-gray-100 pb-4">
            <div className="inline-flex items-center space-x-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                MenuX
              </h1>
            </div>
            <p className="text-lg text-gray-600 font-medium">
              Verification Payment Account
            </p>
          </div>
        </div>

        {/* Camera Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 mb-6">
          {!openCamera && (
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <RequestCamera />
            </div>
          )}

          <QrCodeRender
            key={`qr-${resetKey}`}
            codeSlip={qrcode as string}
            setCodeSlip={setQrcode}
          />
          <Webcam
            key={`webcam-${resetKey}`}
            openCamera={openCamera}
            handleCamera={handleCamera}
            handleScan={handleScan}
          />
        </div>

        {/* Content Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6">
          {/* QR Data Display */}
          {qrcode && (
            <div className="mb-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-sm font-medium text-gray-600 mb-2">
                ข้อมูลที่ได้รับ:
              </p>
              <div className="text-xs text-gray-800 break-all bg-white p-3 rounded-xl border font-mono">
                {qrcode}
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-2xl">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-red-500 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                  <button
                    onClick={handleRetry}
                    className="mt-2 px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-xs font-medium transition-colors duration-200"
                  >
                    ลองใหม่
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <div className="inline-flex flex-col items-center space-y-4">
                <BounceLoader color="#F59E0B" size={50} />
                <div className="text-center">
                  <p className="text-lg font-medium text-gray-700">
                    กำลังตรวจสอบสลิป
                  </p>
                  <p className="text-sm text-gray-500">โปรดรอสักครู่...</p>
                </div>
              </div>
            </div>
          )}

          {/* Slip Verified */}
          {slipVerify && !loading && (
            <div className="space-y-4">
              <QrcodePreview data={slipVerify} />

              {/* Enhanced Submit Button */}
              <button
                disabled={process}
                onClick={handleSubmitBank}
                className={`
                  relative w-full rounded-2xl py-4 px-6 font-semibold text-white
                  transition-all duration-500 ease-out transform overflow-hidden
                  ${
                    process
                      ? "bg-gradient-to-r from-emerald-500 to-teal-600 cursor-not-allowed scale-95"
                      : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 hover:scale-105 hover:shadow-2xl shadow-lg"
                  }
                `}
              >
                {/* Progress Background */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-500 transition-all duration-700 ease-out"
                  style={{
                    width: `${saveProgress}%`,
                    opacity: process ? 0.4 : 0,
                  }}
                />

                {/* Shimmer Effect */}
                <div
                  className={`
                  absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20
                  ${process ? "animate-pulse" : "opacity-0"}
                `}
                />

                <div className="relative z-10">
                  {process ? (
                    <div className="flex flex-col items-center space-y-3">
                      <div className="flex items-center space-x-3">
                        {saveProgress < 100 ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <svg
                            className="w-5 h-5 text-blue-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}

                        <span className="text-sm font-medium">
                          {saveProgress < 30 && "กำลังเตรียมข้อมูล..."}
                          {saveProgress >= 30 &&
                            saveProgress < 60 &&
                            "กำลังตรวจสอบข้อมูล..."}
                          {saveProgress >= 60 &&
                            saveProgress < 90 &&
                            "กำลังส่งข้อมูลไปเซิร์ฟเวอร์..."}
                          {saveProgress >= 90 &&
                            saveProgress < 100 &&
                            "กำลังบันทึกข้อมูล..."}
                          {saveProgress >= 100 &&
                            "เสร็จสิ้น! บันทึกข้อมูลสำเร็จ"}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div
                          className="bg-white rounded-full h-2 transition-all duration-500 ease-out"
                          style={{ width: `${saveProgress}%` }}
                        />
                      </div>

                      {/* Progress Percentage */}
                      <div className="text-xs opacity-90 font-medium">
                        {saveProgress}% เสร็จแล้ว
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      <span>บันทึกข้อมูลธนาคารผู้รับ</span>
                    </div>
                  )}
                </div>
              </button>
            </div>
          )}

          {/* No Slip Found */}
          {qrcode && !slipVerify && !loading && !error && (
            <div className="text-center py-8">
              <div className="inline-flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-lg font-medium text-red-600 mb-1">
                    ไม่พบข้อมูลสลิป
                  </p>
                  <p className="text-sm text-gray-500">
                    ระบบจะรีเซ็ตใน 3 วินาที...
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyBankReceive;
