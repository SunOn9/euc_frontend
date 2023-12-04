"use client";
import { useParams } from "next/navigation";
import EventDetailForm from "../_component/form-update-event";
import { customToast, ToastType } from "@/components/hooks/useToast";
import { eventDetail } from "@/service/api/event/detail";
import { useEffect, useState } from "react";
import { Event } from "@/generated/event/event";
import { title } from "@/components/primitives";

export default function EventDetail() {
  const { id } = useParams();
  const [data, setData] = useState(Event.create());

  const handleChange = () => {
    eventDetail({
      id: Number(id),
      isExtraPlace: true,
      isExtraClub: true,
      isExtraPaymentSession: true,
      isExtraReceiptSession: true,
      isExtraPayment: true,
      isExtraReceipt: true,
      isDeleted: true,
    })
      .then((res) => {
        if (res.statusCode !== 200) {
          customToast("Có lỗi xảy ra", ToastType.ERROR);
          return;
        } else {
          if (res.payload) {
            setData(res.payload);
          }
          return res;
        }
      })
      .catch((err) => {
        customToast(`${err.response?.data?.message}`, ToastType.ERROR);
        return;
      });
  };

  useEffect(() => {
    handleChange();
  }, []);

  return (
    <section className="flex flex-col py-4">
      <div className="flex items-center	 max-w-lg py-4">
        <h1 className={title({ size: "sm" })}>
          Sự kiện: {data.id} - {data.name}&nbsp;
        </h1>
      </div>

      <EventDetailForm event={data} isDetail={false} onClose={handleChange} />
      <EventTable event={data} onChange={handleChange} />
    </section>
  );
}
