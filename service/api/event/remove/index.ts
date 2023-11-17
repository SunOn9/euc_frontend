import { getHttpClient } from "@/config/httpClientsHelper";
import { RemoveEventRequest } from "@/generated/event/event.request";
import { SimpleReply } from "@/generated/common";

const API_URL = "/event/remove";

export async function eventRemove(
  request: RemoveEventRequest
): Promise<SimpleReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL, { params: request });
  return resp.data;
}
