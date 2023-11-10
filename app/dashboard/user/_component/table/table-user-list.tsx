"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Pagination,
} from "@nextui-org/react";
import useSearchUser from "../hook/useSearchUser";
import {
  DataType,
  columns,
  intoTable,
  statusColorMapIsDeleted,
  statusColorMapRole,
} from "./type";
import ActionsComponent from "@/components/actions";

export default function UserTable() {
  const [page, setPage] = React.useState(1);

  const { userList, totalPage, setUserSearchParam } = useSearchUser();

  const renderCell = React.useCallback(
    (user: DataType, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof DataType];

      switch (columnKey) {
        case "stt":
          return (page - 1) * 20 + Number(cellValue);
        case "role":
          return (
            <Chip
              className="capitalize"
              color={statusColorMapRole[user.role]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "isDeleted":
          return (
            <Chip
              className="capitalize border-none gap-1 text-default-600"
              color={statusColorMapIsDeleted[user.isDeleted]}
              size="sm"
              variant="dot"
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
      aria-label="User Table"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={totalPage / 20}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody items={intoTable(userList)}>
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
