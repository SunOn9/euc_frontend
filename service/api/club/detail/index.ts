import { getHttpClient } from "@/config/httpClientsHelper";
import { ClubReply } from "@/generated/club/club.reply";
import { GetClubConditionRequest } from "@/generated/club/club.request";

const API_URL = "/club/detail";

export async function clubDetail(
  request: GetClubConditionRequest
): Promise<ClubReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL, { params: request });
  return resp.data;
}
