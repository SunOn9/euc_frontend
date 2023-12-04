import { defaulLimit } from "@/config/env";
import { Event } from "@/generated/event/event";
import {
  convertEnumEventTypeToVietnamese,
  convertToVietNamDate,
} from "@/service/helper";
import { ChipProps } from "@nextui-org/react";

export const statusColorMapEventType: Record<string, ChipProps["color"]> = {
  "Buổi tập hằng tuần": "primary",
  "Tập Plus": "warning",
  "Giải đấu": "success",
  "": "danger",
};

export type DataType = {
  stt: number;
  name: string;
  startEventDate: string;
  endEventDate: string;
  type: string;
  createdAt: string;
  placeName: string;
  clubName: string;
  actualEndEventDate: string;
  action: ActionType;
};

export type ActionType = {
  id: number;
  isDeleted: boolean;
};

export function intoTable(eventList: Event[], page: number) {
  return eventList.map((event, index) => {
    return {
      stt: (page - 1) * defaulLimit + index + 1,
      name: event.name,
      startEventDate: event.startEventDate
        ? convertToVietNamDate(event.startEventDate)
        : "",
      endEventDate: event.endEventDate
        ? convertToVietNamDate(event.endEventDate)
        : "",
      createdAt: event.createdAt ? convertToVietNamDate(event.createdAt) : "",
      type: convertEnumEventTypeToVietnamese(event.type),
      placeName: event.place?.name ?? "",
      clubName: event.club?.name ?? "",
      actualEndEventDate: event.actualEndEventDate
        ? convertToVietNamDate(event.actualEndEventDate)
        : "",
      action: {
        id: event.id,
        isDeleted: event.deletedAt ? true : false,
      } as ActionType,
    } as DataType;
  });
}
