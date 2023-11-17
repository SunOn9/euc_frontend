import { getHttpClient } from "@/config/httpClientsHelper";
import { ReceiptSessionReply } from "@/generated/receiptSession/receiptSession.reply";
import { GetReceiptSessionConditionRequest } from "@/generated/receiptSession/receiptSession.request";

const API_URL = "/receiptSession/detail";

export async function receiptSessionDetail(
  request: GetReceiptSessionConditionRequest
): Promise<ReceiptSessionReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL, { params: request });
  return resp.data;
}
