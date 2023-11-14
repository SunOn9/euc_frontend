import { getHttpClient } from "@/config/httpClientsHelper";
import { MemberListReply } from "@/generated/member/member.reply";
import { GetMemberConditionRequest } from "@/generated/member/member.request";

const API_URL = "/member/list";

export async function memberSearch(
  request: GetMemberConditionRequest
): Promise<MemberListReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL, { params: request });
  return resp.data;
}
