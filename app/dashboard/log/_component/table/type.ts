import { EnumProto_UserRole } from "@/generated/enumps";
import { Log } from "@/generated/log/log";
import {
  convertEnumRoleToVietnamese,
  convertToVietNamDate,
} from "@/service/helper";
import { ChipProps } from "@nextui-org/react";

export const columns = [
  { name: "STT", uid: "stt" },
  { name: "Hành động", uid: "action" },
  { name: "Đối tượng", uid: "subject" },
  { name: "Tên người dùng", uid: "userName" },
  { name: "Vai trò người dùng", uid: "userRole" },
  { name: "Session Id", uid: "sessionId" },
  { name: "Thời gian", uid: "createdAt" },
  { name: "Dữ liệu cũ", uid: "oldData" },
  { name: "Dữ liệu mới", uid: "newData" },
];

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
  action: string;
  subject: string;
  userName: string;
  userRole: string;
  sessionId: string;
  createdAt: string;
  oldData: string;
  newData: string;
};

export function intoTable(logList: Log[]) {
  return logList.map((log, index) => {
    return {
      stt: index + 1,
      action: log.action,
      subject: log.subject,
      userName: log.user?.name ?? "",
      userRole: convertEnumRoleToVietnamese(
        log.user?.role ?? EnumProto_UserRole.UNRECOGNIZED
      ),
      sessionId: log.sessionId,
      createdAt: log.createdAt ? convertToVietNamDate(log.createdAt) : "",
      oldData: JSON.stringify(log.oldData),
      newData: JSON.stringify(log.newData),
    } as DataType;
  });
}
