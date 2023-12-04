"use client";
import { useParams } from "next/navigation";
import PaymentSessionDetailForm from "../_component/form-detail-paymentSession";
import { customToast, ToastType } from "@/components/hooks/useToast";
import { paymentSessionDetail } from "@/service/api/paymentSession/detail";
import { useEffect, useState } from "react";
import { PaymentSession } from "@/generated/paymentSession/paymentSession";
import PaymentTable from "../_component/table-payment";
import { title } from "@/components/primitives";

export default function PaymentSessionDetail() {
  const { id } = useParams();
  const [data, setData] = useState(PaymentSession.create());

  const handleChange = () => {
    paymentSessionDetail({
      id: Number(id),
      isExtraUserConfirm: true,
      isExtraUserDone: true,
      isExtraPayment: true,
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
          Phiếu chi: {data.id} - {data.title}&nbsp;
        </h1>
      </div>

      <PaymentSessionDetailForm
        paymentSession={data}
        isDetail={false}
        onChange={handleChange}
      />
      <PaymentTable paymentSession={data} onChange={handleChange} />
    </section>
  );
}
