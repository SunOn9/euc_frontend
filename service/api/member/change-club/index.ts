import { getHttpClient } from "@/config/httpClientsHelper";
import { SimpleReply } from "@/generated/common";
import { UpdateClubOfMemberRequest } from "@/generated/member/member.request";

const API_URL = "/member/change-club";

export async function memberChangeClub(
  request: UpdateClubOfMemberRequest
): Promise<SimpleReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.post(API_URL, request);
  return resp.data;
}
