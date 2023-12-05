import { defaulLimit } from "@/config/env";
import { Club, Club_ClubFee } from "@/generated/club/club";

export type DataType = {
  stt: number;
  name: string;
  abbreviation: string;
  totalMember: number;
  totalGuest: number;
  fee: Club_ClubFee;
  area: string;
  action: ActionType;
};

export type ActionType = {
  id: number;
  isDeleted: boolean;
};

export function intoTable(clubList: Club[], page: number) {
  return clubList.map((club, index) => {
    return {
      stt: (page - 1) * defaulLimit + index + 1,
      name: club.name,
      abbreviation: club.abbreviation ?? "",
      totalMember: club.totalMember,
      totalGuest: club.totalGuest,
      fee: club.fee ? club.fee[0] : null,
      area: club.area?.name ?? "",
      action: {
        id: club.id,
        isDeleted: club.deletedAt ? true : false,
      } as ActionType,
    } as DataType;
  });
}
