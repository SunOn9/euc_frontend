"use client";
import React, { useState } from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
import {
  DataType,
  intoTable,
  statusColorMapIsDeleted,
  statusColorMapRole,
} from "./type";
import { Button, Chip, Tooltip } from "@nextui-org/react";
import useSearchUser from "../hook/useSearchUser";
import { EyeIcon, EditIcon, DeleteIcon, AddIcon } from "@/components/icons";
import { subtitle, text, title } from "@/components/primitives";
import clsx from "clsx";

const columns: TableProps<DataType>["columns"] = [
  {
    title: "STT",
    dataIndex: "stt",
    width: 15,
    fixed: "left",
  },
  {
    title: "Họ và Tên",
    dataIndex: "name",
    width: 40,
  },
  {
    title: "Phân quyền",
    dataIndex: "role",
    width: 40,
    render: (value) => {
      return (
        <Chip
          className="capitalize"
          color={statusColorMapRole[value]}
          size="sm"
          variant="flat"
        >
          {value}
        </Chip>
      );
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    width: 50,
  },
  {
    title: "SĐT",
    dataIndex: "phone",
    width: 40,
  },
  {
    title: "Hoạt độnng",
    dataIndex: "isDeleted",
    width: 45,
    render: (value) => {
      return (
        <Chip
          className="capitalize"
          color={statusColorMapIsDeleted[value]}
          size="sm"
          variant="dot"
        >
          {value}
        </Chip>
      );
    },
  },
  {
    title: "CLB",
    dataIndex: "clubName",
    width: 50,
  },
  {
    title: "Hành động",
    dataIndex: "action",
    width: 35,
    fixed: "right",
    render: (value) => {
      return (
        <div className="relative flex items-center">
          <Tooltip content="Details">
            <Button
              className="text-md text-default-400 cursor-pointer active:opacity-50"
              variant="light"
              isIconOnly
              disableRipple
              disableAnimation
              startContent={<EyeIcon />}
              onPress={() => {
                console.log(value);
              }}
            />
          </Tooltip>
          <Tooltip content="Edit user">
            <Button
              className="text-md text-default-400 cursor-pointer active:opacity-50"
              variant="light"
              isIconOnly
              disableRipple
              disableAnimation
              startContent={<EditIcon />}
            />
          </Tooltip>
          <Tooltip color="danger" content="Delete user">
            <Button
              className="text-md text-danger cursor-pointer active:opacity-50"
              variant="light"
              isIconOnly
              disableRipple
              disableAnimation
              startContent={<DeleteIcon />}
            />
          </Tooltip>
        </div>
      );
    },
  },
];

export default function UserTable() {
  const { userList, total, setUserSearchParam } = useSearchUser();
  const [page, setPage] = useState(1);

  return (
    <div>
      <div className="flex max-w-lg py-4">
        <h1 className={title({ size: "md" })}>Quản lý người dùng&nbsp;</h1>
        <Tooltip content="Create">
          <Button
            className="text-md cursor-pointer active:opacity-50"
            variant="light"
            isIconOnly
            disableRipple
            disableAnimation
            startContent={<AddIcon />}
            onPress={() => {
              console.log(1);
            }}
          />
        </Tooltip>
      </div>
      <Table
        columns={columns}
        dataSource={intoTable(userList, page)}
        pagination={{
          total: total,
          defaultPageSize: 20,
          current: page,
          onChange: (page) => {
            setPage(page);
            setUserSearchParam({
              page: page,
              isExtraClub: true,
            });
          },
          showSizeChanger: false,
        }}
        bordered
        scroll={{
          x: 1300,
        }}
      />
    </div>
  );
}
