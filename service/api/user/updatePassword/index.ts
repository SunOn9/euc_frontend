import { getHttpClient } from "@/config/httpClientsHelper";
import { UserReply } from "@/generated/user/user.reply";
import { UpdatePasswordRequest } from "@/generated/user/user.request";

const API_URL = "/user/updateUserPassword";

export async function userUpdatePassword(
  request: UpdatePasswordRequest
): Promise<UserReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.post(API_URL, request);
  return resp.data;
}
