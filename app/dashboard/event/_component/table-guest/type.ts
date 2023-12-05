import { defaulLimit } from "@/config/env";
import { Event_Guest } from "@/generated/event/event";
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

export function intoTable(guestList: Event_Guest[], page: number) {
  return guestList.map((guest, index) => {
    return {
      stt: (page - 1) * defaulLimit + index + 1,
      name: guest.name,
      nickName: guest.nickName,
      type: guest.type ? true : false,
      gender: convertEnumGenderToVietnamese(guest.gender),
      action: {
        id: guest.id,
        isDeleted: guest.deletedAt ? true : false,
      } as ActionType,
    } as DataType;
  });
}
