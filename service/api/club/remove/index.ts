import { getHttpClient } from "@/config/httpClientsHelper";
import { ClubReply } from "@/generated/club/club.reply";
import { RemoveClubRequest } from "@/generated/club/club.request";

const API_URL = "/club/remove";

export async function clubRemove(
  request: RemoveClubRequest
): Promise<ClubReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL, { params: request });
  return resp.data;
}
