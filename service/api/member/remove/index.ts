import { getHttpClient } from "@/config/httpClientsHelper";
import { SimpleReply } from "@/generated/common";
import { RemoveMemberRequest } from "@/generated/member/member.request";

const API_URL = "/member/remove";

export async function memberRemove(
  request: RemoveMemberRequest
): Promise<SimpleReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL + `/${request.id}`);
  return resp.data;
}
