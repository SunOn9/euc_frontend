import { getHttpClient } from "@/config/httpClientsHelper";
import { GuestReply } from "@/generated/guest/guest.reply";
import { GetGuestConditionRequest } from "@/generated/guest/guest.request";

const API_URL = "/guest/detail";

export async function guestDetail(
  request: GetGuestConditionRequest
): Promise<GuestReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL, { params: request });
  return resp.data;
}
