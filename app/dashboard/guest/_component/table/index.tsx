"use client";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
import { ActionType, DataType, intoTable, statusColorMapGender } from "./type";
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
import useSearchGuest from "../../../../../components/hooks/useSearchGuest";
import {
  EyeIcon,
  EditIcon,
  DeleteIcon,
  AddIcon,
  SearchIcon,
} from "@/components/icons";
import { title } from "@/components/primitives";
import { guestRemove } from "@/service/api/guest/remove";
import { useQueryClient } from "@tanstack/react-query";
import { ToastType, customToast } from "@/components/hooks/useToast";
import GuestForm from "../form-create-guest";
import GuestDetailForm from "../form-detail-guest";
import { Guest } from "@/generated/guest/guest";
import { guestDetail } from "@/service/api/guest/detail";
import { GuestReply } from "@/generated/guest/guest.reply";
import GuestFilterForm from "../form-filter-guest";
import { defaulLimit } from "@/config/env";
import { User } from "@/generated/user/user";

export default function GuestTable() {
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
      title: "Biệt danh",
      dataIndex: "nickName",
      width: 30,
    },
    {
      title: "Sinh viên",
      dataIndex: "type",
      width: 20,
      render: (value) => {
        return value === true ? "✔️" : "❌";
      },
    },
    {
      title: "CLB",
      dataIndex: "clubName",
      width: 20,
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      width: 20,
      render: (value) => {
        return (
          <Chip
            className="capitalize"
            color={statusColorMapGender[value]}
            size="sm"
            variant="dot"
          >
            {value}
          </Chip>
        );
      },
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
                  onPress={() => handleOpenGuestModal(2, value.id)}
                />
              </Tooltip>
              <Tooltip content="Sửa">
                <Button
                  className="text-md text-default-400 cursor-pointer active:opacity-50"
                  variant="light"
                  isIconOnly
                  disableRipple
                  disableAnimation
                  onPress={() => handleOpenGuestModal(3, value.id)}
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
                  onPress={() => handleOpen(value.id)}
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

  const handleOpenGuestModal = async (type: number, id?: number) => {
    let data: void | GuestReply | undefined;
    if (id) {
      data = await guestDetail({
        id: id,
        isExtraClub: true,
      })
        .then((res) => {
          if (res.statusCode !== 200) {
            customToast(`Có lỗi xảy ra`, ToastType.ERROR);
            return;
          } else {
            if (res.payload) {
              setGuest(res.payload);
            }
            return res;
          }
        })
        .catch((err) => {
          customToast(`${err.response?.data?.message}`, ToastType.ERROR);
          return;
        });
    }
    if (data && data.payload) {
      setGuest(data.payload);
    }
    setTypeModal(type);
    setOpenGuest(true);
  };

  const handleCloseGuestModal = () => {
    setId(0);
    setTypeModal(0);
    setOpenGuest(false);
  };

  const onRemove = () => {
    guestRemove({ id: id })
      .then((res) => {
        if (res.statusCode !== 200) {
          customToast("Xóa khách thất bại", ToastType.ERROR);
          handleClose();
          return;
        }
        customToast(`Xóa khách Id: ${id} thành công`, ToastType.SUCCESS);
        queryClient.invalidateQueries(["guestSearch"]);
        handleClose();
      })
      .catch((err) => {
        customToast(`${err.response?.data?.message}`, ToastType.ERROR);
        handleClose();
        return;
      });
  };

  const [userInfo, setUserInfo] = useState(User.create());

  useEffect(() => {
    const item: User = JSON.parse(localStorage.getItem("user-info") ?? "");
    if (item) {
      setUserInfo(item);
    }
  }, []);

  const { guestList, total, setGuestSearchParam } = useSearchGuest();
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [openGuest, setOpenGuest] = useState(false);
  const [typeModal, setTypeModal] = useState(0);
  const queryClient = useQueryClient();
  const [id, setId] = useState(0);
  const [guest, setGuest] = useState(Guest.create());
  const [showFilter, setShowFilter] = useState<boolean>(false);

  return (
    <div>
      <div className="flex items-center	 max-w-lg py-4">
        <h1 className={title({ size: "sm" })}>Quản lý khách&nbsp;</h1>
        <Tooltip content="Tạo">
          <Button
            className="text-sm cursor-pointer active:opacity-50"
            variant="light"
            isIconOnly
            disableRipple
            disableAnimation
            startContent={<AddIcon />}
            onPress={() => handleOpenGuestModal(1)}
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
        </Tooltip>
      </div>
      <GuestFilterForm
        showFilter={showFilter}
        setGuestSearchParam={setGuestSearchParam}
      />
      <Table
        size="small"
        className="pt-4"
        columns={columns}
        dataSource={intoTable(guestList, page)}
        rowKey={(record) => record.action.id}
        pagination={{
          total: total,
          defaultPageSize: defaulLimit,
          current: page,
          onChange: (page) => {
            setPage(page);
            setGuestSearchParam({
              page: page,
              limit: defaulLimit,
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
        isDismissable={false}
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
      <Modal
        isOpen={openGuest}
        onClose={handleCloseGuestModal}
        size="2xl"
        isDismissable={false}
      >
        <ModalContent>
          <ModalHeader className="">
            {(() => {
              switch (typeModal) {
                case 1:
                  return <span>Tạo khách</span>;
                case 2:
                  return <span>Chi tiết khách</span>;
                case 3:
                  return <span>Chỉnh sửa khách</span>;
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
                      <GuestForm
                        userInfo={userInfo}
                        onClose={handleCloseGuestModal}
                      />
                    </>
                  );
                case 2:
                  return (
                    <GuestDetailForm
                      onClose={handleCloseGuestModal}
                      guest={guest}
                      isDetail={true}
                    />
                  );
                case 3:
                  return (
                    <GuestDetailForm
                      onClose={handleCloseGuestModal}
                      guest={guest}
                      isDetail={false}
                    />
                  );
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
