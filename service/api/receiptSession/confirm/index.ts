import { getHttpClient } from "@/config/httpClientsHelper";
import { ConfirmReceiptSessionRequest } from "@/generated/receiptSession/receiptSession.request";
import { SimpleReply } from "@/generated/common";

const API_URL = "/receiptSession/confirm";

export async function receiptSessionConfirm(
  request: ConfirmReceiptSessionRequest
): Promise<SimpleReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL + `/${request.id}`);
  return resp.data;
}
