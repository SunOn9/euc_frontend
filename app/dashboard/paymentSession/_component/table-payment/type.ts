import { defaulLimit } from "@/config/env";
import { Payment } from "@/generated/payment/payment";
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

export function intoTable(paymentList: Payment[], page: number) {
  return paymentList.map((payment, index) => {
    return {
      stt: (page - 1) * defaulLimit + index + 1,
      title: payment.title,
      description: payment.description,
      amount: payment.amount,
      createdAt: payment.createdAt
        ? convertToVietNamDate(payment.createdAt)
        : "",
      fundAmount: payment.fundAmount,
      method: convertEnumMoneyMethodToVietnamese(payment.method),
      action: {
        id: payment.id,
        isDeleted: payment.deletedAt ? true : false,
      } as ActionType,
    } as DataType;
  });
}
