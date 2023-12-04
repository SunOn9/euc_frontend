"use client";

import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PaymentSession } from "@/generated/paymentSession/paymentSession";
import { paymentSessionSearch } from "@/service/api/paymentSession/search";
import { GetPaymentSessionConditionRequest } from "@/generated/paymentSession/paymentSession.request";

export default function useSearchPaymentSession() {
  const [paymentSessionSearchParam, setPaymentSessionSearchParam] =
    useState<GetPaymentSessionConditionRequest>({
      page: 1,
    });

  const queryFn = useCallback(
    () => paymentSessionSearch(paymentSessionSearchParam),
    [paymentSessionSearchParam]
  );

  const requestQuery = useQuery(
    ["paymentSessionSearch", paymentSessionSearchParam],
    queryFn,
    {
      refetchOnWindowFocus: false,
      staleTime: 500,
    }
  );

  const { data } = requestQuery;

  const paymentSessionList = useMemo<PaymentSession[]>(() => {
    if (!data?.payload?.paymentSessionList) return [];

    return data?.payload?.paymentSessionList;
  }, [data?.payload?.paymentSessionList]);

  const total = useMemo(() => {
    return data?.payload?.total ?? 1;
  }, [data?.payload?.total]);

  return {
    requestQuery,
    paymentSessionList,
    setPaymentSessionSearchParam,
    total,
  };
}
