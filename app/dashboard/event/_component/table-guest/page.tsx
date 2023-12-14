"use client";
import React, { useEffect, useState } from "react";
import { Select, Table, Typography } from "antd";
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
import { DeleteIcon, AddIcon } from "@/components/icons";
import { ToastType, customToast } from "@/components/hooks/useToast";
import { Event, Event_Guest } from "@/generated/event/event";
import useSearchGuest from "@/components/hooks/useSearchGuest";
import { addGuest } from "@/service/api/event/addGuest";
import { removeGuestEvent } from "@/service/api/event/removeGuest";

type Props = {
  onChange: CallableFunction;
  event: Event;
};

export default function GuestTable(props: Props) {
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "STT",
      dataIndex: "stt",
      width: 15,
    },
    {
      title: "Tên",
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
      width: 30,
      render: (value) => {
        return value === true ? "✔️" : "❌";
      },
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
      width: 15,
      fixed: "right",
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
                  onPress={() => {
                    router.push(`guest/${value.id}`);
                  }}
                />
              </Tooltip> */}
              {/* <Tooltip content="Sửa">
                <Button
                  className="text-md text-default-400 cursor-pointer active:opacity-50"
                  isDisabled={
                    props.guestSession.status !==
                    EnumProto_SessionStatus.JUST_CREATE
                  }
                  variant="light"
                  isIconOnly
                  disableRipple
                  disableAnimation
                  onPress={() => handleOpenGuestModal(3, value.id)}
                  startContent={<EditIcon />}
                />
              </Tooltip> */}
              <Tooltip color="danger" content="Xoá">
                <Button
                  isDisabled={
                    props.event.actualEndEventDate !== null ||
                    props.event.deletedAt !== null
                  }
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

  const onRemove = () => {
    removeGuestEvent({ eventId: props.event.id, guestIdList: [id] })
      .then((res) => {
        if (res.statusCode !== 200) {
          customToast("Xóa khách ra khỏi sự kiện thất bại", ToastType.ERROR);
          handleClose();
          return;
        }
        customToast(
          `Xóa khách Id: ${id} ra khỏi sự kiện  thành công`,
          ToastType.SUCCESS
        );
        props.onChange();
        handleClose();
      })
      .catch((err) => {
        customToast(`${err.response?.data?.message}`, ToastType.ERROR);
        handleClose();
        return;
      });
  };

  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);
  const [guestListEvent, setGuestListEvent] = useState<Event_Guest[]>([]);

  const [guestAddList, setGuestAddList] = useState<number[]>([]);
  const { guestList, setGuestSearchParam } = useSearchGuest();

  const [guestListOptions, setGuestListOptions] = useState<any[]>([]);
  const eventGuestList = guestListEvent.map((each) => each.id);

  useEffect(() => {
    const guestListOptionsTmp: any[] = [];

    for (const each of guestList) {
      if (!eventGuestList.includes(each.id)) {
        guestListOptionsTmp.push({ value: each.id, label: each.name });
      }
    }

    setGuestListOptions(guestListOptionsTmp);
    setGuestListEvent(props.event.guest);
  }, [props.event, guestList, eventGuestList]);

  const handleChangeAddList = (value: number[]) => {
    setGuestAddList(value);
  };

  const onAdd = () => {
    if (guestAddList.length !== 0)
      addGuest({
        eventId: props.event.id,
        guestIdList: guestAddList,
      })
        .then((res) => {
          if (res.statusCode !== 200) {
            customToast("Thêm khách vào sự kiện thất bại", ToastType.ERROR);
            return;
          }
          customToast(
            `Thêm khách vào sự kiện Id: ${props.event.id} thành công`,
            ToastType.SUCCESS
          );
          props.onChange();
        })
        .catch((err) => {
          customToast(`${err.response?.data?.message}`, ToastType.ERROR);
          return;
        });
  };

  return (
    <div>
      <div className="flex items-center	 max-w-lg py-4 gap-4">
        <Button
          isDisabled={
            props.event.actualEndEventDate !== null ||
            props.event.deletedAt !== null
          }
          color="primary"
          className="bold text-sm cursor-pointer active:opacity-50"
          disableRipple
          disableAnimation
          startContent={<AddIcon />}
          onPress={onAdd}
        >
          Thêm khách
        </Button>
        <div className="grid grid-cols-5 items-center">
          <Typography.Paragraph className="justify-self-center col-span-1">
            Thành viên:
          </Typography.Paragraph>
          <div className="col-span-4">
            <Select
              className="min-w-full	"
              placeholder="Chọn khách"
              mode="multiple"
              allowClear
              onChange={handleChangeAddList}
              options={guestListOptions}
            />
          </div>
        </div>
      </div>

      <Table
        size="small"
        className="pt-4"
        columns={columns}
        dataSource={intoTable(guestListEvent, page)}
        rowKey={(record) => record.action.id}
        pagination={false}
        // pagination={{
        //   total: total,
        //   defaultPageSize: 5,
        //   current: page,
        //   onChange: (page) => {
        //     setPage(page);
        //     setGuestSearchParam({
        //       page: page,
        //     });
        //   },
        //   showSizeChanger: false,
        // }}
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
    </div>
  );
}
