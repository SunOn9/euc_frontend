"use client";
import { logout } from "@/service/api/auth/logout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    logout()
      .then(() => {
        router.push("/login");
      })
      .catch((err) => {
        router.push("/login");
      });
  }, []);

  return (
    <section className="h-full flex flex-col items-center content-evenly	 justify-center gap-4 py-8 md:py-10"></section>
  );
}
