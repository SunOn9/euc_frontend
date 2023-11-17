import { getHttpClient } from "@/config/httpClientsHelper";
import { PaymentReply } from "@/generated/payment/payment.reply";
import { CreatePaymentRequest } from "@/generated/payment/payment.request";

const API_URL = "/payment/create";

export async function paymentCreate(
  request: CreatePaymentRequest
): Promise<PaymentReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.post(API_URL, request);
  return resp.data;
}
