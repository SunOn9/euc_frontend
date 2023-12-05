"use client";
import { ToastType, customToast } from "@/components/hooks/useToast";
import { logout } from "@/service/api/auth/logout";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    logout()
      .then(() => {
        Cookies.remove("euc.sessionid");
        router.push("/login");
      })
      .catch((err) => {
        customToast(err, ToastType.ERROR);
      });
  }, []);

  return (
    <section className="h-full flex flex-col items-center content-evenly	 justify-center gap-4 py-8 md:py-10"></section>
  );
}
