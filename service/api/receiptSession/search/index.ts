import { getHttpClient } from "@/config/httpClientsHelper";
import { ReceiptSessionListReply } from "@/generated/receiptSession/receiptSession.reply";
import { GetReceiptSessionConditionRequest } from "@/generated/receiptSession/receiptSession.request";

const API_URL = "/receiptSession/list";

export async function receiptSessionSearch(
  request: GetReceiptSessionConditionRequest
): Promise<ReceiptSessionListReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL, { params: request });
  return resp.data;
}
