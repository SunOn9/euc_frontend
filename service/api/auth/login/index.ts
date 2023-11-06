import { getHttpClient } from "@/config/httpClientsHelper";
import { LoginRequest } from "@/generated/auth/auth.request";
import { UserReply } from "@/generated/user/user.reply";

const API_URL = "/auth/login";

export async function login(requestData: LoginRequest): Promise<UserReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.post(API_URL, requestData);
  return resp.data;
}
