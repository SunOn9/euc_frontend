import { getHttpClient } from "@/config/httpClientsHelper";
import { UserListReply } from "@/generated/user/user.reply";
import { CreateUserRequest } from "@/generated/user/user.request";

const API_URL = "/user/create";

export async function userCreate(
  request: CreateUserRequest
): Promise<UserListReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.post(API_URL, request);
  return resp.data;
}
