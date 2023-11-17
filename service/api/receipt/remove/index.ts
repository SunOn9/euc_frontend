import { getHttpClient } from "@/config/httpClientsHelper";
import { RemoveReceiptRequest } from "@/generated/receipt/receipt.request";
import { SimpleReply } from "@/generated/common";

const API_URL = "/receipt/remove";

export async function receiptRemove(
  request: RemoveReceiptRequest
): Promise<SimpleReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL, { params: request });
  return resp.data;
}
