"use client";
import React, { useEffect, useState } from "react";
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
import useSearchClub from "../../../../../components/hooks/useSearchClub";
import {
  EyeIcon,
  EditIcon,
  DeleteIcon,
  AddIcon,
  SearchIcon,
  SettingIcon,
} from "@/components/icons";
import { title } from "@/components/primitives";
import { clubRemove } from "@/service/api/club/remove";
import { useQueryClient } from "@tanstack/react-query";
import { ToastType, customToast } from "@/components/hooks/useToast";
import ClubForm from "../form-create-club";
import ClubDetailForm from "../form-detail-club";
import { Club } from "@/generated/club/club";
import { clubDetail } from "@/service/api/club/detail";
import { ClubReply } from "@/generated/club/club.reply";
import { defaulLimit } from "@/config/env";
import { Club_ClubFee } from "@/generated/club/club";
import ClubFeeForm from "../form-create-clubFee";
import { User } from "@/generated/user/user";
import { EnumProto_UserRole } from "@/generated/enumps";
import FundForm from "../form-fund";

export default function ClubTable() {
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "STT",
      dataIndex: "stt",
      width: 10,
    },
    {
      title: "Tên",
      dataIndex: "name",
      width: 30,
    },
    {
      title: "Viết tắt",
      dataIndex: "abbreviation",
      width: 30,
    },
    {
      title: "Tổng thành viên",
      dataIndex: "totalMember",
      width: 20,
    },
    {
      title: "Tổng khách",
      dataIndex: "totalGuest",
      width: 20,
    },
    {
      title: "Phí CLB",
      dataIndex: "fee",
      width: 20,
      render: (value: Club_ClubFee) => {
        return value ? (
          <div>
            {value.studentFee !== 0 ? (
              <div>Sinh viên: {value.studentFee}</div>
            ) : null}
            {value.workerFee !== 0 ? (
              <div>Người đi làm: {value.workerFee}</div>
            ) : null}
            {value.monthlyFee !== 0 ? (
              <div>Phí tháng: {value.monthlyFee}</div>
            ) : null}
          </div>
        ) : null;
      },
    },
    {
      title: "Khu vực",
      dataIndex: "area",
      width: 20,
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
                  onPress={() => handleOpenClubModal(2, value.id)}
                />
              </Tooltip>
              <Tooltip content="Sửa">
                <Button
                  className="text-md text-default-400 cursor-pointer active:opacity-50"
                  variant="light"
                  isIconOnly
                  disableRipple
                  disableAnimation
                  onPress={() => handleOpenClubModal(3, value.id)}
                  startContent={<EditIcon />}
                />
              </Tooltip>

              <Tooltip content="Cấu hình phí">
                <Button
                  className="text-md text-default-400 cursor-pointer active:opacity-50"
                  variant="light"
                  isIconOnly
                  disableRipple
                  disableAnimation
                  onPress={() => handleOpenClubModal(4, value.id)}
                  startContent={<SettingIcon />}
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

  const handleOpenFund = () => {
    setOpenFund(true);
  };

  const handleCloseFund = () => {
    setOpenFund(false);
  };

  const handleOpenClubModal = async (type: number, id?: number) => {
    let data: void | ClubReply | undefined;
    if (id) {
      data = await clubDetail({
        id: id,
        isExtraArea: true,
        isExtraClubFee: true,
      })
        .then((res) => {
          if (res.statusCode !== 200) {
            customToast(`Có lỗi xảy ra`, ToastType.ERROR);
            return;
          } else {
            if (res.payload) {
              setClub(res.payload);
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
      setClub(data.payload);
    }
    setTypeModal(type);
    setOpenClub(true);
  };

  const handleCloseClubModal = () => {
    setId(0);
    setTypeModal(0);
    setOpenClub(false);
  };

  const onRemove = () => {
    clubRemove({ id: id })
      .then((res) => {
        if (res.statusCode !== 200) {
          customToast("Xóa câu lạc bộ thất bại", ToastType.ERROR);
          handleClose();
          return;
        }
        customToast(`Xóa câu lạc bộ Id: ${id} thành công`, ToastType.SUCCESS);
        queryClient.invalidateQueries(["clubSearch"]);
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

  useEffect(() => {
    if (
      userInfo.role !== EnumProto_UserRole.ADMIN &&
      userInfo.role !== EnumProto_UserRole.STAFF
    )
      setClubSearchParam({
        id: userInfo.club?.id,
        page: 1,
        isExtraArea: true,
        isExtraClubFee: true,
      });
  }, [userInfo]);

  const { clubList, total, setClubSearchParam } = useSearchClub();
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [openClub, setOpenClub] = useState(false);
  const [typeModal, setTypeModal] = useState(0);
  const queryClient = useQueryClient();
  const [id, setId] = useState(0);
  const [club, setClub] = useState(Club.create());
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [openFund, setOpenFund] = useState(false);

  return (
    <div>
      <div className="flex items-center	 max-w-lg py-4">
        <h1 className={title({ size: "sm" })}>Quản lý câu lạc bộ&nbsp;</h1>
        <Tooltip content="Tạo">
          <Button
            className="text-sm cursor-pointer active:opacity-50"
            variant="light"
            isIconOnly
            disableRipple
            disableAnimation
            startContent={<AddIcon />}
            onPress={() => handleOpenClubModal(1)}
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
        {userInfo.role === EnumProto_UserRole.TREASURER ? (
          <Button
            className="text-md cursor-pointer active:opacity-50"
            size="sm"
            disableRipple
            disableAnimation
            onPress={handleOpenFund}
          >
            Xuất file
          </Button>
        ) : null}
      </div>
      {/* <ClubFilterForm
        showFilter={showFilter}
        setClubSearchParam={setClubSearchParam}
      /> */}
      <Table
        size="small"
        className="pt-4"
        columns={columns}
        dataSource={intoTable(clubList, page)}
        rowKey={(record) => record.action.id}
        pagination={{
          total: total,
          defaultPageSize: defaulLimit,
          current: page,
          onChange: (page) => {
            setPage(page);
            setClubSearchParam({
              page: page,
              limit: defaulLimit,
              isExtraArea: true,
              isExtraClubFee: true,
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
        size="2xl"
        isOpen={openFund}
        onClose={handleCloseFund}
        placement="top-center"
        isDismissable={false}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col">
              Xuất dữ liệu quỹ
            </ModalHeader>
            <ModalBody>
              <FundForm onClose={handleCloseFund} />
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
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
        isOpen={openClub}
        onClose={handleCloseClubModal}
        size="2xl"
        isDismissable={false}
      >
        <ModalContent>
          <ModalHeader className="">
            {(() => {
              switch (typeModal) {
                case 1:
                  return <span>Tạo câu lạc bộ</span>;
                case 2:
                  return <span>Chi tiết câu lạc bộ</span>;
                case 3:
                  return <span>Chỉnh sửa câu lạc bộ</span>;
                case 4:
                  return <span>Chỉnh sửa phí câu lạc bộ</span>;
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
                      <ClubForm onClose={handleCloseClubModal} />
                    </>
                  );
                case 2:
                  return (
                    <ClubDetailForm
                      onClose={handleCloseClubModal}
                      club={club}
                      isDetail={true}
                    />
                  );
                case 3:
                  return (
                    <ClubDetailForm
                      onClose={handleCloseClubModal}
                      club={club}
                      isDetail={false}
                    />
                  );
                case 4:
                  return (
                    <ClubFeeForm onClose={handleCloseClubModal} club={club} />
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
