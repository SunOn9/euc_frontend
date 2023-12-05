"use client";
import useSearchClub from "@/components/hooks/useSearchClub";

import { CreateAreaRequest } from "@/generated/area/area.request";
import { Button } from "@nextui-org/react";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { areaCreate } from "@/service/api/area/create";
import { ToastType, customToast } from "@/components/hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import { Input, Select, Typography } from "antd";
import { EnumProto_Gender, EnumProto_MemberType } from "@/generated/enumps";

import useSearchArea from "@/components/hooks/useSearchArea";

type Props = {
  onClose: CallableFunction;
};

export default function AreaForm(props: Props) {
  const { areaList, setAreaSearchParam } = useSearchArea();

  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  //schema valie
  const ValidateSchema = Yup.object().shape({
    name: Yup.string().required("Bắt buộc"),
  });

  const handleAreaCreate = (values: CreateAreaRequest) => {
    setIsLoading(true);

    areaCreate(values)
      .then((res) => {
        setIsLoading(false);

        if (res.statusCode !== 200) {
          customToast("Tạo khu vực thất bại", ToastType.ERROR);
          props.onClose();
          return;
        }
        customToast(`Tạo khu vực thành công`, ToastType.SUCCESS);
        queryClient.invalidateQueries(["areaSearch"]);
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
      initialValues={CreateAreaRequest.create({})}
      validationSchema={ValidateSchema}
      onSubmit={(values) => {
        handleAreaCreate(values);
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
