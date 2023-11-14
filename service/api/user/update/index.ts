import { getHttpClient } from "@/config/httpClientsHelper";
import { UserListReply } from "@/generated/user/user.reply";
import { UpdateUserRequest } from "@/generated/user/user.request";

const API_URL = "/user/update";

export async function userUpdate(
  request: UpdateUserRequest
): Promise<UserListReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.post(API_URL, request);
  return resp.data;
}
