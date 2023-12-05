import { getHttpClient } from "@/config/httpClientsHelper";
import { SimpleReply } from "@/generated/common";
import { EndEventRequest } from "@/generated/event/event.request";

const API_URL = "/event/end";

export async function endEvent(request: EndEventRequest): Promise<SimpleReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.post(API_URL, request);
  return resp.data;
}
