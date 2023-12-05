"use client";

import { Button } from "@nextui-org/react";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { ToastType, customToast } from "@/components/hooks/useToast";
import { Input, Typography } from "antd";
import { userUpdatePassword } from "@/service/api/user/updatePassword";
import { UpdatePasswordRequest } from "@/generated/user/user.request";

export default function ChangePasswordForm() {
  const [isLoading, setIsLoading] = useState(false);

  //schema valie
  const ValidateSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Bắt buộc"),
    newPassword: Yup.string().required("Bắt buộc"),
  });

  const handleChangePassword = (values: UpdatePasswordRequest) => {
    setIsLoading(true);
    userUpdatePassword(values)
      .then((res) => {
        setIsLoading(false);

        if (res.statusCode !== 200) {
          customToast("Cập nhật người dùng thất bại", ToastType.ERROR);
          return;
        }
        customToast(`Cập nhật người dùng thành công`, ToastType.SUCCESS);
      })
      .catch((err) => {
        setIsLoading(false);

        customToast(`${err.response?.data?.message}`, ToastType.ERROR);
        return;
      });
  };

  return (
    <Formik
      initialValues={UpdatePasswordRequest.create({})}
      validationSchema={ValidateSchema}
      onSubmit={(values) => {
        handleChangePassword(values);
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
            <div className="flex flex-col justify-center gap-2">
              <div className="grid grid-cols-5 items-center">
                <Typography.Paragraph className="justify-self-center col-span-1">
                  Mật khẩu cũ:
                </Typography.Paragraph>
                <div className="col-span-4">
                  <Input
                    type="password"
                    name="oldPassword"
                    placeholder="Nhập tên"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.oldPassword}
                  />
                  {errors.oldPassword && touched.oldPassword && (
                    <div className="text-red-500 text-xs">
                      {errors.oldPassword}
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-5 items-center">
                <Typography.Paragraph className="justify-self-center col-span-1">
                  Mật khẩu mới:
                </Typography.Paragraph>
                <div className="col-span-4">
                  <Input
                    className=""
                    type="password"
                    name="newPassword"
                    placeholder="Nhập mật khẩu mới"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.newPassword}
                  />
                  {errors.newPassword && touched.newPassword && (
                    <div className="text-red-500 text-xs">
                      {errors.newPassword}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4 gap-4">
              <Button
                className="bold"
                color="primary"
                isLoading={isLoading}
                type="submit"
              >
                Xác nhận
              </Button>
            </div>
          </form>
        </>
      )}
    </Formik>
  );
}
