import { defaulLimit } from "@/config/env";
import { Event_Member } from "@/generated/event/event";
import { convertEnumGenderToVietnamese } from "@/service/helper";

import { ChipProps } from "@nextui-org/react";

export const statusColorMapGender: Record<string, ChipProps["color"]> = {
  Nam: "primary",
  Nữ: "secondary",
  "": "default",
};

export type DataType = {
  stt: number;
  name: string;
  nickName?: string;
  type: boolean;
  gender: string;
  action: ActionType;
};

export type ActionType = {
  id: number;
  isDeleted: boolean;
};

export function intoTable(memberList: Event_Member[], page: number) {
  return memberList.map((member, index) => {
    return {
      stt: (page - 1) * defaulLimit + index + 1,
      name: member.name,
      nickName: member.nickName,
      type: member.type ? true : false,
      gender: convertEnumGenderToVietnamese(member.gender),
      action: {
        id: member.id,
        isDeleted: member.deletedAt ? true : false,
      } as ActionType,
    } as DataType;
  });
}
