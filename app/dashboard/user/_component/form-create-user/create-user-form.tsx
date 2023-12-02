"use client";
import useSearchClub from "@/components/hooks/useSearchClub";
import {
  EnumProto_UserRole,
  enumProto_UserRoleFromJSON,
  enumProto_UserRoleToJSON,
  enumProto_UserRoleToNumber,
} from "@/generated/enumps";
import { CreateUserRequest } from "@/generated/user/user.request";
import { convertEnumRoleToVietnamese } from "@/service/helper";
import {
  Button,
  Input,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";

import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

type Props = {
  onClose: CallableFunction;
};

export default function UserForm(props: Props) {
  const { clubList, total, setClubSearchParam } = useSearchClub();

  const [role, setRole] = useState(-1);
  const [club, setClub] = useState(0);

  const enumUserRole = Object.values(EnumProto_UserRole).map((each) => {
    return {
      id: enumProto_UserRoleToNumber(each),
      label: convertEnumRoleToVietnamese(each),
      value: enumProto_UserRoleToJSON(each),
    };
  });

  //schema valie
  const ValidateSchema = Yup.object().shape({
    name: Yup.string().required("Bắt buộc"),
    email: Yup.string().required("Bắt buộc").email("Email không hợp lệ"),
    phone: Yup.string().required("Bắt buộc"),
    role: Yup.string().required("Bắt buộc"),
    clubId: Yup.string().required("Bắt buộc"),
  });

  const handleSelectionChangeRole = (e: any) => {
    console.log(e.target.value);
    setRole(Number(e.target.value));
  };

  const handleSelectionChangeClub = (e: any) => {
    console.log(e.target.value);
    setClub(Number(e.target.value));
  };

  const handleUserCreate = (values: CreateUserRequest) => {
    setIsLoading(true);
    values.clubId = club;
    values.role = enumProto_UserRoleFromJSON(role);
    console.log(values);
    setIsLoading(false);
  };

  //loading
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Formik
      initialValues={CreateUserRequest.create()}
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
        /* and other goodies */
      }) => (
        <>
          <form className="" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <Input
                isRequired
                className="pt-4"
                type="text"
                label="Tên"
                name="name"
                labelPlacement="outside"
                placeholder="Nhập tên"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                errorMessage={errors.name && touched.name ? errors.name : " "}
              />
              <Input
                isRequired
                className="pt-4"
                type="email"
                label="Email"
                name="email"
                labelPlacement="outside"
                placeholder="Nhập email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                errorMessage={
                  errors.email && touched.email ? errors.email : " "
                }
              />
              <Input
                isRequired
                className="pt-4"
                type="text"
                label="SDT"
                name="phone"
                labelPlacement="outside"
                placeholder="Nhập số điện thoại"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
              />

              <Autocomplete
                isRequired
                label="Phân quyền"
                labelPlacement="outside"
                placeholder="Chọn phân quyền"
                onChange={(e) => handleSelectionChangeRole(e)}
                className="pt-4"
                name="role"
                errorMessage={errors.role && touched.role ? errors.role : " "}
              >
                {enumUserRole.map((role) => (
                  <AutocompleteItem key={role.id} textValue={role.label}>
                    {role.label}
                  </AutocompleteItem>
                ))}
              </Autocomplete>

              <Autocomplete
                isRequired
                labelPlacement="outside"
                placeholder="Chọn câu lạc bộ"
                name="clubId"
                label="Câu lạc bộ"
                className="pt-4"
                onChange={(e) => handleSelectionChangeClub(e)}
                errorMessage={"123awdkhasifhyowho"}
              >
                {clubList.map((club) => (
                  <AutocompleteItem key={club.id} textValue={club.name}>
                    {club.name}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
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
