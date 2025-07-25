import { axiosInstance } from ".";

type VerifySlipProps = {
  amount: number;
  qrcode_data: string;
};

export const postSlipApi = {
  postSlip: (data: VerifySlipProps) =>
    axiosInstance.post("slip-verifications/shop", data),
};
