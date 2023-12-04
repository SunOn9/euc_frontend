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
import useSearchPaymentSession from "../../../../../components/hooks/useSearchPaymentSession";
import {
  EyeIcon,
  EditIcon,
  DeleteIcon,
  AddIcon,
  SearchIcon,
} from "@/components/icons";
import { title } from "@/components/primitives";
import { paymentSessionRemove } from "@/service/api/paymentSession/remove";
import { useQueryClient } from "@tanstack/react-query";
import { ToastType, customToast } from "@/components/hooks/useToast";
import PaymentSessionForm from "../form-create-paymentSession";
import PaymentSessionDetailForm from "../form-detail-paymentSession";
import { PaymentSession } from "@/generated/paymentSession/paymentSession";
import { paymentSessionDetail } from "@/service/api/paymentSession/detail";
import { PaymentSessionReply } from "@/generated/paymentSession/paymentSession.reply";
import PaymentSessionFilterForm from "../form-filter-paymentSession";

export default function PaymentSessionTable() {
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "STT",
      dataIndex: "stt",
      width: 10,
    },
    {
      title: "Họ và Tên",
      dataIndex: "title",
      width: 30,
    },
    {
      title: "Biệt danh",
      dataIndex: "description",
      width: 30,
    },
    {
      title: "Sinh nhật",
      dataIndex: "amount",
      width: 30,
    },
    {
      title: "Họ và Tên",
      dataIndex: "createdAt",
      width: 30,
    },

    {
      title: "Sinh nhật",
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
      title: "Họ và Tên",
      dataIndex: "dateConfirm",
      width: 30,
    },
    {
      title: "Họ và Tên",
      dataIndex: "dateDone",
      width: 30,
    },
    {
      title: "Họ và Tên",
      dataIndex: "clubName",
      width: 30,
    },
    {
      title: "Họ và Tên",
      dataIndex: "paymentTotal",
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
                  onPress={() => handleOpenPaymentSessionModal(2, value.id)}
                />
              </Tooltip>
              <Tooltip content="Sửa">
                <Button
                  className="text-md text-default-400 cursor-pointer active:opacity-50"
                  variant="light"
                  isIconOnly
                  disableRipple
                  disableAnimation
                  onPress={() => handleOpenPaymentSessionModal(3, value.id)}
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

  const handleOpenPaymentSessionModal = async (type: number, id?: number) => {
    let data: void | PaymentSessionReply | undefined;
    if (id) {
      data = await paymentSessionDetail({
        id: id,
        isExtraClub: true,
      })
        .then((res) => {
          if (res.statusCode !== 200) {
            customToast("Có lỗi xảy ra", ToastType.ERROR);
            return;
          } else {
            if (res.payload) {
              setPaymentSession(res.payload);
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
      setPaymentSession(data.payload);
    }
    setTypeModal(type);
    setOpenPaymentSession(true);
  };

  const handleClosePaymentSessionModal = () => {
    setId(0);
    setTypeModal(0);
    setOpenPaymentSession(false);
  };

  const onRemove = () => {
    paymentSessionRemove({ id: id })
      .then((res) => {
        if (res.statusCode !== 200) {
          customToast("Xóa thành viên thất bại", ToastType.ERROR);
          handleClose();
          return;
        }
        customToast(`Xóa thành viên Id: ${id} thành công`, ToastType.SUCCESS);
        queryClient.invalidateQueries(["paymentSessionSearch"]);
        handleClose();
      })
      .catch(() => {
        customToast("Có lỗi xảy ra", ToastType.ERROR);
        handleClose();
        return;
      });
  };

  const { paymentSessionList, total, setPaymentSessionSearchParam } =
    useSearchPaymentSession();
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [openPaymentSession, setOpenPaymentSession] = useState(false);
  const [typeModal, setTypeModal] = useState(0);
  const queryClient = useQueryClient();
  const [id, setId] = useState(0);
  const [paymentSession, setPaymentSession] = useState(PaymentSession.create());
  const [showFilter, setShowFilter] = useState<boolean>(false);

  return (
    <div>
      <div className="flex items-center	 max-w-lg py-4">
        <h1 className={title({ size: "sm" })}>Quản lý thành viên&nbsp;</h1>
        <Tooltip content="Tạo">
          <Button
            className="text-sm cursor-pointer active:opacity-50"
            variant="light"
            isIconOnly
            disableRipple
            disableAnimation
            startContent={<AddIcon />}
            onPress={() => handleOpenPaymentSessionModal(1)}
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
      <PaymentSessionFilterForm
        showFilter={showFilter}
        setPaymentSessionSearchParam={setPaymentSessionSearchParam}
      />
      <Table
        size="small"
        className="pt-4"
        columns={columns}
        dataSource={intoTable(paymentSessionList, page)}
        rowKey={(record) => record.action.id}
        pagination={{
          total: total,
          defaultPageSize: 5,
          current: page,
          onChange: (page) => {
            setPage(page);
            setPaymentSessionSearchParam({
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
        isOpen={openPaymentSession}
        onClose={handleClosePaymentSessionModal}
        size="2xl"
        isDismissable={false}
      >
        <ModalContent>
          <ModalHeader className="">
            {(() => {
              switch (typeModal) {
                case 1:
                  return <span>Tạo thành viên</span>;
                case 2:
                  return <span>Chi tiết thành viên</span>;
                case 3:
                  return <span>Chỉnh sửa thành viên</span>;
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
                      <PaymentSessionForm
                        onClose={handleClosePaymentSessionModal}
                      />
                    </>
                  );
                case 2:
                  return (
                    <PaymentSessionDetailForm
                      onClose={handleClosePaymentSessionModal}
                      paymentSession={paymentSession}
                      isDetail={true}
                    />
                  );
                case 3:
                  return (
                    <PaymentSessionDetailForm
                      onClose={handleClosePaymentSessionModal}
                      paymentSession={paymentSession}
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
