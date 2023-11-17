import { getHttpClient } from "@/config/httpClientsHelper";
import { ReceiptReply } from "@/generated/receipt/receipt.reply";
import { UpdateReceiptRequest } from "@/generated/receipt/receipt.request";

const API_URL = "/receipt/update";

export async function receiptUpdate(
  request: UpdateReceiptRequest
): Promise<ReceiptReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.post(API_URL, request);
  return resp.data;
}
