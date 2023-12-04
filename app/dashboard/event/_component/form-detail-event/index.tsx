"use client";
import { UpdateEventRequest } from "@/generated/event/event.request";
import { convertEnumEventTypeToVietnamese } from "@/service/helper";
import { Button } from "@nextui-org/react";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { ToastType, customToast } from "@/components/hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import { Event } from "@/generated/event/event";
import { eventUpdate } from "@/service/api/event/update";
import { DatePicker, Input, Select, Typography } from "antd";
import { EnumProto_EventType } from "@/generated/enumps";
import { dateFormat } from "@/config/env";
import dayjs from "dayjs";

type Props = {
  event: Event;
  onChange: CallableFunction;
};

export default function EventDetailForm(props: Props) {
  const eventTypeList = Object.values(EnumProto_EventType).map((each) => {
    return {
      value: each,
      label: convertEnumEventTypeToVietnamese(each),
    };
  });

  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  //schema valie
  const ValidateSchema = Yup.object().shape({
    name: Yup.string().required("Bắt buộc"),

    type: Yup.string()
      .required("Bắt buộc")
      .test("valid-type", "Loại không hợp lệ", (value) => {
        return value !== EnumProto_EventType.UNRECOGNIZED;
      }),
  });

  const handleEventUpdate = (values: Event) => {
    setIsLoading(true);
    const request = UpdateEventRequest.create({
      conditions: {
        id: props.event.id,
      },
      data: {
        name: values.name ?? undefined,

        type: values.type ?? undefined,
      },
    });

    eventUpdate(request)
      .then((res) => {
        setIsLoading(false);

        if (res.statusCode !== 200) {
          customToast("Cập nhật người dùng thất bại", ToastType.ERROR);
          return;
        }
        customToast(`Cập nhật người dùng thành công`, ToastType.SUCCESS);
        queryClient.invalidateQueries(["eventSearch"]);
      })
      .catch((err) => {
        setIsLoading(false);
        customToast(`${err.response?.data?.message}`, ToastType.ERROR);
        return;
      });
  };

  return (
    <Formik
      initialValues={props.event}
      validationSchema={}
      onSubmit={(values) => {
        handleEventUpdate(values);
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
                    readOnly={props.isDetail}
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
                    allowClear={false}
                    disabled={props.isDetail}
                    className="min-w-full	"
                    placeholder="Chọn ngày bắt đầu"
                    onChange={(_, dateString) => {
                      setFieldValue(
                        "startEventDate",
                        dayjs(dateString, dateFormat)
                      );
                    }}
                    onBlur={handleBlur}
                    format={dateFormat}
                    value={
                      values.startEventDate
                        ? dayjs(values.startEventDate)
                        : null
                    }
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
                    allowClear={false}
                    disabled={props.isDetail}
                    className="min-w-full	"
                    placeholder="Chọn ngày kết thúc"
                    onChange={(_, dateString) => {
                      setFieldValue(
                        "endEventDate",
                        dayjs(dateString, dateFormat)
                      );
                    }}
                    onBlur={handleBlur}
                    format={dateFormat}
                    value={
                      values.endEventDate ? dayjs(values.endEventDate) : null
                    }
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
                    disabled={props.isDetail}
                    className="min-w-full	"
                    placeholder="Chọn loại"
                    onSelect={(value) => {
                      setFieldValue("type", value);
                    }}
                    options={eventTypeList}
                    onBlur={handleBlur}
                    value={values.type}
                  />
                  {errors.type && touched.type && (
                    <div className="text-red-500 text-xs">{errors.type}</div>
                  )}
                </div>
              </div>
            </div>

            {props.isDetail === false ? (
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
                  Cập nhật
                </Button>
              </div>
            ) : null}
          </form>
        </>
      )}
    </Formik>
  );
}
