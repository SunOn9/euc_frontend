import { getHttpClient } from "@/config/httpClientsHelper";
import { SimpleReply } from "@/generated/common";
import { AddMemberToEventRequest } from "@/generated/event/event.request";

const API_URL = "/event/add-member";

export async function addMember(
  request: AddMemberToEventRequest
): Promise<SimpleReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.post(API_URL, request);
  return resp.data;
}
