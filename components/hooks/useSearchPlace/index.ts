"use client";

import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Place } from "@/generated/place/place";
import { placeSearch } from "@/service/api/place/search";
import { GetPlaceConditionRequest } from "@/generated/place/place.request";

export default function useSearchPlace() {
  const [placeSearchParam, setPlaceSearchParam] =
    useState<GetPlaceConditionRequest>({
      page: 1,
    });

  const queryFn = useCallback(
    () => placeSearch(placeSearchParam),
    [placeSearchParam]
  );

  const requestQuery = useQuery(["placeSearch", placeSearchParam], queryFn, {
    refetchOnWindowFocus: false,
    staleTime: 500,
  });

  const { data } = requestQuery;

  const placeList = useMemo<Place[]>(() => {
    if (!data?.payload?.placeList) return [];

    return data?.payload?.placeList;
  }, [data?.payload?.placeList]);

  const total = useMemo(() => {
    return data?.payload?.total ?? 1;
  }, [data?.payload?.total]);

  return {
    requestQuery,
    placeList,
    setPlaceSearchParam,
    total,
  };
}
