"use client";
import { UpdatePaymentSessionRequest } from "@/generated/paymentSession/paymentSession.request";
import {
  Button,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Modal,
} from "@nextui-org/react";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { ToastType, customToast } from "@/components/hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import { PaymentSession } from "@/generated/paymentSession/paymentSession";
import { paymentSessionUpdate } from "@/service/api/paymentSession/update";
import { Input, Typography } from "antd";
import { EnumProto_SessionStatus } from "@/generated/enumps";
import { paymentSessionConfirm } from "@/service/api/paymentSession/confirm";
import { paymentSessionDone } from "@/service/api/paymentSession/done";
import { paymentSessionRemove } from "@/service/api/paymentSession/remove";

type Props = {
  paymentSession: PaymentSession;
  isDetail: boolean;
  onChange: CallableFunction;
};

export default function PaymentSessionDetailForm(props: Props) {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  //schema valie
  const ValidateSchema = Yup.object().shape({});

  const handlePaymentSessionUpdate = (values: PaymentSession) => {
    setIsLoading(true);
    const request = UpdatePaymentSessionRequest.create({
      conditions: {
        id: props.paymentSession.id,
      },
      data: {
        title: values.title ?? undefined,
        description: values.description ?? undefined,
      },
    });

    paymentSessionUpdate(request)
      .then((res) => {
        setIsLoading(false);

        if (res.statusCode !== 200) {
          customToast("Cập nhật phiếu chi thất bại", ToastType.ERROR);
          return;
        }
        customToast(`Cập nhật phiếu chi thành công`, ToastType.SUCCESS);
        props.onChange();
      })
      .catch((err) => {
        setIsLoading(false);
        customToast(`${err.response?.data?.message}`, ToastType.ERROR);
        return;
      });
  };

  const handleConfirm = () => {
    paymentSessionConfirm({ id: props.paymentSession.id })
      .then((res) => {
        setIsLoading(false);

        if (res.statusCode !== 200) {
          customToast("Xác nhận thất bại", ToastType.ERROR);
          return;
        }
        customToast(`Xác nhận thành công`, ToastType.SUCCESS);
        props.onChange();
      })
      .catch((err) => {
        setIsLoading(false);
        customToast(`${err.response?.data?.message}`, ToastType.ERROR);
        return;
      });
  };

  const handleDone = () => {
    paymentSessionDone({ id: props.paymentSession.id })
      .then((res) => {
        setIsLoading(false);

        if (res.statusCode !== 200) {
          customToast("Hoàn thành thất bại", ToastType.ERROR);
          return;
        }
        customToast(`Hoàn thành thành công`, ToastType.SUCCESS);
        props.onChange();
      })
      .catch((err) => {
        setIsLoading(false);
        customToast(`${err.response?.data?.message}`, ToastType.ERROR);
        return;
      });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onRemove = () => {
    paymentSessionRemove({ id: props.paymentSession.id })
      .then((res) => {
        if (res.statusCode !== 200) {
          customToast("Huỷ chi thất bại", ToastType.ERROR);
          handleClose();
          return;
        }
        customToast(
          `Huỷ chi Id: ${props.paymentSession.id} thành công`,
          ToastType.SUCCESS
        );
        props.onChange();
        handleClose();
      })
      .catch(() => {
        customToast("Có lỗi xảy ra", ToastType.ERROR);
        handleClose();
        return;
      });
  };
  const [open, setOpen] = useState(false);

  return (
    <>
      <Formik
        initialValues={props.paymentSession}
        validationSchema={props.isDetail ? null : ValidateSchema}
        onSubmit={(values) => {
          handlePaymentSessionUpdate(values);
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
                      readOnly={props.isDetail}
                      disabled={
                        props.paymentSession.status !==
                        EnumProto_SessionStatus.JUST_CREATE
                      }
                      type="text"
                      name="title"
                      placeholder="Nhập tiêu đề"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title || props.paymentSession.title}
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
                      readOnly={props.isDetail}
                      disabled={
                        props.paymentSession.status !==
                        EnumProto_SessionStatus.JUST_CREATE
                      }
                      type="text"
                      name="description"
                      placeholder="Nhập mô tả"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={
                        values.description || props.paymentSession.description
                      }
                    />
                    {errors.description && touched.description && (
                      <div className="text-red-500 text-xs">
                        {errors.description}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {props.isDetail === false ? (
                <div className="flex justify-end mt-4 gap-4">
                  <Button
                    className="bold"
                    color="primary"
                    isLoading={isLoading}
                    type="submit"
                    isDisabled={
                      props.paymentSession.status !==
                      EnumProto_SessionStatus.JUST_CREATE
                    }
                  >
                    Cập nhật
                  </Button>
                  <Button
                    className="bold"
                    isDisabled={
                      props.paymentSession.status !==
                      EnumProto_SessionStatus.JUST_CREATE
                    }
                    color="primary"
                    isLoading={isLoading}
                    onPress={handleConfirm}
                  >
                    Xác nhận
                  </Button>
                  <Button
                    className="bold"
                    isDisabled={
                      props.paymentSession.status !==
                        EnumProto_SessionStatus.JUST_CREATE &&
                      props.paymentSession.status !==
                        EnumProto_SessionStatus.CONFIRMED
                    }
                    color="primary"
                    onPress={handleDone}
                    isLoading={isLoading}
                  >
                    Hoàn thành
                  </Button>
                  <Button
                    className="bold"
                    isDisabled={
                      props.paymentSession.status ===
                      EnumProto_SessionStatus.CANCEL
                    }
                    color="primary"
                    isLoading={isLoading}
                    onPress={handleOpen}
                  >
                    Huỷ
                  </Button>
                </div>
              ) : null}
            </form>
          </>
        )}
      </Formik>
      <Modal
        size="xs"
        isOpen={open}
        onClose={handleClose}
        placement="top-center"
        isDismissable={false}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col">Huỷ</ModalHeader>
            <ModalBody>Xác nhận huỷ phiếu chi này?</ModalBody>
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
                Xác nhận
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
