import { getHttpClient } from "@/config/httpClientsHelper";
import { ReceiptReply } from "@/generated/receipt/receipt.reply";
import { CreateReceiptRequest } from "@/generated/receipt/receipt.request";

const API_URL = "/receipt/create";

export async function receiptCreate(
  request: CreateReceiptRequest
): Promise<ReceiptReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.post(API_URL, request);
  return resp.data;
}
