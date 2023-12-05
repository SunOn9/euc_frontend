import { defaulLimit } from "@/config/env";
import { Area } from "@/generated/area/area";

export type DataType = {
  stt: number;
  name: string;

  action: ActionType;
};

export type ActionType = {
  id: number;
  isDeleted: boolean;
};

export function intoTable(areaList: Area[], page: number) {
  return areaList.map((area, index) => {
    return {
      stt: (page - 1) * defaulLimit + index + 1,
      name: area.name,

      action: {
        id: area.id,
        isDeleted: area.deletedAt ? true : false,
      } as ActionType,
    } as DataType;
  });
}
