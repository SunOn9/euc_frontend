import { getHttpClient } from "@/config/httpClientsHelper";
import { SimpleReply } from "@/generated/common";
import { ResetPasswordRequest } from "@/generated/user/user.request";

const API_URL = "/user/resetPassword";

export async function userResetPassword(
  request: ResetPasswordRequest
): Promise<SimpleReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.post(API_URL, request);
  return resp.data;
}
