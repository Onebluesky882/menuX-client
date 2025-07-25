import { axiosInstance } from ".";

export type SlipVerify = {
  amount: number;
  qrcode_data: string;
};
export const checkSlipApi = {
  postSlip: (data: SlipVerify) =>
    axiosInstance.post("slip-verifications", data),
};
