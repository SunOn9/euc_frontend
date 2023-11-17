import { getHttpClient } from "@/config/httpClientsHelper";
import { RemoveReceiptSessionRequest } from "@/generated/receiptSession/receiptSession.request";
import { SimpleReply } from "@/generated/common";

const API_URL = "/receiptSession/remove";

export async function receiptSessionRemove(
  request: RemoveReceiptSessionRequest
): Promise<SimpleReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL, { params: request });
  return resp.data;
}
