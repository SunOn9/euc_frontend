import { getHttpClient } from "@/config/httpClientsHelper";
import { SimpleReply } from "@/generated/common";
import { RemoveMemberFromEventRequest } from "@/generated/event/event.request";

const API_URL = "/event/remove-member";

export async function removeMember(
  request: RemoveMemberFromEventRequest
): Promise<SimpleReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.post(API_URL, request);
  return resp.data;
}
