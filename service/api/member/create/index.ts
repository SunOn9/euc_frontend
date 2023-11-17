import { getHttpClient } from "@/config/httpClientsHelper";
import { MemberReply } from "@/generated/member/member.reply";
import { CreateMemberRequest } from "@/generated/member/member.request";

const API_URL = "/member/create";

export async function memberCreate(
  request: CreateMemberRequest
): Promise<MemberReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.post(API_URL, request);
  return resp.data;
}
