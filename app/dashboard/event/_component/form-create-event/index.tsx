"use client";
import { Button } from "@nextui-org/react";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { ToastType, customToast } from "@/components/hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import { DatePicker, Input, Select, Typography } from "antd";

import { CreateEventRequest } from "@/generated/event/event.request";
import { eventCreate } from "@/service/api/event/create";
import useSearchClub from "@/components/hooks/useSearchClub";
import { dateFormat } from "@/config/env";
import { EnumProto_EventType, EnumProto_UserRole } from "@/generated/enumps";
import { convertEnumEventTypeToVietnamese } from "@/service/helper";
import useSearchPlace from "@/components/hooks/useSearchPlace";
import { User } from "@/generated/user/user";

type Props = {
  onClose: CallableFunction;
  userInfo: User;
};

export default function EventForm(props: Props) {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const { clubList, setClubSearchParam } = useSearchClub();
  const clubListData = clubList.map((each) => {
    return {
      value: each.id,
      label: each.name,
    };
  });

  const { placeList, setPlaceSearchParam } = useSearchPlace();
  const placeListData = placeList.map((each) => {
    return {
      value: each.id,
      label: each.name,
    };
  });

  const typeList = Object.values(EnumProto_EventType).map((each) => {
    return { value: each, label: convertEnumEventTypeToVietnamese(each) };
  });

  //schema valie
  const ValidateSchema = Yup.object().shape({
    name: Yup.string().required("Bắt buộc"),
    startEventDate: Yup.string().required("Bắt buộc"),
    type: Yup.string().required("Bắt buộc"),
    clubId:
      props.userInfo.role !== EnumProto_UserRole.ADMIN
        ? Yup.string()
        : Yup.string()
            .required("Bắt buộc")
            .test("valid-type", "Câu lạc bộ không hợp lệ", (value) => {
              return value !== "0" && value !== undefined;
            }),
    endEventDate: Yup.string().required("Bắt buộc"),
  });

  const handleEventCreate = (values: CreateEventRequest) => {
    setIsLoading(true);

    eventCreate(values)
      .then((res) => {
        setIsLoading(false);

        if (res.statusCode !== 200) {
          customToast("Tạo sự kiện thất bại", ToastType.ERROR);
          props.onClose();
          return;
        }
        customToast(`Tạo sự kiện thành công`, ToastType.SUCCESS);
        queryClient.invalidateQueries(["eventSearch"]);
        props.onClose();
      })
      .catch((err) => {
        setIsLoading(false);
        customToast(`${err.response?.data?.message}`, ToastType.ERROR);
        props.onClose();
        return;
      });
  };

  return (
    <Formik
      initialValues={CreateEventRequest.create({
        clubId: 0,
        type: EnumProto_EventType.UNRECOGNIZED,
      })}
      validationSchema={ValidateSchema}
      onSubmit={(values) => {
        handleEventCreate(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        /* and other goodies */
      }) => (
        <>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-2">
              <div className="grid grid-cols-5 items-center">
                <Typography.Paragraph className="justify-self-center col-span-1">
                  Tên:
                </Typography.Paragraph>
                <div className="col-span-4">
                  <Input
                    type="text"
                    name="name"
                    placeholder="Nhập tên"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  {errors.name && touched.name && (
                    <div className="text-red-500 text-xs">{errors.name}</div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-5 items-center">
                <Typography.Paragraph className="justify-self-center col-span-1">
                  Ngày bắt đầu:
                </Typography.Paragraph>
                <div className="col-span-4">
                  <DatePicker
                    className="min-w-full	"
                    placeholder="Chọn ngày bắt đầu"
                    onChange={(date, _) => {
                      if (date) setFieldValue("startEventDate", date?.toDate());
                    }}
                    onBlur={handleBlur}
                    format={dateFormat}
                  />
                  {errors.startEventDate && touched.startEventDate && (
                    <div className="text-red-500 text-xs">
                      {errors.startEventDate}
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-5 items-center">
                <Typography.Paragraph className="justify-self-center col-span-1">
                  Ngày kết thúc:
                </Typography.Paragraph>
                <div className="col-span-4">
                  <DatePicker
                    className="min-w-full	"
                    placeholder="Chọn ngày kết thúc"
                    onChange={(date, _) => {
                      if (date) setFieldValue("endEventDate", date?.toDate());
                    }}
                    onBlur={handleBlur}
                    format={dateFormat}
                  />
                  {errors.endEventDate && touched.endEventDate && (
                    <div className="text-red-500 text-xs">
                      {errors.endEventDate}
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-5 items-center">
                <Typography.Paragraph className="justify-self-center col-span-1">
                  Loại:
                </Typography.Paragraph>
                <div className="col-span-4">
                  <Select
                    className="min-w-full	"
                    placeholder="Chọn loại"
                    onSelect={(value) => {
                      setFieldValue("type", value);
                    }}
                    options={typeList}
                    onBlur={handleBlur}
                    value={values.type}
                  />
                  {errors.type && touched.type && (
                    <div className="text-red-500 text-xs">{errors.type}</div>
                  )}
                </div>
              </div>
              {props.userInfo.role !== EnumProto_UserRole.ADMIN ? null : (
                <div className="grid grid-cols-5 items-center">
                  <Typography.Paragraph className="justify-self-center col-span-1">
                    CLB:
                  </Typography.Paragraph>
                  <div className="col-span-4">
                    <Select
                      className="min-w-full	"
                      placeholder="Chọn câu lạc bộ"
                      onSelect={(value) => {
                        setFieldValue("clubId", value);
                      }}
                      options={clubListData}
                      onBlur={handleBlur}
                      value={values.clubId}
                    />
                    {errors.clubId && touched.clubId && (
                      <div className="text-red-500 text-xs">
                        {errors.clubId}
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-5 items-center">
                <Typography.Paragraph className="justify-self-center col-span-1">
                  Địa điểm:
                </Typography.Paragraph>
                <div className="col-span-4">
                  <Select
                    className="min-w-full	"
                    placeholder="Chọn địa điểm"
                    onSelect={(value) => {
                      setFieldValue("placeId", value);
                    }}
                    options={placeListData}
                    onBlur={handleBlur}
                    value={values.placeId}
                  />
                  {errors.placeId && touched.placeId && (
                    <div className="text-red-500 text-xs">{errors.placeId}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4 gap-4">
              <Button
                className="bold"
                color="danger"
                variant="flat"
                isLoading={isLoading}
                onPress={() => props.onClose()}
              >
                Huỷ
              </Button>
              <Button
                className="bold"
                color="primary"
                isLoading={isLoading}
                type="submit"
              >
                Tạo
              </Button>
            </div>
          </form>
        </>
      )}
    </Formik>
  );
}
