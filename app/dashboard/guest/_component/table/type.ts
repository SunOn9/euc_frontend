import { defaulLimit } from "@/config/env";
import { EnumProto_MemberType } from "@/generated/enumps";
import { Guest } from "@/generated/guest/guest";
import {
  convertEnumGenderToVietnamese,
  convertToVietNamDate,
} from "@/service/helper";
import { ChipProps } from "@nextui-org/react";

export const statusColorMapGender: Record<string, ChipProps["color"]> = {
  Nam: "primary",
  Nữ: "secondary",
  "": "default",
};

export type DataType = {
  stt: number;
  name: string;
  nickName: string;
  type: boolean;
  clubName: string;
  gender: string;
  action: ActionType;
};

export type ActionType = {
  id: number;
  isDeleted: boolean;
};

export function intoTable(guestList: Guest[], page: number) {
  return guestList.map((guest, index) => {
    return {
      stt: (page - 1) * defaulLimit + index + 1,
      name: guest.name,
      nickName: guest.nickName,
      type: guest.type === EnumProto_MemberType.STUDENT ? true : false,
      clubName: guest.club?.name ?? "",
      gender: convertEnumGenderToVietnamese(guest.gender),
      action: {
        id: guest.id,
        isDeleted: guest.deletedAt ? true : false,
      } as ActionType,
    } as DataType;
  });
}
