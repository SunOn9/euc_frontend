import { getHttpClient } from "@/config/httpClientsHelper";
import { PaymentReply } from "@/generated/payment/payment.reply";
import { UpdatePaymentRequest } from "@/generated/payment/payment.request";

const API_URL = "/payment/update";

export async function paymentUpdate(
  request: UpdatePaymentRequest
): Promise<PaymentReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.post(API_URL, request);
  return resp.data;
}
