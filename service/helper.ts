import { EnumProto_UserRole } from "@/generated/enumps";

export function convertEnumRoleToVietnamese(role: EnumProto_UserRole): string {
  switch (role) {
    case EnumProto_UserRole.ADMIN: {
      return "Quản trị viên";
    }
    case EnumProto_UserRole.LEADER: {
      return "Leader";
    }
    case EnumProto_UserRole.CORE_MEMBER: {
      return "Coreteam";
    }
    case EnumProto_UserRole.TREASURER: {
      return "Thủ quỹ";
    }
    case EnumProto_UserRole.STAFF: {
      return "Nhân sự";
    }
    case EnumProto_UserRole.UNRECOGNIZED: {
      return "Khác";
    }
    default: {
      return "";
    }
  }
}
