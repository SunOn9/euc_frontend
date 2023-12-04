"use client";
import React, { useState } from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
import {
  ActionType,
  DataType,
  intoTable,
  statusColorMapEventType,
} from "./type";
import {
  Modal,
  Button,
  Chip,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
} from "@nextui-org/react";
import useSearchEvent from "../../../../../components/hooks/useSearchEvent";
import {
  EyeIcon,
  EditIcon,
  DeleteIcon,
  AddIcon,
  SearchIcon,
} from "@/components/icons";
import { title } from "@/components/primitives";
import { eventRemove } from "@/service/api/event/remove";
import { useQueryClient } from "@tanstack/react-query";
import { ToastType, customToast } from "@/components/hooks/useToast";
import EventForm from "../form-create-event";
import { Event } from "@/generated/event/event";
import { eventDetail } from "@/service/api/event/detail";
import { EventReply } from "@/generated/event/event.reply";
import EventFilterForm from "../form-filter-event";
import { defaulLimit } from "@/config/env";
import { useRouter } from "next/navigation";
import EventUpdateForm from "../form-update-event";

export default function EventTable() {
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "STT",
      dataIndex: "stt",
      width: 15,
    },
    {
      title: "Tên",
      dataIndex: "name",
      width: 30,
    },
    {
      title: "Loại",
      dataIndex: "type",
      width: 30,
      render: (value) => {
        return (
          <Chip
            className="capitalize"
            color={statusColorMapEventType[value]}
            size="sm"
            variant="flat"
          >
            {value}
          </Chip>
        );
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      width: 30,
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startEventDate",
      width: 30,
    },

    {
      title: "Ngày kết thúc",
      dataIndex: "endEventDate",
      width: 30,
    },
    {
      title: "Nơi tổ chức",
      dataIndex: "placeName",
      width: 30,
    },
    {
      title: "CLB",
      dataIndex: "clubName",
      width: 30,
    },
    {
      title: "Ngày kết thúc thực tế",
      dataIndex: "actualEndEventDate",
      width: 30,
    },

    {
      title: "Hành động",
      dataIndex: "action",
      width: 30,
      fixed: "right",
      render: (value: ActionType) => {
        if (value.isDeleted) {
          return null;
        } else
          return (
            <div className="relative flex items-center">
              <Tooltip content="Chi tiết">
                <Button
                  className="text-md text-default-400 cursor-pointer active:opacity-50"
                  variant="light"
                  isIconOnly
                  disableRipple
                  disableAnimation
                  startContent={<EyeIcon />}
                  onPress={() => router.push(`/event/${value.id}`)}
                />
              </Tooltip>
              <Tooltip content="Sửa">
                <Button
                  className="text-md text-default-400 cursor-pointer active:opacity-50"
                  variant="light"
                  isIconOnly
                  disableRipple
                  disableAnimation
                  onPress={() => handleOpenEventModal(3, value.id)}
                  startContent={<EditIcon />}
                />
              </Tooltip>
              <Tooltip color="danger" content="Xoá">
                <Button
                  className="text-md text-danger cursor-pointer active:opacity-50"
                  variant="light"
                  isIconOnly
                  disableRipple
                  disableAnimation
                  onPress={() => handleOpen(value.id)}
                  startContent={<DeleteIcon />}
                />
              </Tooltip>
            </div>
          );
      },
    },
  ];

  const router = useRouter();

  const handleOpen = (props: number) => {
    setOpen(true);
    setId(props);
  };

  const handleClose = () => {
    setOpen(false);
    setId(0);
  };

  const handleOpenEventModal = async (type: number, id?: number) => {
    let data: void | EventReply | undefined;
    if (id) {
      data = await eventDetail({
        id: id,
        isExtraPlace: true,
        isExtraClub: true,
        isExtraPaymentSession: true,
        isExtraReceiptSession: true,
        isExtraPayment: true,
        isExtraReceipt: true,
      })
        .then((res) => {
          if (res.statusCode !== 200) {
            customToast("Có lỗi xảy ra", ToastType.ERROR);
            return;
          } else {
            if (res.payload) {
              setEvent(res.payload);
            }
            return res;
          }
        })
        .catch((err) => {
          customToast(`${err.response?.data?.message}`, ToastType.ERROR);
          return;
        });
    }
    if (data && data.payload) {
      setEvent(data.payload);
    }
    setTypeModal(type);
    setOpenEvent(true);
  };

  const handleCloseEventModal = () => {
    setId(0);
    setTypeModal(0);
    setOpenEvent(false);
  };

  const onRemove = () => {
    eventRemove({ id: id })
      .then((res) => {
        if (res.statusCode !== 200) {
          customToast("Xóa sự kiện thất bại", ToastType.ERROR);
          handleClose();
          return;
        }
        customToast(`Xóa sự kiện Id: ${id} thành công`, ToastType.SUCCESS);
        queryClient.invalidateQueries(["eventSearch"]);
        handleClose();
      })
      .catch(() => {
        customToast("Có lỗi xảy ra", ToastType.ERROR);
        handleClose();
        return;
      });
  };

  const { eventList, total, setEventSearchParam } = useSearchEvent();
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [openEvent, setOpenEvent] = useState(false);
  const [typeModal, setTypeModal] = useState(0);
  const queryClient = useQueryClient();
  const [id, setId] = useState(0);
  const [event, setEvent] = useState(Event.create());
  const [showFilter, setShowFilter] = useState<boolean>(false);

  return (
    <div>
      <div className="flex items-center	 max-w-lg py-4">
        <h1 className={title({ size: "sm" })}>Quản lý sự kiện&nbsp;</h1>
        <Tooltip content="Tạo">
          <Button
            className="text-sm cursor-pointer active:opacity-50"
            variant="light"
            isIconOnly
            disableRipple
            disableAnimation
            startContent={<AddIcon />}
            onPress={() => handleOpenEventModal(1)}
          />
        </Tooltip>
        <Tooltip content="Bộ lọc">
          <Button
            className="text-sm cursor-pointer active:opacity-50"
            variant="light"
            isIconOnly
            disableRipple
            disableAnimation
            startContent={<SearchIcon />}
            onPress={() => {
              setShowFilter(!showFilter);
            }}
          />
        </Tooltip>
      </div>
      <EventFilterForm
        showFilter={showFilter}
        setEventSearchParam={setEventSearchParam}
      />
      <Table
        size="small"
        className="pt-4"
        columns={columns}
        dataSource={intoTable(eventList, page)}
        rowKey={(record) => record.action.id}
        pagination={{
          total: total,
          defaultPageSize: defaulLimit,
          current: page,
          onChange: (page) => {
            setPage(page);
            setEventSearchParam({
              page: page,
              limit: defaulLimit,
              isExtraPlace: true,
              isExtraClub: true,
              isExtraPaymentSession: true,
              isExtraReceiptSession: true,
              isExtraPayment: true,
              isExtraReceipt: true,
            });
          },
          showSizeChanger: false,
        }}
        bordered
        scroll={{
          x: 1300,
        }}
      />
      <Modal
        size="xs"
        isOpen={open}
        onClose={handleClose}
        placement="top-center"
        isDismissable={false}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col">Xoá</ModalHeader>
            <ModalBody>Xác nhận xoá dữ liệu này?</ModalBody>
            <ModalFooter>
              <Button
                className="bold"
                color="danger"
                variant="flat"
                onPress={handleClose}
              >
                Huỷ
              </Button>
              <Button className="bold" color="primary" onPress={onRemove}>
                Xoá
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={openEvent}
        onClose={handleCloseEventModal}
        size="2xl"
        isDismissable={false}
      >
        <ModalContent>
          <ModalHeader className="">
            {(() => {
              switch (typeModal) {
                case 1:
                  return <span>Tạo sự kiện</span>;
                // case 2:
                //   return <span>Chi tiết sự kiện</span>;
                case 3:
                  return <span>Chỉnh sửa sự kiện</span>;
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
                      <EventForm onClose={handleCloseEventModal} />
                    </>
                  );
                // case 2:
                //   return (
                //     <EventDetailForm
                //       onClose={handleCloseEventModal}
                //       event={event}
                //       isDetail={true}
                //     />
                //   );
                case 3:
                  return (
                    <EventUpdateForm
                      onClose={handleCloseEventModal}
                      event={event}
                    />
                  );
                default:
                  return null;
              }
            })()}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
