"use client";

import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Payment } from "@/generated/payment/payment";
import { paymentSearch } from "@/service/api/payment/search";
import { GetPaymentConditionRequest } from "@/generated/payment/payment.request";

export default function useSearchPayment() {
  const [paymentSearchParam, setPaymentSearchParam] =
    useState<GetPaymentConditionRequest>({
      page: 1,
    });

  const queryFn = useCallback(
    () => paymentSearch(paymentSearchParam),
    [paymentSearchParam]
  );

  const requestQuery = useQuery(
    ["paymentSearch", paymentSearchParam],
    queryFn,
    {
      refetchOnWindowFocus: false,
      staleTime: 500,
    }
  );

  const { data } = requestQuery;

  const paymentList = useMemo<Payment[]>(() => {
    if (!data?.payload?.paymentList) return [];

    return data?.payload?.paymentList;
  }, [data?.payload?.paymentList]);

  const total = useMemo(() => {
    return data?.payload?.total ?? 1;
  }, [data?.payload?.total]);

  return {
    requestQuery,
    paymentList,
    setPaymentSearchParam,
    total,
  };
}
