import { getHttpClient } from "@/config/httpClientsHelper";
import { SimpleReply } from "@/generated/common";
import { RemoveGuestFromEventRequest } from "@/generated/event/event.request";

const API_URL = "/event/remove-guest";

export async function removeGuestEvent(
  request: RemoveGuestFromEventRequest
): Promise<SimpleReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.post(API_URL, request);
  return resp.data;
}
