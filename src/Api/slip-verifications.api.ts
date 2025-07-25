import { axiosInstance } from ".";

export type SlipVerify = {
  amount: number;
  qrcode_data: string;
};
export const postSlipApi = {
  postSlip: (data: SlipVerify) =>
    axiosInstance.post("slip-verifications", data),
};
