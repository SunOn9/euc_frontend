import { getHttpClient } from "@/config/httpClientsHelper";
import { LogListReply } from "@/generated/log/log.reply";
import { GetLogConditionRequest } from "@/generated/log/log.request";

const API_URL = "/log/list";

export async function logSearch(
  request: GetLogConditionRequest
): Promise<LogListReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL, { params: request });
  return resp.data;
}
