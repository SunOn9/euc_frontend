import { getHttpClient } from "@/config/httpClientsHelper";
import { PaymentSessionReply } from "@/generated/paymentSession/paymentSession.reply";
import { UpdatePaymentSessionRequest } from "@/generated/paymentSession/paymentSession.request";

const API_URL = "/paymentSession/update";

export async function paymentSessionUpdate(
  request: UpdatePaymentSessionRequest
): Promise<PaymentSessionReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.post(API_URL, request);
  return resp.data;
}
