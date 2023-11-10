import { User } from "@/generated/user/user";
import { convertEnumRoleToVietnamese } from "@/service/helper";
import { ChipProps } from "@nextui-org/react";

export const columns = [
  { name: "STT", uid: "stt" },
  { name: "Tên", uid: "name" },
  { name: "Vai trò", uid: "role" },
  { name: "Email", uid: "email" },
  { name: "SĐT", uid: "phone" },
  { name: "Câu lạc bộ", uid: "clubName" },
  { name: "Tình trạng", uid: "isDeleted" },
  { name: "Hành động", uid: "actions" },
];

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
};

export function intoTable(userList: User[]) {
  return userList.map((user, index) => {
    return {
      stt: index + 1,
      name: user.name,
      role: convertEnumRoleToVietnamese(user.role),
      email: user.email,
      phone: user.phone,
      clubName: `${user.club?.name}` + ``,
      isDeleted: user.deletedAt ? "Vô hiệu hoá" : "Hoạt động",
    } as DataType;
  });
}
