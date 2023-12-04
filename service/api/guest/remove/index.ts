import { getHttpClient } from "@/config/httpClientsHelper";
import { SimpleReply } from "@/generated/common";
import { RemoveGuestRequest } from "@/generated/guest/guest.request";

const API_URL = "/guest/remove";

export async function guestRemove(
  request: RemoveGuestRequest
): Promise<SimpleReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL + `/${request.id}`);
  return resp.data;
}
