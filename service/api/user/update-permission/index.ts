import { getHttpClient } from "@/config/httpClientsHelper";
import { UserListReply } from "@/generated/user/user.reply";
import { UpdateUserPermissionRequest } from "@/generated/user/user.request";

const API_URL = "/user/update-permission";

export async function userUpdatePermission(
  request: UpdateUserPermissionRequest
): Promise<UserListReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.post(API_URL, request);
  return resp.data;
}
