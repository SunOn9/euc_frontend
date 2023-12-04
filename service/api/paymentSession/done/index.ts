import { getHttpClient } from "@/config/httpClientsHelper";
import { DonePaymentSessionRequest } from "@/generated/paymentSession/paymentSession.request";
import { SimpleReply } from "@/generated/common";

const API_URL = "/paymentSession/done";

export async function paymentSessionDone(
  request: DonePaymentSessionRequest
): Promise<SimpleReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL + `/${request.id}`);
  return resp.data;
}
