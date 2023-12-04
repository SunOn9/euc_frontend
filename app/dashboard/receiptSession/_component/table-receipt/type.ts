import { defaulLimit } from "@/config/env";
import { Receipt } from "@/generated/receipt/receipt";
import {
  convertEnumMoneyMethodToVietnamese,
  convertEnumSessionStatus,
  convertToVietNamDate,
} from "@/service/helper";
import { ChipProps } from "@nextui-org/react";

export const statusColorMapMoneyMethod: Record<string, ChipProps["color"]> = {
  "Tiền mặt": "success",
  "Chuyển khoản": "warning",
  Momo: "default",
  "": "danger",
};

export type DataType = {
  stt: number;
  title: string;
  description?: string;
  amount: number;
  createdAt: string;
  fundAmount: number;
  method: string;
  action: ActionType;
};

export type ActionType = {
  id: number;
  isDeleted: boolean;
};

export function intoTable(receiptList: Receipt[], page: number) {
  return receiptList.map((receipt, index) => {
    return {
      stt: (page - 1) * defaulLimit + index + 1,
      title: receipt.title,
      description: receipt.description,
      amount: receipt.amount,
      createdAt: receipt.createdAt
        ? convertToVietNamDate(receipt.createdAt)
        : "",
      fundAmount: receipt.fundAmount,
      method: convertEnumMoneyMethodToVietnamese(receipt.method),
      action: {
        id: receipt.id,
        isDeleted: receipt.deletedAt ? true : false,
      } as ActionType,
    } as DataType;
  });
}
