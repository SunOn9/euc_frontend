import { User } from "@/generated/user/user";
import { convertEnumRoleToVietnamese } from "@/service/helper";
import { ChipProps } from "@nextui-org/react";

export const statusColorMapIsDeleted: Record<string, ChipProps["color"]> = {
  "Hoạt động": "success",
  "Vô hiệu hoá": "danger",
};

export const statusColorMapRole: Record<string, ChipProps["color"]> = {
  "Quản trị viên": "warning",
  Leader: "danger",
  Coreteam: "secondary",
  "Thủ quỹ": "success",
  "Nhân sự": "primary",
  "": "default",
};

export type DataType = {
  stt: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  isDeleted: string;
  clubName: string;
  action: ActionType;
};

export type ActionType = {
  id: number;
  isDeleted: boolean;
}

export function intoTable(userList: User[], page: number) {
  return userList.map((user, index) => {
    return {
      stt: (page - 1) * 20 + index + 1,
      name: user.name,
      role: convertEnumRoleToVietnamese(user.role),
      email: user.email,
      phone: user.phone,
      clubName:
        (user.club?.name ?? "") +
        (user.club?.abbreviation
          ? `
     (${user.club?.abbreviation})`
          : ""),
      isDeleted: user.deletedAt ? "Vô hiệu hoá" : "Hoạt động",
      action: { id: user.id, isDeleted: user.deletedAt ? true : false } as ActionType,
    } as DataType;
  });
}
