import { getHttpClient } from "@/config/httpClientsHelper";
import { UserReply } from "@/generated/user/user.reply";
import { GetUserConditionRequest } from "@/generated/user/user.request";

const API_URL = "/user/detail";

export async function userDetail(
  request: GetUserConditionRequest
): Promise<UserReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL, { params: request });
  return resp.data;
}
