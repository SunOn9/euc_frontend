import { getHttpClient } from "@/config/httpClientsHelper";
import { SimpleReply } from "@/generated/common";

const API_URL = "/auth/check";

export async function checkAuth(): Promise<SimpleReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL);
  return resp.data;
}
