import { getHttpClient } from "@/config/httpClientsHelper";
import { ReceiptReply } from "@/generated/receipt/receipt.reply";
import { GetReceiptConditionRequest } from "@/generated/receipt/receipt.request";

const API_URL = "/receipt/detail";

export async function receiptDetail(
  request: GetReceiptConditionRequest
): Promise<ReceiptReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL, { params: request });
  return resp.data;
}
