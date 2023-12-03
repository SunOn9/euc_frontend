import { getHttpClient } from "@/config/httpClientsHelper";
import { ClubFeeReply } from "@/generated/club-fee/club-fee.reply";
import { GetClubFeeConditionRequest } from "@/generated/club-fee/club-fee.request";

const API_URL = "/club-fee/detail";

export async function clubDetail(
  request: GetClubFeeConditionRequest
): Promise<ClubFeeReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL, { params: request });
  return resp.data;
}
