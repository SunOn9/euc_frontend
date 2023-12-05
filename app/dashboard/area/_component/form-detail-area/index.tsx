"use client";
import { UpdateAreaRequest } from "@/generated/area/area.request";

import { Button } from "@nextui-org/react";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { ToastType, customToast } from "@/components/hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import { Area } from "@/generated/area/area";
import { areaUpdate } from "@/service/api/area/update";
import { Input, Typography } from "antd";

type Props = {
  area: Area;
  isDetail: boolean;
  onClose: CallableFunction;
};

export default function AreaDetailForm(props: Props) {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  //schema valie
  const ValidateSchema = Yup.object().shape({
    name: Yup.string().required("Bắt buộc"),
  });

  const handleAreaUpdate = (values: Area) => {
    setIsLoading(true);
    const request = UpdateAreaRequest.create({
      conditions: {
        id: props.area.id,
      },
      data: {
        name: values.name ?? undefined,
      },
    });

    areaUpdate(request)
      .then((res) => {
        setIsLoading(false);

        if (res.statusCode !== 200) {
          customToast("Cập nhật khách thất bại", ToastType.ERROR);
          props.onClose();
          return;
        }
        customToast(`Cập nhật khách thành công`, ToastType.SUCCESS);
        props.onClose();
        queryClient.invalidateQueries(["areaSearch"]);
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
      initialValues={props.area}
      validationSchema={props.isDetail ? null : ValidateSchema}
      onSubmit={(values) => {
        handleAreaUpdate(values);
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
