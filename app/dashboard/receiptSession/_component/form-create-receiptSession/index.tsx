"use client";
import { Button } from "@nextui-org/react";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { ToastType, customToast } from "@/components/hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import { Input, Typography } from "antd";

import { CreateReceiptSessionRequest } from "@/generated/receiptSession/receiptSession.request";
import { receiptSessionCreate } from "@/service/api/receiptSession/create";

type Props = {
  onClose: CallableFunction;
  handleReload?: CallableFunction;
  eventId?: number;
};

export default function ReceiptSessionForm(props: Props) {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  //schema valie
  const ValidateSchema = Yup.object().shape({
    title: Yup.string().required("Bắt buộc"),
  });

  const handleReceiptSessionCreate = (values: CreateReceiptSessionRequest) => {
    setIsLoading(true);

    if (props.eventId) {
      values.eventId = props.eventId;
    }

    receiptSessionCreate(values)
      .then((res) => {
        setIsLoading(false);

        if (res.statusCode !== 200) {
          customToast("Tạo phiếu thu thất bại", ToastType.ERROR);
          props.onClose();
          return;
        }
        customToast(`Tạo phiếu thu thành công`, ToastType.SUCCESS);
        queryClient.invalidateQueries(["receiptSessionSearch"]);
        if (props.handleReload) {
          props.handleReload();
        }
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
      initialValues={CreateReceiptSessionRequest.create({})}
      validationSchema={ValidateSchema}
      onSubmit={(values) => {
        handleReceiptSessionCreate(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        /* and other goodies */
      }) => (
        <>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-2">
              <div className="grid grid-cols-5 items-center">
                <Typography.Paragraph className="justify-self-center col-span-1">
                  Tiêu đề:
                </Typography.Paragraph>
                <div className="col-span-4">
                  <Input
                    type="text"
                    name="title"
                    placeholder="Nhập tiêu đề"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                  />
                  {errors.title && touched.title && (
                    <div className="text-red-500 text-xs">{errors.title}</div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-5 items-center">
                <Typography.Paragraph className="justify-self-center col-span-1">
                  Mô tả:
                </Typography.Paragraph>
                <div className="col-span-4">
                  <Input
                    type="text"
                    name="description"
                    placeholder="Nhập mô tả"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                  />
                  {errors.description && touched.description && (
                    <div className="text-red-500 text-xs">
                      {errors.description}
                    </div>
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
