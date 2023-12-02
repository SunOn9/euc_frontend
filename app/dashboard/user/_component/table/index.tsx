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
import useSearchUser from "../hook/useSearchUser";
import { EyeIcon, EditIcon, DeleteIcon, AddIcon } from "@/components/icons";
import { title } from "@/components/primitives";
import { userRemove } from "@/service/api/user/remove";
import { useQueryClient } from "@tanstack/react-query";
import { ToastType, customToast } from "@/components/hooks/useToast";
import { userDetail } from "@/service/api/user/detail";

export default function UserTable() {
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
                onPress={() => handleOpen(value)}
                startContent={<DeleteIcon />}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const handleOpen = (props: number) => {
    setOpen(true);
    setId(props);
  };

  const handleClose = () => {
    setOpen(false);
    setId(0);
  };

  const onRemove = () => {
    userDetail({ id: id })
      .then((res) => {
        if (res.statusCode !== 200) {
          customToast("Xóa lô thất bại", ToastType.ERROR);
          return;
        }
        customToast(`Xóa lô Id: ${id} thành công`, ToastType.SUCCESS);
        queryClient.invalidateQueries(["userSearch"]);
      })
      .catch(() => {
        customToast("Có lỗi xảy ra", ToastType.ERROR);
        return;
      });
  };

  const { userList, total, setUserSearchParam } = useSearchUser();
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const [id, setId] = useState(0);

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
        rowKey={(record) => record.action}
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
      <Modal
        size="xs"
        isOpen={open}
        onClose={handleClose}
        placement="top-center"
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col">Delete</ModalHeader>
            <ModalBody>This action will delete your data</ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={handleClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={onRemove}>
                Accept
              </Button>
            </ModalFooter>
          </>
          )
        </ModalContent>
      </Modal>
    </div>
  );
}
