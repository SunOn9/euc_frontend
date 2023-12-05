"use client";
import useSearchClub from "@/components/hooks/useSearchClub";

import { CreateClubRequest } from "@/generated/club/club.request";
import { Button } from "@nextui-org/react";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { clubCreate } from "@/service/api/club/create";
import { ToastType, customToast } from "@/components/hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import { Input, Select, Typography } from "antd";

import useSearchArea from "@/components/hooks/useSearchArea";

type Props = {
  onClose: CallableFunction;
};

export default function ClubForm(props: Props) {
  const { clubList, setClubSearchParam } = useSearchClub();

  const { areaList, setAreaSearchParam } = useSearchArea();

  const areaListData = areaList.map((each) => {
    return {
      value: each.id,
      label: each.name,
    };
  });

  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  //schema valie
  const ValidateSchema = Yup.object().shape({
    name: Yup.string().required("Bắt buộc"),
    areaId: Yup.string()
      .required("Bắt buộc")
      .test("valid-area", "Khu vực không hợp lệ", (value) => {
        return value !== "0";
      }),
  });

  const handleClubCreate = (values: CreateClubRequest) => {
    setIsLoading(true);

    clubCreate(values)
      .then((res) => {
        setIsLoading(false);

        if (res.statusCode !== 200) {
          customToast("Tạo thành viên thất bại", ToastType.ERROR);
          props.onClose();
          return;
        }
        customToast(`Tạo thành viên thành công`, ToastType.SUCCESS);
        queryClient.invalidateQueries(["clubSearch"]);
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
      initialValues={CreateClubRequest.create({})}
      validationSchema={ValidateSchema}
      onSubmit={(values) => {
        handleClubCreate(values);
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
                  Viết tắt:
                </Typography.Paragraph>
                <div className="col-span-4">
                  <Input
                    type="text"
                    name="abbreviation"
                    placeholder="Nhập biệt danh"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.abbreviation}
                  />
                  {errors.abbreviation && touched.abbreviation && (
                    <div className="text-red-500 text-xs">
                      {errors.abbreviation}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-5 items-center">
                <Typography.Paragraph className="justify-self-center col-span-1">
                  Khu vực:
                </Typography.Paragraph>
                <div className="col-span-4">
                  <Select
                    className="min-w-full	"
                    placeholder="Chọn khu vực"
                    onSelect={(value) => {
                      setFieldValue("areaId", value);
                    }}
                    options={areaListData}
                    onBlur={handleBlur}
                    value={values.areaId}
                  />
                  {errors.areaId && touched.areaId && (
                    <div className="text-red-500 text-xs">{errors.areaId}</div>
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
