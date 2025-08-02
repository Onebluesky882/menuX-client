export type Qrcode = {
  amount: number;
  date: string;
  receiver_bank: string;
  receiver_id: string;
  receiver_name: string;
  ref: string;
  sender_bank: string;
  sender_id: string;
  sender_name: string;
};

export type ReceiveBank = {
  receiveBank?: string | null | undefined;
  receiverId?: string | null | undefined;
  receiverName?: string | null | undefined;
};
