import {
  EnumProto_EventType,
  EnumProto_Gender,
  EnumProto_MemberStatus,
  EnumProto_MemberType,
  EnumProto_MoneyMethod,
  EnumProto_SessionStatus,
  EnumProto_UserRole,
} from "@/generated/enumps";
import URI, { QueryDataMap } from "urijs";

export function convertEnumRoleToVietnamese(
  role: EnumProto_UserRole | number
): string {
  switch (role) {
    case EnumProto_UserRole.ADMIN || 0: {
      return "Quản trị viên";
    }
    case EnumProto_UserRole.LEADER || 1: {
      return "Leader";
    }
    case EnumProto_UserRole.CORE_MEMBER || 2: {
      return "Coreteam";
    }
    case EnumProto_UserRole.TREASURER || 3: {
      return "Thủ quỹ";
    }
    case EnumProto_UserRole.STAFF || 4: {
      return "Nhân sự";
    }
    default: {
      return "Khác";
    }
  }
}

export function convertEnumMemberStatusToVietnamese(
  status: EnumProto_MemberStatus | number
): string {
  switch (status) {
    case EnumProto_MemberStatus.BELIEVER || 0: {
      return "Tín hữu";
    }
    case EnumProto_MemberStatus.SEEKER || 1: {
      return "Thân hữu";
    }
    case EnumProto_MemberStatus.POTENTIAL_SEEKER || 2: {
      return "Thân hữu tiềm năng";
    }
    default: {
      return "Khác";
    }
  }
}

export function convertEnumSessionStatus(
  status: EnumProto_SessionStatus
): string {
  switch (status) {
    case EnumProto_SessionStatus.JUST_CREATE || 0: {
      return "Mới tạo";
    }
    case EnumProto_SessionStatus.CONFIRMED || 1: {
      return "Đã xác nhận";
    }
    case EnumProto_SessionStatus.DONE || 2: {
      return "Đã hoàn thành";
    }
    case EnumProto_SessionStatus.CANCEL || 3: {
      return "Huỷ";
    }
    default: {
      return "Khác";
    }
  }
}

export function convertEnumEventTypeToVietnamese(
  type: EnumProto_EventType
): string {
  switch (type) {
    case EnumProto_EventType.WEEKLY_TRAINING || 0: {
      return "Buổi tập hằng tuần";
    }
    case EnumProto_EventType.PLUS_TRAINING || 1: {
      return "Tập Plus";
    }
    case EnumProto_EventType.TOURNAMENT || 2: {
      return "Giải đấu";
    }
    default: {
      return "Khác";
    }
  }
}

export function convertEnumMoneyMethodToVietnamese(
  status: EnumProto_MoneyMethod
): string {
  switch (status) {
    case EnumProto_MoneyMethod.CASH || 0: {
      return "Tiền mặt";
    }
    case EnumProto_MoneyMethod.ATM_TRANSFER || 1: {
      return "Chuyển khoản";
    }
    case EnumProto_MoneyMethod.MOMO_TRANSFER || 2: {
      return "Momo";
    }
    default: {
      return "Khác";
    }
  }
}

export function convertEnumMemberTypeToVietnamese(
  type: EnumProto_MemberType | number
): string {
  switch (type) {
    case EnumProto_MemberType.STUDENT || 0: {
      return "Sinh viên";
    }
    case EnumProto_MemberType.WORKER || 1: {
      return "Người đi làm";
    }
    default: {
      return "Khác";
    }
  }
}

export function convertEnumGenderToVietnamese(
  gender: EnumProto_Gender | number
): string {
  switch (gender) {
    case EnumProto_Gender.MALE || 0: {
      return "Nam";
    }
    case EnumProto_Gender.FEMALE || 1: {
      return "Nữ";
    }
    default: {
      return "Khác";
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

export interface AppendQueryStringToUrlOptionInterface {
  enableOverride: boolean;
}

export const isValidUrl = (url: string): boolean => {
  if (typeof url !== "string") return false;
  const instUri = new URI(url);
  return instUri.is("url");
};

/*
  appendQueryStringToUrl('/order/1?a=1', {a: 2, b: 3}) -> '/order/1?a=2&b=3'
  appendQueryStringToUrl('/order/1?a=1&c=4', {a: 2, b: 3}, {
    enableOverride: true,
  }) -> '/order/1?a=2&b=3'
*/
export const appendQueryStringToUrl = (
  url: string,
  queryString: QueryDataMap,
  inputOption?: AppendQueryStringToUrlOptionInterface
) => {
  if (!isValidUrl(url)) return "";

  const option: AppendQueryStringToUrlOptionInterface = {
    enableOverride: false,
    ...inputOption,
  };

  const instUri = new URI(url);

  if (option.enableOverride) {
    instUri.search(queryString);
  } else {
    instUri.setQuery(queryString);
  }

  return instUri.toString();
};
