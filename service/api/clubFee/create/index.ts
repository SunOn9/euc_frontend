import { getHttpClient } from "@/config/httpClientsHelper";
import { ClubFeeReply } from "@/generated/club-fee/club-fee.reply";
import { CreateClubFeeRequest } from "@/generated/club-fee/club-fee.request";

const API_URL = "/club-fee/create";

export async function clubFeeCreate(
  request: CreateClubFeeRequest
): Promise<ClubFeeReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.post(API_URL, request);
  return resp.data;
}
