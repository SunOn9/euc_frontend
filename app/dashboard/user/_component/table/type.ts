import { EnumProto_UserRole } from "@/generated/enumps";
import { User } from "@/generated/user/user";
import { convertEnumRoleToVietnamese } from "@/service/helper";

export type DataType = {
  stt: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  clubName: string;
};

export function intoUserTable(userList: User[]) {
  return userList.map((user, index) => {
    return {
      stt: index,
      name: user.name,
      role: convertEnumRoleToVietnamese(user.role),
      email: user.email,
      phone: user.phone,
      clubName: user.club?.name,
    } as DataType;
  });
}
