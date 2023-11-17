import { getHttpClient } from "@/config/httpClientsHelper";
import { EventReply } from "@/generated/event/event.reply";
import { GetEventConditionRequest } from "@/generated/event/event.request";

const API_URL = "/event/detail";

export async function eventDetail(
  request: GetEventConditionRequest
): Promise<EventReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL, { params: request });
  return resp.data;
}
