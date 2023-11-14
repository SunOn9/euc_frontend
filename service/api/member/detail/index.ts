import { getHttpClient } from "@/config/httpClientsHelper";
import { MemberReply } from "@/generated/member/member.reply";
import { GetMemberConditionRequest } from "@/generated/member/member.request";

const API_URL = "/member/detail";

export async function memberDetail(
  request: GetMemberConditionRequest
): Promise<MemberReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL, { params: request });
  return resp.data;
}
