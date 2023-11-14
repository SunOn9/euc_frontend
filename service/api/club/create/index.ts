import { getHttpClient } from "@/config/httpClientsHelper";
import { ClubListReply } from "@/generated/club/club.reply";
import { CreateClubRequest } from "@/generated/club/club.request";

const API_URL = "/club/create";

export async function clubCreate(
  request: CreateClubRequest
): Promise<ClubListReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.post(API_URL, request);
  return resp.data;
}
