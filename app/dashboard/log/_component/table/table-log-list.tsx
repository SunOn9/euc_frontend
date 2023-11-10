"use client";
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@nextui-org/react";
import useSearchLog from "../hook/useSearchLog";
import { DataType, columns, intoTable, statusColorMapRole } from "./type";
import ActionsComponent from "@/components/actions";
import { Pagination } from "antd";

export default function LogTable() {
  const { logList, total, setLogSearchParam } = useSearchLog();
  const [page, setPage] = useState(1);

  console.log(page);
  // const pages = Math.ceil(total / 20);

  const renderCell = React.useCallback(
    (log: DataType, columnKey: React.Key) => {
      const cellValue = log[columnKey as keyof DataType];
      switch (columnKey) {
        case "stt":
          return (page - 1) * 20 + Number(cellValue);
        case "role":
          return (
            <Chip
              className="capitalize"
              color={statusColorMapRole[log.userRole]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return <ActionsComponent />;
        default:
          return cellValue;
      }
    },
    [page]
  );

  return (
    <Table
      aria-label="Log Table"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            showSizeChanger={false}
            defaultCurrent={page}
            total={total}
            pageSize={20}
            onChange={(page) => {
              setPage(page);
              setLogSearchParam({
                isExtraUser: true,
                page: page,
              });
            }}
          />
        </div>
      }
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody items={intoTable(logList)}>
        {(item) => (
          <TableRow key={item.stt} className="py-5">
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
