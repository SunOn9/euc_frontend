"use client";

import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Member } from "@/generated/member/member";
import { memberSearch } from "@/service/api/member/search";
import { GetMemberConditionRequest } from "@/generated/member/member.request";
import { User } from "@/generated/user/user";


export default function useSearchMember() {
  const [memberSearchParam, setMemberSearchParam] =
    useState<GetMemberConditionRequest>({
      isExtraClub: true,
      isExtraArea: true,
      page: 1,
    });

  const queryFn = useCallback(
    () => memberSearch(memberSearchParam),
    [memberSearchParam]
  );

  const requestQuery = useQuery(["memberSearch", memberSearchParam], queryFn, {
    refetchOnWindowFocus: false,
    staleTime: 500,
  });

  const { data } = requestQuery;

  const memberList = useMemo<Member[]>(() => {
    if (!data?.payload?.memberList) return [];

    return data?.payload?.memberList;
  }, [data?.payload?.memberList]);

  const total = useMemo(() => {
    return data?.payload?.total ?? 1;
  }, [data?.payload?.total]);

  return {
    requestQuery,
    memberList,
    setMemberSearchParam,
    total,
    memberSearchParam,
  };
}
