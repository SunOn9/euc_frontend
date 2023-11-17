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
import { Chip } from "@nextui-org/react";
import useSearchUser from "../hook/useSearchUser";

const columns: TableProps<DataType>["columns"] = [
  {
    title: "STT",
    dataIndex: "stt",
    width: 100,
    render: (value) => {
      return value;
    },
  },
  {
    title: "Họ và Tên",
    dataIndex: "name",
    width: 120,
  },
  {
    title: "Phân quyền",
    dataIndex: "role",
    width: 120,
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
    width: 120,
  },
  {
    title: "SĐT",
    dataIndex: "phone",
    width: 120,
  },
  {
    title: "Hoạt độnng",
    dataIndex: "isDeleted",
    width: 120,
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
    width: 120,
  },
];

export default function LogTable() {
  const { userList, total, setUserSearchParam } = useSearchUser();
  const [page, setPage] = useState(1);

  return (
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
  );
}
