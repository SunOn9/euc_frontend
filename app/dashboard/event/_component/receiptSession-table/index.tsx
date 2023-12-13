"use client";
import React, { useState } from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
import { ActionType, DataType, intoTable, statusColorMapStatus } from "./type";
import { Button, Chip, Tooltip } from "@nextui-org/react";
import { EyeIcon } from "@/components/icons";
import { title } from "@/components/primitives";
import { Event_ReceiptSession } from "@/generated/event/event";
import { href } from "@/config/env";

type Props = {
  receiptSessionList: Event_ReceiptSession[];
  eventId: number;
  // hanleChange: CallableFunction
};
export default function ReceiptSessionTable(props: Props) {
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
                    window.location.href = `${href}/receiptSession/${value.id}`;
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
                  onPress={() => handleOpenReceiptSessionModal(3, value.id)}
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

  const receiptSessionList = props.receiptSessionList;

  const [page, setPage] = useState(1);

  return (
    <div>
      <div className="flex items-center	 max-w-lg py-4">
        <h1 className={title({ size: "sm" })}>Quản lý phiếu thu&nbsp;</h1>
        {/* <Tooltip content="Tạo">
          <Button
            className="text-sm cursor-pointer active:opacity-50"
            variant="light"
            isIconOnly
            disableRipple
            disableAnimation
            startContent={<AddIcon />}
            onPress={() => handleOpenReceiptSessionModal(1)}
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
        </Tooltip> */}
      </div>

      <Table
        size="small"
        className="pt-4"
        columns={columns}
        dataSource={intoTable(receiptSessionList, page)}
        rowKey={(record) => record.action.id}
        pagination={false}
        bordered
        scroll={{
          x: 1300,
        }}
      />
    </div>
  );
}
