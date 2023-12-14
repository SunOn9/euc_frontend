"use client";
import { useParams, useRouter } from "next/navigation";
import { customToast, ToastType } from "@/components/hooks/useToast";
import { eventDetail } from "@/service/api/event/detail";
import { useEffect, useState } from "react";
import { Event } from "@/generated/event/event";
import { title } from "@/components/primitives";
import EventDetailForm from "../_component/form-detail-event";
import MemberTable from "../_component/table-member/page";
import GuestTable from "../_component/table-guest/page";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Tooltip,
} from "@nextui-org/react";
import { RotationIcon } from "@/components/icons";
import clsx from "clsx";
import PaymentSessionTable from "../_component/paymentSession-table";
import ReceiptSessionTable from "../_component/receiptSession-table";
import { endEvent } from "@/service/api/event/endEvent";

export default function EventDetail() {
  const { id } = useParams();
  const [data, setData] = useState(Event.create());
  const [change, setChange] = useState(true);
  const [typeModal, setTypeModal] = useState(0);
  const [openEvent, setOpenEvent] = useState(false);

  const handleOpenEventModal = (type: number) => {
    setTypeModal(type);
    setOpenEvent(true);
  };

  const handleCloseEventModal = () => {
    setTypeModal(0);
    setOpenEvent(false);
  };

  const handleEndEvent = () => {
    endEvent({ id: data.id })
      .then((res) => {
        if (res.statusCode !== 200) {
          customToast(`Có lôi xảy ra`, ToastType.ERROR);
          return;
        } else {
          customToast("Kết thúc sự kiện thành công", ToastType.SUCCESS);
          return;
        }
      })
      .catch((err) => {
        customToast(`${err.response?.data?.message}`, ToastType.ERROR);
        return;
      });
  };

  const handleChange = () => {
    eventDetail({
      id: Number(id),
      isExtraPlace: true,
      isExtraClub: true,
      isExtraPaymentSession: true,
      isExtraReceiptSession: true,
      isExtraPayment: true,
      isExtraReceipt: true,
      isExtraMember: true,
      isExtraGuest: true,
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

  const handleSwitch = () => {
    setChange(!change);
  };

  useEffect(() => {
    handleChange();
  }, []);

  return (
    <section className="flex flex-col py-4">
      <div className="flex flex-row items-center py-4 gap-4 space-x-4">
        <h1 className={clsx(title({ size: "sm" }))}>
          Sự kiện: {data.id} - {data.name}&nbsp;
        </h1>

        <Tooltip content={change ? "Khách" : "Thành viên"}>
          <Button
            className="text-md text-default-400 cursor-pointer active:opacity-50"
            variant="light"
            isIconOnly
            disableRipple
            disableAnimation
            startContent={<RotationIcon />}
            onPress={handleSwitch}
          />
        </Tooltip>

        <Button
          isDisabled={data.deletedAt !== null}
          color="primary"
          className="bold text-sm cursor-pointer active:opacity-50"
          disableRipple
          disableAnimation
          onPress={() => handleOpenEventModal(2)}
        >
          Phiếu thu
        </Button>
        <Button
          isDisabled={data.deletedAt !== null}
          color="primary"
          className="bold text-sm cursor-pointer active:opacity-50"
          disableRipple
          disableAnimation
          onPress={() => handleOpenEventModal(1)}
        >
          Phiếu chi
        </Button>
        <Button
          isDisabled={
            data.deletedAt !== null || data.actualEndEventDate !== null
          }
          color="primary"
          className="bold text-sm cursor-pointer active:opacity-50"
          disableRipple
          disableAnimation
          onPress={handleEndEvent}
        >
          Kết thúc sự kiện
        </Button>
      </div>

      <EventDetailForm event={data} />
      {change ? (
        <MemberTable event={data} onChange={handleChange} />
      ) : (
        <GuestTable event={data} onChange={handleChange} />
      )}

      <Modal
        className="p-5"
        isOpen={openEvent}
        onClose={handleCloseEventModal}
        size="5xl"
        isDismissable={false}
      >
        <ModalContent>
          <ModalHeader className="">
            {(() => {
              switch (typeModal) {
                case 1:
                  return <span>Phiếu chi</span>;
                case 2:
                  return <span>Phiếu thu</span>;

                default:
                  return null;
              }
            })()}
          </ModalHeader>
          <ModalBody>
            {(() => {
              switch (typeModal) {
                case 1:
                  return (
                    <>
                      <PaymentSessionTable
                        handleReload={handleChange}
                        eventId={Number(id)}
                        paymentSessionList={data.paymentSession}
                      />
                    </>
                  );
                case 2:
                  return (
                    <>
                      <ReceiptSessionTable
                        eventId={Number(id)}
                        handleReload={handleChange}
                        receiptSessionList={data.receiptSession}
                      />
                    </>
                  );

                default:
                  return null;
              }
            })()}
          </ModalBody>
        </ModalContent>
      </Modal>
    </section>
  );
}
