"use client";
import React, { useState } from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
import {
  ActionType,
  DataType,
  intoTable,
  statusColorMapStatus,
  statusColorMapGender,
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
import useSearchPaymentSession from "../../../../../components/hooks/useSearchPaymentSession";
import {
  EyeIcon,
  EditIcon,
  DeleteIcon,
  AddIcon,
  SearchIcon,
} from "@/components/icons";
import { title } from "@/components/primitives";
import { paymentSessionRemove } from "@/service/api/paymentSession/remove";
import { useQueryClient } from "@tanstack/react-query";
import { ToastType, customToast } from "@/components/hooks/useToast";
import PaymentSessionForm from "../form-create-paymentSession";
import PaymentSessionDetailForm from "../form-detail-paymentSession";
import { PaymentSession } from "@/generated/paymentSession/paymentSession";
import { paymentSessionDetail } from "@/service/api/paymentSession/detail";
import { PaymentSessionReply } from "@/generated/paymentSession/paymentSession.reply";
import PaymentSessionFilterForm from "../form-filter-paymentSession";
import { useRouter } from "next/navigation";
import { defaulLimit } from "@/config/env";

export default function PaymentSessionTable() {
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "STT",
      dataIndex: "stt",
      width: 15,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      width: 30,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      width: 30,
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      width: 30,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      width: 30,
    },

    {
      title: "Biến động quỹ",
      dataIndex: "fundAmount",
      width: 30,
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      width: 30,
      render: (value) => {
        return (
          <Chip
            className="capitalize"
            color={statusColorMapStatus[value]}
            size="sm"
            variant="flat"
          >
            {value}
          </Chip>
        );
      },
    },
    {
      title: "Người xác nhận",
      dataIndex: "userConfirm",
      width: 30,
    },
    {
      title: "Ngày xác nhận",
      dataIndex: "dateConfirm",
      width: 30,
    },
    {
      title: "Ngày hoàn thành",
      dataIndex: "dateDone",
      width: 30,
    },
    {
      title: "Người hoàn thành",
      dataIndex: "userDone",
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
                  onPress={() => {
                    router.push(`paymentSession/${value.id}`);
                  }}
                />
              </Tooltip>
              {/* <Tooltip content="Sửa">
                <Button
                  className="text-md text-default-400 cursor-pointer active:opacity-50"
                  variant="light"
                  isIconOnly
                  disableRipple
                  disableAnimation
                  onPress={() => handleOpenPaymentSessionModal(3, value.id)}
                  startContent={<EditIcon />}
                />
              </Tooltip> */}
              {/* <Tooltip color="danger" content="Xoá">
                <Button
                  className="text-md text-danger cursor-pointer active:opacity-50"
                  variant="light"
                  isIconOnly
                  disableRipple
                  disableAnimation
                  onPress={() => handleOpen(value.id)}
                  startContent={<DeleteIcon />}
                />
              </Tooltip> */}
            </div>
          );
      },
    },
  ];

  const router = useRouter();

  const handleOpenPaymentSessionModal = async (type: number) => {
    let data: void | PaymentSessionReply | undefined;

    if (data && data.payload) {
      setPaymentSession(data.payload);
    }
    setTypeModal(type);
    setOpenPaymentSession(true);
  };

  const handleClosePaymentSessionModal = () => {
    setId(0);
    setTypeModal(0);
    setOpenPaymentSession(false);
  };

  const { paymentSessionList, total, setPaymentSessionSearchParam } =
    useSearchPaymentSession();
  const [page, setPage] = useState(1);
  const [openPaymentSession, setOpenPaymentSession] = useState(false);
  const [typeModal, setTypeModal] = useState(0);
  const queryClient = useQueryClient();
  const [id, setId] = useState(0);
  const [paymentSession, setPaymentSession] = useState(PaymentSession.create());
  const [showFilter, setShowFilter] = useState<boolean>(false);

  return (
    <div>
      <div className="flex items-center	 max-w-lg py-4">
        <h1 className={title({ size: "sm" })}>Quản lý phiếu chi&nbsp;</h1>
        <Tooltip content="Tạo">
          <Button
            className="text-sm cursor-pointer active:opacity-50"
            variant="light"
            isIconOnly
            disableRipple
            disableAnimation
            startContent={<AddIcon />}
            onPress={() => handleOpenPaymentSessionModal(1)}
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
      <PaymentSessionFilterForm
        showFilter={showFilter}
        setPaymentSessionSearchParam={setPaymentSessionSearchParam}
      />
      <Table
        size="small"
        className="pt-4"
        columns={columns}
        dataSource={intoTable(paymentSessionList, page)}
        rowKey={(record) => record.action.id}
        pagination={{
          total: total,
          defaultPageSize: defaulLimit,
          current: page,
          onChange: (page) => {
            setPage(page);
            setPaymentSessionSearchParam({
              page: page,
              limit: defaulLimit,
              isExtraUserConfirm: true,
              isExtraUserDone: true,
              isDeleted: true,
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
        isOpen={openPaymentSession}
        onClose={handleClosePaymentSessionModal}
        size="2xl"
        isDismissable={false}
      >
        <ModalContent>
          <ModalHeader className="">
            {(() => {
              switch (typeModal) {
                case 1:
                  return <span>Tạo phiếu chi</span>;
                case 2:
                  return <span>Chi tiết phiếu chi</span>;
                case 3:
                  return <span>Chỉnh sửa phiếu chi</span>;
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
                      <PaymentSessionForm
                        onClose={handleClosePaymentSessionModal}
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
    </div>
  );
}
