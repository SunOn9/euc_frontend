import { getHttpClient } from "@/config/httpClientsHelper";
import { RemoveClubRequest } from "@/generated/club/club.request";
import { SimpleReply } from "@/generated/common";

const API_URL = "/club/remove";

export async function clubRemove(
  request: RemoveClubRequest
): Promise<SimpleReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL + `/${request.id}`);
  return resp.data;
}
