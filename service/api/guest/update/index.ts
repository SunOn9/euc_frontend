import { getHttpClient } from "@/config/httpClientsHelper";
import { GuestReply } from "@/generated/guest/guest.reply";
import { UpdateGuestRequest } from "@/generated/guest/guest.request";

const API_URL = "/guest/update";

export async function guestUpdate(
  request: UpdateGuestRequest
): Promise<GuestReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.post(API_URL, request);
  return resp.data;
}
