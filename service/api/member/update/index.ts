import { getHttpClient } from "@/config/httpClientsHelper";
import { MemberListReply } from "@/generated/member/member.reply";
import { UpdateMemberRequest } from "@/generated/member/member.request";

const API_URL = "/member/update";

export async function memberUpdate(
  request: UpdateMemberRequest
): Promise<MemberListReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.post(API_URL, request);
  return resp.data;
}
