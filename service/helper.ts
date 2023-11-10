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
    default: {
      return "";
    }
  }
}

export function convertToVietNamDate(date: Date): string {
  return new Date(date).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
