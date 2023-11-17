import { getHttpClient } from "@/config/httpClientsHelper";
import { PaymentSessionReply } from "@/generated/paymentSession/paymentSession.reply";
import { GetPaymentSessionConditionRequest } from "@/generated/paymentSession/paymentSession.request";

const API_URL = "/paymentSession/detail";

export async function paymentSessionDetail(
  request: GetPaymentSessionConditionRequest
): Promise<PaymentSessionReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL, { params: request });
  return resp.data;
}
