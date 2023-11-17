import { getHttpClient } from "@/config/httpClientsHelper";
import { PaymentReply } from "@/generated/payment/payment.reply";
import { GetPaymentConditionRequest } from "@/generated/payment/payment.request";

const API_URL = "/payment/detail";

export async function paymentDetail(
  request: GetPaymentConditionRequest
): Promise<PaymentReply> {
  const httpClient = await getHttpClient();
  const resp = await httpClient.get(API_URL, { params: request });
  return resp.data;
}
