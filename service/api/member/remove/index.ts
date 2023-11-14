import { getHttpClient } from "@/config/httpClientsHelper";
import { MemberReply } from "@/generated/member/member.reply";
import { RemoveMemberRequest } from "@/generated/member/member.request";

const API_URL = "/member/remove";

export async function memberRemove(
  request: RemoveMemberRequest
): Promise<MemberReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL, { params: request });
  return resp.data;
}
