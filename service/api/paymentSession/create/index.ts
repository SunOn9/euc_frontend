import { getHttpClient } from "@/config/httpClientsHelper";
import { PaymentSessionReply } from "@/generated/paymentSession/paymentSession.reply";
import { CreatePaymentSessionRequest } from "@/generated/paymentSession/paymentSession.request";

const API_URL = "/paymentSession/create";

export async function paymentSessionCreate(
  request: CreatePaymentSessionRequest
): Promise<PaymentSessionReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.post(API_URL, request);
  return resp.data;
}
