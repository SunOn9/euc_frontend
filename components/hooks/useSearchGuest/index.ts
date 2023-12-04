"use client";

import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Guest } from "@/generated/guest/guest";
import { guestSearch } from "@/service/api/guest/search";
import { GetGuestConditionRequest } from "@/generated/guest/guest.request";

export default function useSearchGuest() {
  const [guestSearchParam, setGuestSearchParam] =
    useState<GetGuestConditionRequest>({
      isExtraClub: true,
      page: 1,
    });

  const queryFn = useCallback(
    () => guestSearch(guestSearchParam),
    [guestSearchParam]
  );

  const requestQuery = useQuery(["guestSearch", guestSearchParam], queryFn, {
    refetchOnWindowFocus: false,
    staleTime: 500,
  });

  const { data } = requestQuery;

  const guestList = useMemo<Guest[]>(() => {
    if (!data?.payload?.guestList) return [];

    return data?.payload?.guestList;
  }, [data?.payload?.guestList]);

  const total = useMemo(() => {
    return data?.payload?.total ?? 1;
  }, [data?.payload?.total]);

  return {
    requestQuery,
    guestList,
    setGuestSearchParam,
    total,
  };
}
