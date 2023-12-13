"use client";
import React, { useState } from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
import { ActionType, DataType, intoTable, statusColorMapStatus } from "./type";
import {
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Tooltip,
} from "@nextui-org/react";
import { AddIcon, EyeIcon } from "@/components/icons";
import { title } from "@/components/primitives";
import { Event_PaymentSession } from "@/generated/event/event";
import { href } from "@/config/env";
import PaymentSessionForm from "@/app/dashboard/paymentSession/_component/form-create-paymentSession";

type Props = {
  paymentSessionList: Event_PaymentSession[];
  eventId: number;
  handleReload: CallableFunction;
};

export default function PaymentSessionTable(props: Props) {
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
                    window.location.href = `${href}/paymentSession/${value.id}`;
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

  const paymentSessionList = props.paymentSessionList;

  const [page, setPage] = useState(1);
  const handleOpenPaymentSessionModal = () => {
    setOpenPaymentSession(true);
  };
  const handleClosePaymentSessionModal = () => {
    setOpenPaymentSession(false);
  };
  const [openPaymentSession, setOpenPaymentSession] = useState(false);

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
            onPress={handleOpenPaymentSessionModal}
          />
        </Tooltip>
        {/* <Tooltip content="Bộ lọc">
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
        </Tooltip> */}
      </div>

      <Table
        size="small"
        className="pt-4"
        columns={columns}
        dataSource={intoTable(paymentSessionList, page)}
        rowKey={(record) => record.action.id}
        pagination={false}
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
            <span>Tạo phiếu chi</span>
          </ModalHeader>
          <ModalBody>
            <>
              <PaymentSessionForm
                eventId={props.eventId}
                handleReload={props.handleReload}
                onClose={handleClosePaymentSessionModal}
              />
            </>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
