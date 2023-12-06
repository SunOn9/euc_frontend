import { getHttpClient } from "@/config/httpClientsHelper";
import { ClubFeeReply } from "@/generated/clubFee/clubFee.reply";
import { GetClubFeeConditionRequest } from "@/generated/clubFee/clubFee.request";

const API_URL = "/clubFee/detail";

export async function clubDetail(
  request: GetClubFeeConditionRequest
): Promise<ClubFeeReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL, { params: request });
  return resp.data;
}
