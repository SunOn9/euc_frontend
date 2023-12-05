"use client";
import { Button } from "@nextui-org/react";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { ToastType, customToast } from "@/components/hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import { Input, Select, Typography } from "antd";

import { UpdatePaymentRequest } from "@/generated/payment/payment.request";
import { paymentUpdate } from "@/service/api/payment/update";
import { EnumProto_MoneyMethod } from "@/generated/enumps";
import { convertEnumMoneyMethodToVietnamese } from "@/service/helper";
import { Payment } from "@/generated/payment/payment";
import { paymentDetail } from "@/service/api/payment/detail";

type Props = {
  id: number;
  onClose: CallableFunction;
  onChange: CallableFunction;
};

export default function PaymentDetailForm(props: Props) {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const [payment, setPayment] = useState(Payment.create());

  useEffect(() => {
    paymentDetail({
      id: props.id,
    })
      .then((res) => {
        if (res.statusCode !== 200) {
          customToast(`${err.response?.data?.message}`, ToastType.ERROR);
          return;
        } else {
          if (res.payload) {
            setPayment(res.payload);
          }
          return res;
        }
      })
      .catch((err) => {
        customToast(`${err.response?.data?.message}`, ToastType.ERROR);
        return;
      });
  }, [props.id]);

  const methodList = Object.values(EnumProto_MoneyMethod).map((each) => {
    return {
      value: each,
      label: convertEnumMoneyMethodToVietnamese(each),
    };
  });

  //schema valie
  const ValidateSchema = Yup.object().shape({
    // amount: Yup.string().test(
    //   "valid-amout",
    //   "Số tiền không hợp lệ",
    //   (value) => {
    //     return value !== "0";
    //   }
    // ),
    method: Yup.string().test(
      "valid-method",
      "Phơơng thức không hợp lệ",
      (value) => {
        return value !== EnumProto_MoneyMethod.UNRECOGNIZED;
      }
    ),
  });

  const handlePaymentUpdate = (values: Payment) => {
    setIsLoading(true);

    const request = UpdatePaymentRequest.create({
      conditions: { id: props.id },
      data: {
        title: values.title ?? undefined,
        description: values.description ?? undefined,
        method: values.method ?? undefined,
        amount: values.amount ?? undefined,
      },
    });

    console.log(request);

    // paymentUpdate(
    //   request
    // )
    //   .then((res) => {
    //     setIsLoading(false);

    //     if (res.statusCode !== 200) {
    //       customToast("Cập nhật phiên chi thất bại", ToastType.ERROR);
    //       props.onClose();
    //       return;
    //     }
    //     customToast(`Cập nhật phiên chi thành công`, ToastType.SUCCESS);
    //     props.onClose();
    //     props.onChange();
    //   })
    //   .catch((err) => {
    //     setIsLoading(false);
    //     customToast(`${err.response?.data?.message}`, ToastType.ERROR);
    //     props.onClose();
    //     return;
    //   });
  };

  return (
    <Formik
      enableReinitialize
      initialValues={payment}
      validationSchema={ValidateSchema}
      onSubmit={(values) => {
        handlePaymentUpdate(values);
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

              <div className="grid grid-cols-5 items-center">
                <Typography.Paragraph className="justify-self-center col-span-1">
                  Số tiền:
                </Typography.Paragraph>
                <div className="col-span-4">
                  <Input
                    type="number"
                    name="amount"
                    placeholder="Nhập số tiền"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.amount}
                  />
                  {errors.amount && touched.amount && (
                    <div className="text-red-500 text-xs">{errors.amount}</div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-5 items-center">
                <Typography.Paragraph className="justify-self-center col-span-1">
                  Phương thức:
                </Typography.Paragraph>
                <div className="col-span-4">
                  <Select
                    className="min-w-full	"
                    placeholder="Chọn phương thức"
                    onSelect={(value) => {
                      setFieldValue("method", value);
                    }}
                    options={methodList}
                    onBlur={handleBlur}
                    value={values.method}
                  />
                  {errors.method && touched.method && (
                    <div className="text-red-500 text-xs">{errors.method}</div>
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
                Cập nhật
              </Button>
            </div>
          </form>
        </>
      )}
    </Formik>
  );
}
