import { getHttpClient } from "@/config/httpClientsHelper";
import { EventReply } from "@/generated/event/event.reply";
import { CreateEventRequest } from "@/generated/event/event.request";

const API_URL = "/event/create";

export async function eventCreate(
  request: CreateEventRequest
): Promise<EventReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.post(API_URL, request);
  return resp.data;
}
