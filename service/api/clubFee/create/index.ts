import { getHttpClient } from "@/config/httpClientsHelper";
import { ClubFeeListReply } from "@/generated/clubFee/clubFee.reply";
import { CreateClubFeeRequest } from "@/generated/clubFee/clubFee.request";

const API_URL = "/clubFee/create";

export async function clubFeeCreate(
  request: CreateClubFeeRequest
): Promise<ClubFeeListReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.post(API_URL, request);
  return resp.data;
}
