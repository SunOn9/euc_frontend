import { getHttpClient } from "@/config/httpClientsHelper";
import { ClubFeeListReply } from "@/generated/clubFee/clubFee.reply";
import { GetClubFeeConditionRequest } from "@/generated/clubFee/clubFee.request";

const API_URL = "/clubFee/list";

export async function clubFeeSearch(
  request: GetClubFeeConditionRequest
): Promise<ClubFeeListReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL, { params: request });
  return resp.data;
}
