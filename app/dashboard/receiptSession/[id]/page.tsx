"use client";
import { useParams } from "next/navigation";
import ReceiptSessionDetailForm from "../_component/form-detail-receiptSession";
import { customToast, ToastType } from "@/components/hooks/useToast";
import { receiptSessionDetail } from "@/service/api/receiptSession/detail";
import { useEffect, useState } from "react";
import { ReceiptSession } from "@/generated/receiptSession/receiptSession";
import ReceiptTable from "../_component/table-receipt";
import { title } from "@/components/primitives";

export default function ReceiptSessionDetail() {
  const { id } = useParams();
  const [data, setData] = useState(ReceiptSession.create());

  const handleChange = () => {
    receiptSessionDetail({
      id: Number(id),
      isExtraUserConfirm: true,
      isExtraUserDone: true,
      isExtraReceipt: true,
      isDeleted: true,
    })
      .then((res) => {
        if (res.statusCode !== 200) {
          customToast(`Có lỗi xảy ra`, ToastType.ERROR);
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
          Phiếu thu: {data.id} - {data.title}&nbsp;
        </h1>
      </div>

      <ReceiptSessionDetailForm
        receiptSession={data}
        isDetail={false}
        onChange={handleChange}
      />
      <ReceiptTable receiptSession={data} onChange={handleChange} />
    </section>
  );
}
