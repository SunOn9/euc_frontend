import { getHttpClient } from "@/config/httpClientsHelper";
import { GuestListReply } from "@/generated/guest/guest.reply";
import { GetGuestConditionRequest } from "@/generated/guest/guest.request";

const API_URL = "/guest/list";

export async function guestSearch(
  request: GetGuestConditionRequest
): Promise<GuestListReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL, { params: request });
  return resp.data;
}
