import { getHttpClient } from "@/config/httpClientsHelper";
import { SimpleReply } from "@/generated/common";
import { AddGuestToEventRequest } from "@/generated/event/event.request";

const API_URL = "/event/add-guest";

export async function addGuest(
  request: AddGuestToEventRequest
): Promise<SimpleReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.post(API_URL, request);
  return resp.data;
}
