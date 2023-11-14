import { getHttpClient } from "@/config/httpClientsHelper";
import { GuestReply } from "@/generated/guest/guest.reply";
import { RemoveGuestRequest } from "@/generated/guest/guest.request";

const API_URL = "/guest/remove";

export async function guestRemove(
  request: RemoveGuestRequest
): Promise<GuestReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL, { params: request });
  return resp.data;
}
