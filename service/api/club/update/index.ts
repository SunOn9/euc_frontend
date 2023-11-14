import { getHttpClient } from "@/config/httpClientsHelper";
import { ClubListReply } from "@/generated/club/club.reply";
import { UpdateClubRequest } from "@/generated/club/club.request";

const API_URL = "/club/update";

export async function clubUpdate(
  request: UpdateClubRequest
): Promise<ClubListReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.post(API_URL, request);
  return resp.data;
}
