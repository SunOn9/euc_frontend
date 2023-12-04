import { getHttpClient } from "@/config/httpClientsHelper";
import { ConfirmPaymentSessionRequest } from "@/generated/paymentSession/paymentSession.request";
import { SimpleReply } from "@/generated/common";

const API_URL = "/paymentSession/confirm";

export async function paymentSessionConfirm(
  request: ConfirmPaymentSessionRequest
): Promise<SimpleReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL + `/${request.id}`);
  return resp.data;
}
