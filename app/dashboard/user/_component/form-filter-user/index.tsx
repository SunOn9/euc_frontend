"use client";
import { EnumProto_UserRole } from "@/generated/enumps";
import { GetUserConditionRequest } from "@/generated/user/user.request";
import { convertEnumRoleToVietnamese } from "@/service/helper";
import { Button } from "@nextui-org/react";
import { Formik } from "formik";
import { Input, Select, Typography } from "antd";
import { SearchDataType } from "./type";

type Props = {
  showFilter: boolean;
  setUserSearchParam: React.Dispatch<
    React.SetStateAction<GetUserConditionRequest>
  >;
};

export default function UserFilterForm(props: Props) {
  const enumUserRole = Object.values(EnumProto_UserRole).map((each) => {
    return {
      value: each,
      label:
        each !== EnumProto_UserRole.UNRECOGNIZED
          ? convertEnumRoleToVietnamese(each)
          : "Tất cả",
    };
  });
  const isDeleted = [
    {
      value: true,
      label: "Tất cả",
    },
    {
      value: false,
      label: "Đang hoạt động",
    },
  ];

  const onFinish = async (values: SearchDataType) => {
    const request = GetUserConditionRequest.create({
      isExtraClub: true,
    });

    if (values?.name) {
      request.name = values.name;
    }

    if (values?.role && values?.role !== EnumProto_UserRole.UNRECOGNIZED) {
      request.role = values.role;
    }

    if (values?.email) {
      request.email = values.email;
    }

    if (values?.phone) {
      request.phone = values.phone;
    }

    if (values?.isDeleted) {
      request.isDeleted = true;
    }

    props.setUserSearchParam(request);
  };

  return (
    <Formik
      initialValues={GetUserConditionRequest.create({
        role: EnumProto_UserRole.UNRECOGNIZED,
        isDeleted: true,
      })}
      onSubmit={(values) => {
        onFinish(values);
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
            {props.showFilter && (
              <>
                <div className="grid grid-cols-3 gap-2">
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
                        <div className="text-red-500 text-xs">
                          {errors.name}
                        </div>
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
                        type="text"
                        name="email"
                        placeholder="Nhập email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                      {errors.email && touched.email && (
                        <div className="text-red-500 text-xs">
                          {errors.email}
                        </div>
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
                        <div className="text-red-500 text-xs">
                          {errors.phone}
                        </div>
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
                        allowClear
                        onClear={() =>
                          setFieldValue("role", EnumProto_UserRole.UNRECOGNIZED)
                        }
                        className="min-w-full "
                        onSelect={(value) => {
                          setFieldValue("role", value);
                        }}
                        options={enumUserRole}
                        onBlur={handleBlur}
                        value={values.role}
                      />
                      {errors.role && touched.role && (
                        <div className="text-red-500 text-xs">
                          {errors.role}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-5 items-center">
                    <Typography.Paragraph className="justify-self-center col-span-1">
                      Trạng thái:
                    </Typography.Paragraph>
                    <div className="col-span-4">
                      <Select
                        placeholder="Chọn trạng thái"
                        className="min-w-full "
                        onSelect={(value) => {
                          setFieldValue("isDeleted", value);
                        }}
                        options={isDeleted}
                        onBlur={handleBlur}
                        value={values.isDeleted}
                      />
                      {errors.isDeleted && touched.isDeleted && (
                        <div className="text-red-500 text-xs">
                          {errors.isDeleted}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-4 gap-4">
                  <Button className="bold" color="primary" type="submit">
                    Tìm kiếm
                  </Button>
                </div>
              </>
            )}
          </form>
        </>
      )}
    </Formik>
  );
}
