"use client";

import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Club } from "@/generated/club/club";
import { clubSearch } from "@/service/api/club/search";
import { GetClubConditionRequest } from "@/generated/club/club.request";

export default function useSearchClub() {
  const [clubSearchParam, setClubSearchParam] =
    useState<GetClubConditionRequest>({
      page: 1,
      isExtraArea: true,
      isExtraClubFee: true,
    });

  const queryFn = useCallback(
    () => clubSearch(clubSearchParam),
    [clubSearchParam]
  );

  const requestQuery = useQuery(["clubSearch", clubSearchParam], queryFn, {
    refetchOnWindowFocus: false,
    staleTime: 500,
  });

  const { data } = requestQuery;

  const clubList = useMemo<Club[]>(() => {
    if (!data?.payload?.clubList) return [];

    return data?.payload?.clubList;
  }, [data?.payload?.clubList]);

  const total = useMemo(() => {
    return data?.payload?.total ?? 1;
  }, [data?.payload?.total]);

  return {
    requestQuery,
    clubList,
    setClubSearchParam,
    total,
  };
}
