import { EnumProto_UserRole } from "@/generated/enumps";

export type SearchDataType = {
  name?: string;
  role?: EnumProto_UserRole;
  email?: string;
  phone?: string;
  isDeleted?: boolean;
};
