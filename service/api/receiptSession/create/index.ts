import { getHttpClient } from "@/config/httpClientsHelper";
import { ReceiptSessionReply } from "@/generated/receiptSession/receiptSession.reply";
import { CreateReceiptSessionRequest } from "@/generated/receiptSession/receiptSession.request";

const API_URL = "/receiptSession/create";

export async function receiptSessionCreate(
  request: CreateReceiptSessionRequest
): Promise<ReceiptSessionReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.post(API_URL, request);
  return resp.data;
}
