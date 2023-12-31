"use client";

import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/generated/user/user";
import { userSearch } from "@/service/api/user/search";
import { GetUserConditionRequest } from "@/generated/user/user.request";

export default function useSearchUser() {
  const [userSearchParam, setUserSearchParam] =
    useState<GetUserConditionRequest>({
      isDeleted: true,
      isExtraClub: true,
      page: 1,
    });

  const queryFn = useCallback(
    () => userSearch(userSearchParam),
    [userSearchParam]
  );

  const requestQuery = useQuery(["userSearch", userSearchParam], queryFn, {
    refetchOnWindowFocus: false,
    staleTime: 500,
  });

  const { data } = requestQuery;

  const userList = useMemo<User[]>(() => {
    if (!data?.payload?.userList) return [];

    return data?.payload?.userList;
  }, [data?.payload?.userList]);

  const total = useMemo(() => {
    return data?.payload?.total ?? 1;
  }, [data?.payload?.total]);

  return {
    requestQuery,
    userList,
    setUserSearchParam,
    total,
  };
}
