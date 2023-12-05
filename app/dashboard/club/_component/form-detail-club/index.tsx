"use client";
import { UpdateClubRequest } from "@/generated/club/club.request";
import {
  convertEnumGenderToVietnamese,
  convertEnumMemberTypeToVietnamese,
  convertEnumRoleToVietnamese,
} from "@/service/helper";
import { Button } from "@nextui-org/react";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { ToastType, customToast } from "@/components/hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import { Club } from "@/generated/club/club";
import { clubUpdate } from "@/service/api/club/update";
import { Input, Typography } from "antd";
import { EnumProto_MemberType } from "@/generated/enumps";

type Props = {
  club: Club;
  isDetail: boolean;
  onClose: CallableFunction;
};

export default function ClubDetailForm(props: Props) {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  //schema valie
  const ValidateSchema = Yup.object().shape({
    name: Yup.string().required("Bắt buộc"),
  });

  const handleClubUpdate = (values: Club) => {
    setIsLoading(true);
    const request = UpdateClubRequest.create({
      conditions: {
        id: props.club.id,
      },
      data: {
        name: values.name ?? undefined,
        abbreviation: values.abbreviation ?? undefined,
      },
    });

    clubUpdate(request)
      .then((res) => {
        setIsLoading(false);

        if (res.statusCode !== 200) {
          customToast("Cập nhật câu lạc bộ thất bại", ToastType.ERROR);
          props.onClose();
          return;
        }
        customToast(`Cập nhật câu lạc bộ thành công`, ToastType.SUCCESS);
        props.onClose();
        queryClient.invalidateQueries(["clubSearch"]);
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
      initialValues={props.club}
      validationSchema={props.isDetail ? null : ValidateSchema}
      onSubmit={(values) => {
        handleClubUpdate(values);
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
                  Viết tắt:
                </Typography.Paragraph>
                <div className="col-span-4">
                  <Input
                    readOnly={props.isDetail}
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
                  <Input
                    readOnly
                    type="text"
                    name="hometown"
                    placeholder=""
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.area?.name}
                  />
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
