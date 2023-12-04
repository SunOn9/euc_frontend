import { PaymentSession } from "@/generated/paymentSession/paymentSession";
import { convertToVietNamDate } from "@/service/helper";
import { ChipProps } from "@nextui-org/react";

export const statusColorMapStatus: Record<string, ChipProps["color"]> = {
  "Tín hữu": "success",
  "Thân hữu tiềm năng": "warning",
  "Thân hữu": "danger",
  "": "default",
};

export const statusColorMapGender: Record<string, ChipProps["color"]> = {
  Nam: "primary",
  Nữ: "secondary",
  "": "default",
};

export type DataType = {
  stt: number;
  title: string;
  description?: string;
  amount: number;
  createdAt: string;
  fundAmount: number;
  status: string;
  dateConfirm: string;
  dateDone: string;
  clubName: string;
  paymentTotal: number;
  action: ActionType;
};

export type ActionType = {
  id: number;
  isDeleted: boolean;
};

export function intoTable(paymentSessionList: PaymentSession[], page: number) {
  return paymentSessionList.map((paymentSession, index) => {
    return {
      stt: (page - 1) * 20 + index + 1,
      title: paymentSession.title,
      description: paymentSession.description,
      amount: paymentSession.amount,
      createdAt: paymentSession.createdAt
        ? convertToVietNamDate(paymentSession.createdAt)
        : "",
      fundAmount: paymentSession.fundAmount,
      status: "",
      dateConfirm: paymentSession.dateConfirm
        ? convertToVietNamDate(paymentSession.dateConfirm)
        : "",
      dateDone: paymentSession.dateDone
        ? convertToVietNamDate(paymentSession.dateDone)
        : "",
      clubName: paymentSession.club?.name,
      paymentTotal: paymentSession.payment.length,
      action: {
        id: paymentSession.id,
        isDeleted: paymentSession.deletedAt ? true : false,
      } as ActionType,
    } as DataType;
  });
}
