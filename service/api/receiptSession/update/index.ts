import { getHttpClient } from "@/config/httpClientsHelper";
import { ReceiptSessionReply } from "@/generated/receiptSession/receiptSession.reply";
import { UpdateReceiptSessionRequest } from "@/generated/receiptSession/receiptSession.request";

const API_URL = "/receiptSession/update";

export async function receiptSessionUpdate(
  request: UpdateReceiptSessionRequest
): Promise<ReceiptSessionReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.post(API_URL, request);
  return resp.data;
}
