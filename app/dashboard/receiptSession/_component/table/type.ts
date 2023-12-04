import { defaulLimit } from "@/config/env";
import { ReceiptSession } from "@/generated/receiptSession/receiptSession";
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
  receiptTotal: number;
  action: ActionType;
};

export type ActionType = {
  id: number;
  isDeleted: boolean;
};

export function intoTable(receiptSessionList: ReceiptSession[], page: number) {
  return receiptSessionList.map((receiptSession, index) => {
    return {
      stt: (page - 1) * defaulLimit + index + 1,
      title: receiptSession.title,
      description: receiptSession.description,
      amount: receiptSession.amount,
      createdAt: receiptSession.createdAt
        ? convertToVietNamDate(receiptSession.createdAt)
        : "",
      fundAmount: receiptSession.fundAmount,
      status: convertEnumSessionStatus(receiptSession.status),
      dateConfirm: receiptSession.dateConfirm
        ? convertToVietNamDate(receiptSession.dateConfirm)
        : "",
      dateDone: receiptSession.dateDone
        ? convertToVietNamDate(receiptSession.dateDone)
        : "",
      userConfirm:
        receiptSession.userConfirm?.name && receiptSession.userConfirm?.email
          ? `${receiptSession.userConfirm?.name} (${receiptSession.userConfirm?.email})`
          : "",
      userDone:
        receiptSession.userDone?.name && receiptSession.userDone?.email
          ? `${receiptSession.userDone?.name} (${receiptSession.userDone?.email})`
          : "",
      action: {
        id: receiptSession.id,
        isDeleted: receiptSession.deletedAt ? true : false,
      } as ActionType,
    } as DataType;
  });
}
