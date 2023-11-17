import { getHttpClient } from "@/config/httpClientsHelper";
import { SimpleReply } from "@/generated/common";

const API_URL = "/auth/logout";

export async function logout(): Promise<SimpleReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL);
  return resp.data;
}
