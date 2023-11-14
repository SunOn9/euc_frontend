import { getHttpClient } from "@/config/httpClientsHelper";
import { ClubListReply } from "@/generated/club/club.reply";
import { GetClubConditionRequest } from "@/generated/club/club.request";

const API_URL = "/club/list";

export async function clubSearch(
  request: GetClubConditionRequest
): Promise<ClubListReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL, { params: request });
  return resp.data;
}
