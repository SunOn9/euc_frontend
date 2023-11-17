import { getHttpClient } from "@/config/httpClientsHelper";
import { EventReply } from "@/generated/event/event.reply";
import { UpdateEventRequest } from "@/generated/event/event.request";

const API_URL = "/event/update";

export async function eventUpdate(
  request: UpdateEventRequest
): Promise<EventReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.post(API_URL, request);
  return resp.data;
}
