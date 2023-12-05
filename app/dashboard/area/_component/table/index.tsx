"use client";
import React, { useState } from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
import { ActionType, DataType, intoTable } from "./type";
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
import useSearchArea from "../../../../../components/hooks/useSearchArea";
import { EditIcon, DeleteIcon, AddIcon, SearchIcon } from "@/components/icons";
import { title } from "@/components/primitives";
import { areaRemove } from "@/service/api/area/remove";
import { useQueryClient } from "@tanstack/react-query";
import { ToastType, customToast } from "@/components/hooks/useToast";
import AreaForm from "../form-create-area";
import AreaDetailForm from "../form-detail-area";
import { Area } from "@/generated/area/area";
import { areaDetail } from "@/service/api/area/detail";
import { AreaReply } from "@/generated/area/area.reply";
// import AreaFilterForm from "../form-filter-area";
import { defaulLimit } from "@/config/env";

export default function AreaTable() {
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "STT",
      dataIndex: "stt",
    },
    {
      title: "Tên",
      dataIndex: "name",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      render: (value: ActionType) => {
        if (value.isDeleted) {
          return null;
        } else
          return (
            <div className="relative flex items-center">
              {/* <Tooltip content="Chi tiết">
                <Button
                  className="text-md text-default-400 cursor-pointer active:opacity-50"
                  variant="light"
                  isIconOnly
                  disableRipple
                  disableAnimation
                  startContent={<EyeIcon />}
                  onPress={() => handleOpenAreaModal(2, value.id)}
                />
              </Tooltip> */}
              <Tooltip content="Sửa">
                <Button
                  className="text-md text-default-400 cursor-pointer active:opacity-50"
                  variant="light"
                  isIconOnly
                  disableRipple
                  disableAnimation
                  onPress={() => handleOpenAreaModal(3, value.id)}
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

  const handleOpenAreaModal = async (type: number, id?: number) => {
    let data: void | AreaReply | undefined;
    if (id) {
      data = await areaDetail({
        id: id,
        isExtraClub: true,
      })
        .then((res) => {
          if (res.statusCode !== 200) {
            customToast(`Có lôi xảy ra`, ToastType.ERROR);
            return;
          } else {
            if (res.payload) {
              setArea(res.payload);
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
      setArea(data.payload);
    }
    setTypeModal(type);
    setOpenArea(true);
  };

  const handleCloseAreaModal = () => {
    setId(0);
    setTypeModal(0);
    setOpenArea(false);
  };

  const onRemove = () => {
    areaRemove({ id: id })
      .then((res) => {
        if (res.statusCode !== 200) {
          customToast("Xóa khu vực thất bại", ToastType.ERROR);
          handleClose();
          return;
        }
        customToast(`Xóa khu vực Id: ${id} thành công`, ToastType.SUCCESS);
        queryClient.invalidateQueries(["areaSearch"]);
        handleClose();
      })
      .catch((err) => {
        customToast(`${err.response?.data?.message}`, ToastType.ERROR);
        handleClose();
        return;
      });
  };

  const { areaList, total, setAreaSearchParam } = useSearchArea();
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [openArea, setOpenArea] = useState(false);
  const [typeModal, setTypeModal] = useState(0);
  const queryClient = useQueryClient();
  const [id, setId] = useState(0);
  const [area, setArea] = useState(Area.create());
  const [showFilter, setShowFilter] = useState<boolean>(false);

  return (
    <div>
      <div className="flex items-center	 max-w-lg py-4">
        <h1 className={title({ size: "sm" })}>Quản lý khu vực&nbsp;</h1>
        <Tooltip content="Tạo">
          <Button
            className="text-sm cursor-pointer active:opacity-50"
            variant="light"
            isIconOnly
            disableRipple
            disableAnimation
            startContent={<AddIcon />}
            onPress={() => handleOpenAreaModal(1)}
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
      {/* <AreaFilterForm
        showFilter={showFilter}
        setAreaSearchParam={setAreaSearchParam}
      /> */}
      <Table
        size="small"
        className="pt-4"
        columns={columns}
        dataSource={intoTable(areaList, page)}
        rowKey={(record) => record.action.id}
        pagination={{
          total: total,
          defaultPageSize: defaulLimit,
          current: page,
          onChange: (page) => {
            setPage(page);
            setAreaSearchParam({
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
        isOpen={openArea}
        onClose={handleCloseAreaModal}
        size="2xl"
        isDismissable={false}
      >
        <ModalContent>
          <ModalHeader className="">
            {(() => {
              switch (typeModal) {
                case 1:
                  return <span>Tạo khu vực</span>;
                // case 2:
                //   return <span>Chi tiết khu vực</span>;
                case 3:
                  return <span>Chỉnh sửa khu vực</span>;
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
                      <AreaForm onClose={handleCloseAreaModal} />
                    </>
                  );
                // case 2:
                //   return (
                //     <AreaDetailForm
                //       onClose={handleCloseAreaModal}
                //       area={area}
                //       isDetail={true}
                //     />
                //   );
                case 3:
                  return (
                    <AreaDetailForm
                      onClose={handleCloseAreaModal}
                      area={area}
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
