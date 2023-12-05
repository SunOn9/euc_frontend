"use client";
import { EnumProto_UserRole } from "@/generated/enumps";
import { UpdateUserRequest } from "@/generated/user/user.request";
import { convertEnumRoleToVietnamese } from "@/service/helper";
import { Button } from "@nextui-org/react";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { ToastType, customToast } from "@/components/hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "@/generated/user/user";
import { userUpdate } from "@/service/api/user/update";
import { Input, Select, Typography } from "antd";

type Props = {
  user: User;
  isDetail: boolean;
  onClose: CallableFunction;
};

type EnumUserRole = {
  value: EnumProto_UserRole;
  label: string;
};

export default function UserDetailForm(props: Props) {
  const enumUserRole = Object.values(EnumProto_UserRole).map((each) => {
    return {
      value: each,
      label: convertEnumRoleToVietnamese(each),
    } as EnumUserRole;
  });

  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  //schema valie
  const ValidateSchema = Yup.object().shape({
    name: Yup.string().required("Bắt buộc"),
    email: Yup.string().required("Bắt buộc").email("Email không hợp lệ"),
    phone: Yup.string().required("Bắt buộc"),
    role: Yup.string()
      .required("Bắt buộc")
      .test(
        "valid-role",
        "Vai trò không hợp lệ",
        (value) => value !== EnumProto_UserRole.UNRECOGNIZED
      ),
  });

  const handleUserUpdate = (values: User) => {
    setIsLoading(true);
    const request = UpdateUserRequest.create({
      conditions: {
        id: props.user.id,
      },
      data: {
        name: values.name,
        email: values.email,
        phone: values.phone,
        role: values.role,
      },
    });

    userUpdate(request)
      .then((res) => {
        setIsLoading(false);

        if (res.statusCode !== 200) {
          customToast("Cập nhật người dùng thất bại", ToastType.ERROR);
          props.onClose();
          return;
        }
        customToast(`Cập nhật người dùng thành công`, ToastType.SUCCESS);
        props.onClose();
        queryClient.invalidateQueries(["userSearch"]);
      })
      .catch((err) => {
        setIsLoading(false);
        props.onClose();
        customToast(`${err.response?.data?.message}`, ToastType.ERROR);
        return;
      });
  };

  return (
    <Formik
      enableReinitialize
      initialValues={props.user}
      validationSchema={props.isDetail ? null : ValidateSchema}
      onSubmit={(values) => {
        handleUserUpdate(values);
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
                  Email:
                </Typography.Paragraph>
                <div className="col-span-4">
                  <Input
                    readOnly={props.isDetail}
                    className=""
                    type="email"
                    name="email"
                    placeholder="Nhập email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {errors.email && touched.email && (
                    <div className="text-red-500 text-xs">{errors.email}</div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-5 items-center ">
                <Typography.Paragraph className="justify-self-center col-span-1">
                  SDT:
                </Typography.Paragraph>
                <div className="col-span-4">
                  <Input
                    readOnly={props.isDetail}
                    className=""
                    type="text"
                    name="phone"
                    placeholder="Nhập số điện thoại"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                  />
                  {errors.phone && touched.phone && (
                    <div className="text-red-500 text-xs">{errors.phone}</div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-5 items-center ">
                <Typography.Paragraph className="justify-self-center col-span-1">
                  Phân quyền:
                </Typography.Paragraph>
                <div className="col-span-4">
                  <Input
                    readOnly={props.isDetail}
                    className=""
                    type="text"
                    name="role"
                    placeholder="Chọn phân quyền"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={convertEnumRoleToVietnamese(values.role)}
                  />
                  {errors.role && touched.role && (
                    <div className="text-red-500 text-xs">{errors.role}</div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-5 items-center">
                <Typography.Paragraph className="justify-self-center col-span-1">
                  CLB:
                </Typography.Paragraph>
                <div className="col-span-4">
                  <Input
                    readOnly
                    className=""
                    type="text"
                    name="club"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.club?.name}
                  />
                  {errors.club && touched.club && (
                    <div className="text-red-500 text-xs">{errors.club}</div>
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
