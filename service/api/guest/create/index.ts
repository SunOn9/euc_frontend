import { getHttpClient } from "@/config/httpClientsHelper";
import { GuestListReply } from "@/generated/guest/guest.reply";
import { CreateGuestRequest } from "@/generated/guest/guest.request";

const API_URL = "/guest/create";

export async function guestCreate(
  request: CreateGuestRequest
): Promise<GuestListReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.post(API_URL, request);
  return resp.data;
}
