import { getHttpClient } from "@/config/httpClientsHelper";
import { UserReply } from "@/generated/user/user.reply";

const API_URL = "/auth/logout";

export async function logout(): Promise<UserReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL);
  return resp.data;
}
