import { EnumProto_MemberType } from "@/generated/enumps";
import { Member } from "@/generated/member/member";
import {
  convertEnumGenderToVietnamese,
  convertEnumMemberStatusToVietnamese,
  convertToVietNamDate,
} from "@/service/helper";
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
  name: string;
  nickName: string;
  birthday: string;
  status: string;
  type: boolean;
  hometown: string;
  clubName: string;
  gender: string;
  action: ActionType;
};

export type ActionType = {
  id: number;
  isDeleted: boolean;
};

export function intoTable(memberList: Member[], page: number) {
  return memberList.map((member, index) => {
    return {
      stt: (page - 1) * 20 + index + 1,
      name: member.name,
      nickName: member.nickName,
      birthday: member.birthday ? convertToVietNamDate(member.birthday) : "",
      status: convertEnumMemberStatusToVietnamese(member.status),
      type: member.type === EnumProto_MemberType.STUDENT ? true : false,
      hometown: member.hometown?.name,
      clubName: member.memberInClub[0].club?.name,
      gender: convertEnumGenderToVietnamese(member.gender),
      action: {
        id: member.id,
        isDeleted: member.deletedAt ? true : false,
      } as ActionType,
    } as DataType;
  });
}
