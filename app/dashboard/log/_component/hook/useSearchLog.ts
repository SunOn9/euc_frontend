"use client";

import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Log } from "@/generated/log/log";
import { logSearch } from "@/service/api/log/search";
import { GetLogConditionRequest } from "@/generated/log/log.request";

export default function useSearchLog() {
  const [logSearchParam, setLogSearchParam] = useState<GetLogConditionRequest>({
    isExtraUser: true,
    page: 1,
    limit: 20,
  });

  const queryFn = useCallback(
    () => logSearch(logSearchParam),
    [logSearchParam]
  );

  const requestQuery = useQuery(["logSearch", logSearchParam], queryFn, {
    refetchOnWindowFocus: false,
    staleTime: 500,
  });

  const { data } = requestQuery;

  const logList = useMemo<Log[]>(() => {
    if (!data?.payload?.logList) return [];

    return data?.payload?.logList;
  }, [data?.payload?.logList]);

  const total = useMemo(() => {
    return data?.payload?.total ?? 0;
  }, [data?.payload?.total]);

  return {
    requestQuery,
    logList,
    setLogSearchParam,
    total,
  };
}
