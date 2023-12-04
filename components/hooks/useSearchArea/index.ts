"use client";

import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Area } from "@/generated/area/area";
import { areaSearch } from "@/service/api/area/search";
import { GetAreaConditionRequest } from "@/generated/area/area.request";

export default function useSearchArea() {
  const [areaSearchParam, setAreaSearchParam] =
    useState<GetAreaConditionRequest>({
      page: 1,
    });

  const queryFn = useCallback(
    () => areaSearch(areaSearchParam),
    [areaSearchParam]
  );

  const requestQuery = useQuery(["areaSearch", areaSearchParam], queryFn, {
    refetchOnWindowFocus: false,
    staleTime: 500,
  });

  const { data } = requestQuery;

  const areaList = useMemo<Area[]>(() => {
    if (!data?.payload?.areaList) return [];

    return data?.payload?.areaList;
  }, [data?.payload?.areaList]);

  const total = useMemo(() => {
    return data?.payload?.total ?? 1;
  }, [data?.payload?.total]);

  return {
    requestQuery,
    areaList,
    setAreaSearchParam,
    total,
  };
}
