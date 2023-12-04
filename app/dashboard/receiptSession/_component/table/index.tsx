"use client";
import React, { useState } from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
import {
  ActionType,
  DataType,
  intoTable,
  statusColorMapStatus,
  statusColorMapGender,
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
import useSearchReceiptSession from "../../../../../components/hooks/useSearchReceiptSession";
import {
  EyeIcon,
  EditIcon,
  DeleteIcon,
  AddIcon,
  SearchIcon,
} from "@/components/icons";
import { title } from "@/components/primitives";
import { receiptSessionRemove } from "@/service/api/receiptSession/remove";
import { useQueryClient } from "@tanstack/react-query";
import { ToastType, customToast } from "@/components/hooks/useToast";
import ReceiptSessionForm from "../form-create-receiptSession";
import ReceiptSessionDetailForm from "../form-detail-receiptSession";
import { ReceiptSession } from "@/generated/receiptSession/receiptSession";
import { receiptSessionDetail } from "@/service/api/receiptSession/detail";
import { ReceiptSessionReply } from "@/generated/receiptSession/receiptSession.reply";
import ReceiptSessionFilterForm from "../form-filter-receiptSession";
import { useRouter } from "next/navigation";
import { defaulLimit } from "@/config/env";

export default function ReceiptSessionTable() {
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
                    router.push(`receiptSession/${value.id}`);
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

  const router = useRouter();

  const handleOpenReceiptSessionModal = async (type: number) => {
    let data: void | ReceiptSessionReply | undefined;

    if (data && data.payload) {
      setReceiptSession(data.payload);
    }
    setTypeModal(type);
    setOpenReceiptSession(true);
  };

  const handleCloseReceiptSessionModal = () => {
    setId(0);
    setTypeModal(0);
    setOpenReceiptSession(false);
  };

  const { receiptSessionList, total, setReceiptSessionSearchParam } =
    useSearchReceiptSession();
  const [page, setPage] = useState(1);
  const [openReceiptSession, setOpenReceiptSession] = useState(false);
  const [typeModal, setTypeModal] = useState(0);
  const queryClient = useQueryClient();
  const [id, setId] = useState(0);
  const [receiptSession, setReceiptSession] = useState(ReceiptSession.create());
  const [showFilter, setShowFilter] = useState<boolean>(false);

  return (
    <div>
      <div className="flex items-center	 max-w-lg py-4">
        <h1 className={title({ size: "sm" })}>Quản lý phiếu thu&nbsp;</h1>
        <Tooltip content="Tạo">
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
        </Tooltip>
      </div>
      <ReceiptSessionFilterForm
        showFilter={showFilter}
        setReceiptSessionSearchParam={setReceiptSessionSearchParam}
      />
      <Table
        size="small"
        className="pt-4"
        columns={columns}
        dataSource={intoTable(receiptSessionList, page)}
        rowKey={(record) => record.action.id}
        pagination={{
          total: total,
          defaultPageSize: defaulLimit,
          current: page,
          onChange: (page) => {
            setPage(page);
            setReceiptSessionSearchParam({
              page: page,
              limit: defaulLimit,
              isExtraUserConfirm: true,
              isExtraUserDone: true,
              isDeleted: true,
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
        isOpen={openReceiptSession}
        onClose={handleCloseReceiptSessionModal}
        size="2xl"
        isDismissable={false}
      >
        <ModalContent>
          <ModalHeader className="">
            {(() => {
              switch (typeModal) {
                case 1:
                  return <span>Tạo phiếu thu</span>;
                case 2:
                  return <span>Chi tiết phiếu thu</span>;
                case 3:
                  return <span>Chỉnh sửa phiếu thu</span>;
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
                      <ReceiptSessionForm
                        onClose={handleCloseReceiptSessionModal}
                      />
                    </>
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
