import { getHttpClient } from "@/config/httpClientsHelper";
import { PaymentSessionListReply } from "@/generated/paymentSession/paymentSession.reply";
import { GetPaymentSessionConditionRequest } from "@/generated/paymentSession/paymentSession.request";

const API_URL = "/paymentSession/list";

export async function paymentSessionSearch(
  request: GetPaymentSessionConditionRequest
): Promise<PaymentSessionListReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL, { params: request });
  return resp.data;
}
