"use client";

import { CreateClubFeeRequest } from "@/generated/clubFee/clubFee.request";
import { Button } from "@nextui-org/react";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { clubFeeCreate } from "@/service/api/clubFee/create";
import { ToastType, customToast } from "@/components/hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import { Input, Typography } from "antd";
import { Club } from "@/generated/club/club";

type Props = {
  onClose: CallableFunction;
  club: Club;
};

export default function ClubFeeForm(props: Props) {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  //schema valie
  const ValidateSchema = Yup.object().shape({
    studentFee: Yup.string()
      .required("Bắt buộc")
      .test("valid-studentFee", "Phí sinh viên không hợp lệ", (value) => {
        return value !== "0";
      }),
    workerFee: Yup.string()
      .required("Bắt buộc")
      .test("valid-workerFee", "Phí người đi làm không hợp lệ", (value) => {
        return value !== "0";
      }),
  });

  const handleClubFeeCreate = (values: CreateClubFeeRequest) => {
    setIsLoading(true);

    console.log(props.club);
    const { clubId, ...other } = values;

    clubFeeCreate(
      CreateClubFeeRequest.create({
        clubId: props.club.id,
        ...other,
      })
    )
      .then((res) => {
        setIsLoading(false);

        if (res.statusCode !== 200) {
          customToast("Tạo phí thất bại", ToastType.ERROR);
          props.onClose();
          return;
        }
        customToast(`Tạo phí thành công`, ToastType.SUCCESS);
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
      initialValues={CreateClubFeeRequest.create({})}
      validationSchema={ValidateSchema}
      onSubmit={(values) => {
        handleClubFeeCreate(values);
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
                  Phí sinh viên:
                </Typography.Paragraph>
                <div className="col-span-4">
                  <Input
                    type="number"
                    name="studentFee"
                    placeholder="Nhập phí sinh viên"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.studentFee}
                  />
                  {errors.studentFee && touched.studentFee && (
                    <div className="text-red-500 text-xs">
                      {errors.studentFee}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-5 items-center">
                <Typography.Paragraph className="justify-self-center col-span-1">
                  Phí người đi làm:
                </Typography.Paragraph>
                <div className="col-span-4">
                  <Input
                    type="number"
                    name="workerFee"
                    placeholder="Nhập phí người đi làm"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.workerFee}
                  />
                  {errors.workerFee && touched.workerFee && (
                    <div className="text-red-500 text-xs">
                      {errors.workerFee}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-5 items-center">
                <Typography.Paragraph className="justify-self-center col-span-1">
                  Phí tháng:
                </Typography.Paragraph>
                <div className="col-span-4">
                  <Input
                    type="number"
                    name="monthlyFee"
                    placeholder="Nhập phí tháng"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.monthlyFee}
                  />
                  {errors.monthlyFee && touched.monthlyFee && (
                    <div className="text-red-500 text-xs">
                      {errors.monthlyFee}
                    </div>
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
