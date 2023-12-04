import { getHttpClient } from "@/config/httpClientsHelper";
import { DoneReceiptSessionRequest } from "@/generated/receiptSession/receiptSession.request";
import { SimpleReply } from "@/generated/common";

const API_URL = "/receiptSession/done";

export async function receiptSessionDone(
  request: DoneReceiptSessionRequest
): Promise<SimpleReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL + `/${request.id}`);
  return resp.data;
}
