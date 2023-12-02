import { getHttpClient } from "@/config/httpClientsHelper";
import { ClubFeeListReply } from "@/generated/club-fee/club-fee.reply";
import { GetClubFeeConditionRequest } from "@/generated/club-fee/club-fee.request";

const API_URL = "/club-fee/list";

export async function clubFeeSearch(
  request: GetClubFeeConditionRequest
): Promise<ClubFeeListReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL, { params: request });
  return resp.data;
}
