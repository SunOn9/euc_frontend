"use client";

import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Event } from "@/generated/event/event";
import { eventSearch } from "@/service/api/event/search";
import { GetEventConditionRequest } from "@/generated/event/event.request";

export default function useSearchEvent() {
  const [eventSearchParam, setEventSearchParam] =
    useState<GetEventConditionRequest>({
      page: 1,
      isExtraPlace: true,
      isExtraClub: true,
      isExtraPaymentSession: true,
      isExtraReceiptSession: true,
      isExtraPayment: true,
      isExtraReceipt: true,
    });

  const queryFn = useCallback(
    () => eventSearch(eventSearchParam),
    [eventSearchParam]
  );

  const requestQuery = useQuery(["eventSearch", eventSearchParam], queryFn, {
    refetchOnWindowFocus: false,
    staleTime: 500,
  });

  const { data } = requestQuery;

  const eventList = useMemo<Event[]>(() => {
    if (!data?.payload?.eventList) return [];

    return data?.payload?.eventList;
  }, [data?.payload?.eventList]);

  const total = useMemo(() => {
    return data?.payload?.total ?? 1;
  }, [data?.payload?.total]);

  return {
    requestQuery,
    eventList,
    setEventSearchParam,
    total,
  };
}
