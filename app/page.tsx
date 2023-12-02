"use client";

import { ToastType, customToast } from "@/components/hooks/useToast";
import { title, subtitle } from "@/components/primitives";
import { userDetail } from "@/service/api/user/detail";
import { Button } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";

export default function Home() {
  // const handleCheckAuth = () => {};
  const queryClient = useQueryClient();

  const onRemove = () => {
    userDetail({ id: 3 })
      .then((res) => {
        if (res.statusCode !== 200) {
          customToast("Xóa lô thất bại", ToastType.ERROR);
          return;
        }
        customToast(`Xóa lô Id: ${3} thành công`, ToastType.SUCCESS);
        queryClient.invalidateQueries(["userSearch"]);
      })
      .catch(() => {
        customToast("Có lỗi xảy ra", ToastType.ERROR);
        return;
      });
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title({ color: "yellow" })}>Entixie&nbsp;</h1>
        <h1 className={title()}>Ultimate Club&nbsp;</h1>
        <h2 className={subtitle({ class: "mt-4" })}></h2>
      </div>

      <Button
        className="text-md cursor-pointer active:opacity-50"
        isIconOnly
        disableRipple
        disableAnimation
        onPress={onRemove}
      >
        TEST
      </Button>
    </section>
  );
}
