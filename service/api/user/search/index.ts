import { getHttpClient } from "@/config/httpClientsHelper";
import { UserListReply } from "@/generated/user/user.reply";
import { GetUserConditionRequest } from "@/generated/user/user.request";

const API_URL = "/user/list";

export async function userSearch(
  request: GetUserConditionRequest
): Promise<UserListReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL, { params: request });
  return resp.data;
}
