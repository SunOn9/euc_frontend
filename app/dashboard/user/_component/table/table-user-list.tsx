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
  Tooltip,
  ChipProps,
} from "@nextui-org/react";
import { DeleteIcon, EditIcon, EyeIcon } from "@/components/icons";
import useSearchUser from "../hook/useSearchUser";
import { DataType, intoUserTable } from "./type";

const columns = [
  { name: "Tên", uid: "name" },
  { name: "Vai trò", uid: "role" },
  { name: "Email", uid: "email" },
  { name: "SĐT", uid: "phone" },
  { name: "Câu lạc bộ", uid: "clubName" },
  { name: "Hành động", uid: "actions" },
];

const statusColorMap: Record<string, ChipProps["color"]> = {
  ADMIN: "primary",
  LEADER: "secondary",
  CORE_MEMBER: "warning",
  TREASURER: "warning",
  STAFF: "danger",
  UNRECOGNIZED: "default",
};

export default function UserTable() {
  const { userList, totalPage, setUserSearchParam } = useSearchUser();

  console.log(userList);
  console.log(intoUserTable(userList));

  const renderCell = React.useCallback(
    (user: DataType, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof DataType];

      switch (columnKey) {
        case "role":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[user.role]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Details">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Edit user">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <Table aria-label="User Table">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align="center">
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={intoUserTable(userList)}>
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
