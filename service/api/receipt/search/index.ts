import { getHttpClient } from "@/config/httpClientsHelper";
import { ReceiptListReply } from "@/generated/receipt/receipt.reply";
import { GetReceiptConditionRequest } from "@/generated/receipt/receipt.request";

const API_URL = "/receipt/list";

export async function receiptSearch(
  request: GetReceiptConditionRequest
): Promise<ReceiptListReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL, { params: request });
  return resp.data;
}
