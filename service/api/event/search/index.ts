import { getHttpClient } from "@/config/httpClientsHelper";
import { EventListReply } from "@/generated/event/event.reply";
import { GetEventConditionRequest } from "@/generated/event/event.request";

const API_URL = "/event/list";

export async function eventSearch(
  request: GetEventConditionRequest
): Promise<EventListReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL, { params: request });
  return resp.data;
}
