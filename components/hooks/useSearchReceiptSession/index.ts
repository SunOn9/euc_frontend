"use client";

import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ReceiptSession } from "@/generated/receiptSession/receiptSession";
import { receiptSessionSearch } from "@/service/api/receiptSession/search";
import { GetReceiptSessionConditionRequest } from "@/generated/receiptSession/receiptSession.request";

export default function useSearchReceiptSession() {
  const [receiptSessionSearchParam, setReceiptSessionSearchParam] =
    useState<GetReceiptSessionConditionRequest>({
      page: 1,
      isExtraUserConfirm: true,
      isExtraUserDone: true,
    });

  const queryFn = useCallback(
    () => receiptSessionSearch(receiptSessionSearchParam),
    [receiptSessionSearchParam]
  );

  const requestQuery = useQuery(
    ["receiptSessionSearch", receiptSessionSearchParam],
    queryFn,
    {
      refetchOnWindowFocus: false,
      staleTime: 500,
    }
  );

  const { data } = requestQuery;

  const receiptSessionList = useMemo<ReceiptSession[]>(() => {
    if (!data?.payload?.receiptSessionList) return [];

    return data?.payload?.receiptSessionList;
  }, [data?.payload?.receiptSessionList]);

  const total = useMemo(() => {
    return data?.payload?.total ?? 1;
  }, [data?.payload?.total]);

  return {
    requestQuery,
    receiptSessionList,
    setReceiptSessionSearchParam,
    total,
  };
}
