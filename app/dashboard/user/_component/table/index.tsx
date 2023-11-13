"use client";
import React, { useState } from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
import { DataType, intoTable, statusColorMapRole } from "./type";
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
    title: "Hành động",
    dataIndex: "action",
    width: 120,
  },
  {
    title: "Đối tượng",
    dataIndex: "subject",
    width: 120,
  },
  {
    title: "Tên người dùng",
    dataIndex: "userName",
    width: 120,
  },
  {
    title: "Phân quyền người dùng",
    dataIndex: "userRole",
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
    title: "Session Id",
    dataIndex: "sessionId",
    width: 120,
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    width: 120,
  },
  {
    title: "Dữ liệu cũ",
    dataIndex: "oldData",
    width: 120,
    // render: (value) => {
    //   return <Snippet>{value}</Snippet>;
    // },
  },
  {
    title: "Dữ liệu mới",
    dataIndex: "newData",
    width: 120,
    // render: (value) => {
    //   return <Snippet>{value}</Snippet>;
    // },
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
