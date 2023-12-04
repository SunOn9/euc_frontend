import { defaulLimit } from "@/config/env";
import { PaymentSession } from "@/generated/paymentSession/paymentSession";
import {
  convertEnumSessionStatus,
  convertToVietNamDate,
} from "@/service/helper";
import { ChipProps } from "@nextui-org/react";

export const statusColorMapStatus: Record<string, ChipProps["color"]> = {
  "Mới tạo": "primary",
  "Đã xác nhận": "warning",
  "Đã hoàn thành": "success",
  Huỷ: "default",
  "": "danger",
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
  userConfirm: string;
  userDone: string;
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
      stt: (page - 1) * defaulLimit + index + 1,
      title: paymentSession.title,
      description: paymentSession.description,
      amount: paymentSession.amount,
      createdAt: paymentSession.createdAt
        ? convertToVietNamDate(paymentSession.createdAt)
        : "",
      fundAmount: paymentSession.fundAmount,
      status: convertEnumSessionStatus(paymentSession.status),
      dateConfirm: paymentSession.dateConfirm
        ? convertToVietNamDate(paymentSession.dateConfirm)
        : "",
      dateDone: paymentSession.dateDone
        ? convertToVietNamDate(paymentSession.dateDone)
        : "",
      userConfirm:
        paymentSession.userConfirm?.name && paymentSession.userConfirm?.email
          ? `${paymentSession.userConfirm?.name} (${paymentSession.userConfirm?.email})`
          : "",
      userDone:
        paymentSession.userDone?.name && paymentSession.userDone?.email
          ? `${paymentSession.userDone?.name} (${paymentSession.userDone?.email})`
          : "",
      action: {
        id: paymentSession.id,
        isDeleted: paymentSession.deletedAt ? true : false,
      } as ActionType,
    } as DataType;
  });
}
