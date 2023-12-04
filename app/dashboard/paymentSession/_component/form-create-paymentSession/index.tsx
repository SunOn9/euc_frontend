"use client";
import useSearchClub from "@/components/hooks/useSearchClub";

import { CreatePaymentRequest } from "@/generated/payment/payment.request";
import { Button } from "@nextui-org/react";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { paymentCreate } from "@/service/api/payment/create";
import { ToastType, customToast } from "@/components/hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import { DatePicker, Input, Select, Typography } from "antd";
import { dateFormat } from "@/config/env";
import { EnumProto_Gender } from "@/generated/enumps";
import { convertEnumGenderToVietnamese } from "@/service/helper";
import useSearchArea from "@/components/hooks/useSearchArea";

type Props = {
  onClose: CallableFunction;
};

export default function PaymentForm(props: Props) {
  const { clubList, setClubSearchParam } = useSearchClub();
  const clubListData = clubList.map((each) => {
    return {
      value: each.id,
      label: each.name,
    };
  });

  const genderList = Object.values(EnumProto_Gender).map((each) => {
    return {
      value: each,
      label: convertEnumGenderToVietnamese(each),
    };
  });

  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  //schema valie
  const ValidateSchema = Yup.object().shape({
    name: Yup.string().required("Bắt buộc"),
  });

  const handlePaymentCreate = (values: CreatePaymentRequest) => {
    setIsLoading(true);

    paymentCreate(values)
      .then((res) => {
        setIsLoading(false);

        if (res.statusCode !== 200) {
          customToast("Tạo thành viên thất bại", ToastType.ERROR);
          return;
        }
        customToast(`Tạo thành viên thành công`, ToastType.SUCCESS);
        queryClient.invalidateQueries(["paymentSearch"]);
      })
      .catch((err) => {
        setIsLoading(false);

        customToast(`${err.response?.data?.message}`, ToastType.ERROR);
        return;
      });
  };

  return (
    <Formik
      initialValues={CreatePaymentRequest.create({})}
      validationSchema={ValidateSchema}
      onSubmit={(values) => {
        handlePaymentCreate(values);
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
                  Biệt danh:
                </Typography.Paragraph>
                <div className="col-span-4">
                  <Input
                    type="text"
                    name="nickName"
                    placeholder="Nhập biệt danh"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nickName}
                  />
                  {errors.nickName && touched.nickName && (
                    <div className="text-red-500 text-xs">
                      {errors.nickName}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-5 items-center">
                <Typography.Paragraph className="justify-self-center col-span-1">
                  Ngày sinh:
                </Typography.Paragraph>
                <div className="col-span-4">
                  <DatePicker
                    className="min-w-full	"
                    placeholder="Chọn ngày sinh"
                    onChange={(_, dateString) => {
                      setFieldValue("birthday", new Date(dateString));
                    }}
                    onBlur={handleBlur}
                    format={dateFormat}
                  />
                  {errors.birthday && touched.birthday && (
                    <div className="text-red-500 text-xs">
                      {errors.birthday}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-5 items-center">
                <Typography.Paragraph className="justify-self-center col-span-1">
                  Tình trạng:
                </Typography.Paragraph>
                <div className="col-span-4">
                  <Select
                    className="min-w-full	"
                    placeholder="Chọn tình trạng"
                    onSelect={(value) => {
                      setFieldValue("status", value);
                    }}
                    options={paymentStatusList}
                    onBlur={handleBlur}
                    value={values.status}
                  />
                  {errors.status && touched.status && (
                    <div className="text-red-500 text-xs">{errors.status}</div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-5 items-center">
                <Typography.Paragraph className="justify-self-center col-span-1">
                  Giới tính:
                </Typography.Paragraph>
                <div className="col-span-4">
                  <Select
                    className="min-w-full	"
                    placeholder="Chọn giới tính"
                    onSelect={(value) => {
                      setFieldValue("gender", value);
                    }}
                    options={genderList}
                    onBlur={handleBlur}
                    value={values.gender}
                  />
                  {errors.gender && touched.gender && (
                    <div className="text-red-500 text-xs">{errors.gender}</div>
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
                    options={paymentTypeList}
                    onBlur={handleBlur}
                    value={values.type}
                  />
                  {errors.type && touched.type && (
                    <div className="text-red-500 text-xs">{errors.type}</div>
                  )}
                </div>
              </div>

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
                    <div className="text-red-500 text-xs">{errors.clubId}</div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-5 items-center">
                <Typography.Paragraph className="justify-self-center col-span-1">
                  Quê:
                </Typography.Paragraph>
                <div className="col-span-4">
                  <Select
                    className="min-w-full	"
                    placeholder="Chọn quê"
                    onSelect={(value) => {
                      setFieldValue("areaId", value);
                    }}
                    options={areaListData}
                    onBlur={handleBlur}
                    value={values.areaId}
                  />
                  {errors.areaId && touched.areaId && (
                    <div className="text-red-500 text-xs">{errors.areaId}</div>
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
