"use client";
import useSearchClub from "@/components/hooks/useSearchClub";
import {
  EnumProto_UserRole,
  enumProto_UserRoleFromJSON,
} from "@/generated/enumps";
import { CreateUserRequest } from "@/generated/user/user.request";
import { convertEnumRoleToVietnamese } from "@/service/helper";
import { Button } from "@nextui-org/react";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { userCreate } from "@/service/api/user/create";
import { ToastType, customToast } from "@/components/hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import { Input, Select, Typography } from "antd";

type Props = {
  onClose: CallableFunction;
};

export default function UserForm(props: Props) {
  const { clubList, total, setClubSearchParam } = useSearchClub();
  const clubListData = clubList.map((each) => {
    return {
      value: each.id,
      label: each.name,
    };
  });

  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const enumUserRole = Object.values(EnumProto_UserRole).map((each) => {
    return { value: each, label: convertEnumRoleToVietnamese(each) };
  });

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
    clubId: Yup.string()
      .required("Bắt buộc")
      .test("valid-clubId", "Câu lạc bộ không hợp lệ", (value) => {
        return value !== "0";
      }),
  });

  const handleUserCreate = (values: CreateUserRequest) => {
    setIsLoading(true);
    userCreate(values)
      .then((res) => {
        setIsLoading(false);

        if (res.statusCode !== 200) {
          customToast("Tạo người dùng thất bại", ToastType.ERROR);
          return;
        }
        customToast(`Tạo người dùng thành công`, ToastType.SUCCESS);
        queryClient.invalidateQueries(["userSearch"]);
      })
      .catch((err) => {
        setIsLoading(false);

        customToast(`${err.response?.data?.message}`, ToastType.ERROR);
        return;
      });
  };

  return (
    <Formik
      initialValues={CreateUserRequest.create({
        role: EnumProto_UserRole.UNRECOGNIZED,
        clubId: 0,
      })}
      validationSchema={ValidateSchema}
      onSubmit={(values) => {
        handleUserCreate(values);
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
                  Email:
                </Typography.Paragraph>
                <div className="col-span-4">
                  <Input
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
              <div className="grid grid-cols-5 items-center">
                <Typography.Paragraph className="justify-self-center col-span-1">
                  Phân quyền:
                </Typography.Paragraph>
                <div className="col-span-4">
                  <Select
                    placeholder="Chọn phân quyền"
                    className="min-w-full "
                    onSelect={(value) => {
                      setFieldValue("role", value);
                    }}
                    options={enumUserRole}
                    onBlur={handleBlur}
                    value={values.role}
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
