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
import useSearchMember from "../../../../../components/hooks/useSearchMember";
import {
  EyeIcon,
  EditIcon,
  DeleteIcon,
  AddIcon,
  SearchIcon,
} from "@/components/icons";
import { title } from "@/components/primitives";
import { memberRemove } from "@/service/api/member/remove";
import { useQueryClient } from "@tanstack/react-query";
import { ToastType, customToast } from "@/components/hooks/useToast";
import MemberForm from "../form-create-payment";
import MemberDetailForm from "../form-detail-payment";
import { Member } from "@/generated/member/member";
import { memberDetail } from "@/service/api/member/detail";
import { MemberReply } from "@/generated/member/member.reply";
import MemberFilterForm from "../form-filter-payment";

export default function MemberTable() {
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
      title: "Sinh nhật",
      dataIndex: "birthday",
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
      title: "Sinh viên",
      dataIndex: "type",
      width: 20,
      render: (value) => {
        return value === true ? "✔️" : "❌";
      },
    },
    {
      title: "Quê",
      dataIndex: "hometown",
      width: 30,
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
                  onPress={() => handleOpenMemberModal(2, value.id)}
                />
              </Tooltip>
              <Tooltip content="Sửa">
                <Button
                  className="text-md text-default-400 cursor-pointer active:opacity-50"
                  variant="light"
                  isIconOnly
                  disableRipple
                  disableAnimation
                  onPress={() => handleOpenMemberModal(3, value.id)}
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

  const handleOpenMemberModal = async (type: number, id?: number) => {
    let data: void | MemberReply | undefined;
    if (id) {
      data = await memberDetail({
        id: id,
        isExtraClub: true,
        isExtraArea: true,
      })
        .then((res) => {
          if (res.statusCode !== 200) {
            customToast("Có lỗi xảy ra", ToastType.ERROR);
            return;
          } else {
            if (res.payload) {
              setMember(res.payload);
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
      setMember(data.payload);
    }
    setTypeModal(type);
    setOpenMember(true);
  };

  const handleCloseMemberModal = () => {
    setId(0);
    setTypeModal(0);
    setOpenMember(false);
  };

  const onRemove = () => {
    memberRemove({ id: id })
      .then((res) => {
        if (res.statusCode !== 200) {
          customToast("Xóa thành viên thất bại", ToastType.ERROR);
          handleClose();
          return;
        }
        customToast(`Xóa thành viên Id: ${id} thành công`, ToastType.SUCCESS);
        queryClient.invalidateQueries(["memberSearch"]);
        handleClose();
      })
      .catch(() => {
        customToast("Có lỗi xảy ra", ToastType.ERROR);
        handleClose();
        return;
      });
  };

  const { memberList, total, setMemberSearchParam } = useSearchMember();
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [openMember, setOpenMember] = useState(false);
  const [typeModal, setTypeModal] = useState(0);
  const queryClient = useQueryClient();
  const [id, setId] = useState(0);
  const [member, setMember] = useState(Member.create());
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
            onPress={() => handleOpenMemberModal(1)}
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
      <MemberFilterForm
        showFilter={showFilter}
        setMemberSearchParam={setMemberSearchParam}
      />
      <Table
        size="small"
        className="pt-4"
        columns={columns}
        dataSource={intoTable(memberList, page)}
        rowKey={(record) => record.action.id}
        pagination={{
          total: total,
          defaultPageSize: 5,
          current: page,
          onChange: (page) => {
            setPage(page);
            setMemberSearchParam({
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
        isOpen={openMember}
        onClose={handleCloseMemberModal}
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
                      <MemberForm onClose={handleCloseMemberModal} />
                    </>
                  );
                case 2:
                  return (
                    <MemberDetailForm
                      onClose={handleCloseMemberModal}
                      member={member}
                      isDetail={true}
                    />
                  );
                case 3:
                  return (
                    <MemberDetailForm
                      onClose={handleCloseMemberModal}
                      member={member}
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
