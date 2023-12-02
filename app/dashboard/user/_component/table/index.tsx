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
import useSearchUser from "../../../../../components/hooks/useSearchUser";
import { EyeIcon, EditIcon, DeleteIcon, AddIcon } from "@/components/icons";
import { title } from "@/components/primitives";
import { userRemove } from "@/service/api/user/remove";
import { useQueryClient } from "@tanstack/react-query";
import { ToastType, customToast } from "@/components/hooks/useToast";
import UserForm from "../form-create-user/create-user-form";

export default function UserTable() {
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "STT",
      dataIndex: "stt",
      width: 10,
    },
    {
      title: "Họ và Tên",
      dataIndex: "name",
      width: 30,
    },
    {
      title: "Phân quyền",
      dataIndex: "role",
      width: 20,
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
      width: 30,
    },
    {
      title: "SĐT",
      dataIndex: "phone",
      width: 20,
    },
    {
      title: "Trạng thái",
      dataIndex: "isDeleted",
      width: 20,
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
      width: 30,
    },
    {
      title: "Hành động",
      dataIndex: "action",
      width: 20,
      fixed: "right",
      render: (value) => {
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
                onPress={() => handleOpenUserModal(2)}
              />
            </Tooltip>
            <Tooltip content="Sửa">
              <Button
                className="text-md text-default-400 cursor-pointer active:opacity-50"
                variant="light"
                isIconOnly
                disableRipple
                disableAnimation
                onPress={() => handleOpenUserModal(3)}
                startContent={<EditIcon />}
              />
            </Tooltip>
            <Tooltip color="danger" content="Xoá">
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

  const handleOpenUserModal = (type: number) => {
    setOpenUser(true);
    setTypeModal(type);
  };

  const handleCloseUserModal = () => {
    setOpenUser(false);
    setTypeModal(0);
  };

  const onRemove = () => {
    userRemove({ id: id })
      .then((res) => {
        if (res.statusCode !== 200) {
          customToast("Xóa người dùng thất bại", ToastType.ERROR);
          handleClose();
          return;
        }
        customToast(`Xóa người dùng Id: ${id} thành công`, ToastType.SUCCESS);
        queryClient.invalidateQueries(["userSearch"]);
        handleClose();
      })
      .catch(() => {
        customToast("Có lỗi xảy ra", ToastType.ERROR);
        handleClose();
        return;
      });
  };

  const { userList, total, setUserSearchParam } = useSearchUser();
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [typeModal, setTypeModal] = useState(0);
  const queryClient = useQueryClient();
  const [id, setId] = useState(0);

  return (
    <div>
      <div className="flex items-center	 max-w-lg py-4">
        <h1 className={title({ size: "sm" })}>Quản lý người dùng&nbsp;</h1>
        <Tooltip content="Tạo">
          <Button
            className="text-sm cursor-pointer active:opacity-50"
            variant="light"
            isIconOnly
            disableRipple
            disableAnimation
            startContent={<AddIcon />}
            onPress={() => handleOpenUserModal(1)}
          />
        </Tooltip>
      </div>
      <Table
        size="small"
        columns={columns}
        dataSource={intoTable(userList, page)}
        rowKey={(record) => record.action}
        pagination={{
          total: total,
          defaultPageSize: 5,
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
            <ModalHeader className="flex flex-col">Xoá</ModalHeader>
            <ModalBody>Xác nhận xoá dữ liệu này?</ModalBody>
            <ModalFooter>
              <Button
                className="bold"
                color="danger"
                variant="flat"
                onPress={handleClose}
              >
                Huỷ
              </Button>
              <Button className="bold" color="primary" onPress={onRemove}>
                Xoá
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
      <Modal isOpen={openUser} onClose={handleCloseUserModal} size="2xl">
        <ModalContent>
          <ModalHeader className="">
            {(() => {
              switch (typeModal) {
                case 1:
                  return <span>Tạo người dùng</span>;
                case 2:
                  return <span>Chi tiết người dùng</span>;
                case 3:
                  return <span>Chỉnh sửa người dùng</span>;
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
                      <UserForm onClose={handleCloseUserModal} />
                    </>
                  );
                case 2:
                  return <span>Chi tiết người dùng</span>;
                case 3:
                  return <span>Chỉnh sửa người dùng</span>;
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
