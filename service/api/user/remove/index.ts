import { getHttpClient } from "@/config/httpClientsHelper";
import { UserReply } from "@/generated/user/user.reply";
import { RemoveUserRequest } from "@/generated/user/user.request";

const API_URL = "/user/remove";

export async function userRemove(
  request: RemoveUserRequest
): Promise<UserReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL, { params: request });
  return resp.data;
}
