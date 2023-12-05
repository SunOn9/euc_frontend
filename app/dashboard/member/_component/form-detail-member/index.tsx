"use client";
import { UpdateMemberRequest } from "@/generated/member/member.request";
import {
  convertEnumGenderToVietnamese,
  convertEnumMemberStatusToVietnamese,
  convertEnumMemberTypeToVietnamese,
  convertEnumRoleToVietnamese,
} from "@/service/helper";
import { Button } from "@nextui-org/react";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { ToastType, customToast } from "@/components/hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import { Member } from "@/generated/member/member";
import { memberUpdate } from "@/service/api/member/update";
import { DatePicker, Input, Select, Typography } from "antd";
import useSearchArea from "@/components/hooks/useSearchArea";
import {
  EnumProto_MemberType,
  EnumProto_MemberStatus,
  EnumProto_Gender,
} from "@/generated/enumps";
import { dateFormat } from "@/config/env";
import dayjs from "dayjs";

type Props = {
  member: Member;
  isDetail: boolean;
  onClose: CallableFunction;
};

export default function MemberDetailForm(props: Props) {
  const { areaList, setAreaSearchParam } = useSearchArea();
  const areaListData = areaList.map((each) => {
    return {
      value: each.id,
      label: each.name,
    };
  });

  const memberTypeList = Object.values(EnumProto_MemberType).map((each) => {
    return {
      value: each,
      label: convertEnumMemberTypeToVietnamese(each),
    };
  });

  const memberStatusList = Object.values(EnumProto_MemberStatus).map((each) => {
    return {
      value: each,
      label: convertEnumMemberStatusToVietnamese(each),
    };
  });

  const genderList = Object.values(EnumProto_Gender).map((each) => {
    return {
      value: each,
      label: convertEnumGenderToVietnamese(each),
    };
  });

  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  //schema valie
  const ValidateSchema = Yup.object().shape({
    name: Yup.string().required("Bắt buộc"),
    status: Yup.string()
      .required("Bắt buộc")
      .test("valid-status", "Tình trạng không hợp lệ", (value) => {
        return value !== EnumProto_MemberStatus.UNRECOGNIZED;
      }),
    type: Yup.string()
      .required("Bắt buộc")
      .test("valid-type", "Loại không hợp lệ", (value) => {
        return value !== EnumProto_MemberType.UNRECOGNIZED;
      }),
    gender: Yup.string()
      .required("Bắt buộc")
      .test("valid-type", "Loại không hợp lệ", (value) => {
        return value !== EnumProto_Gender.UNRECOGNIZED;
      }),
  });

  const handleMemberUpdate = (values: Member) => {
    setIsLoading(true);
    const request = UpdateMemberRequest.create({
      conditions: {
        id: props.member.id,
      },
      data: {
        name: values.name ?? undefined,
        nickName: values.nickName ?? undefined,
        birthday: values.birthday ?? undefined,
        status: values.status ?? undefined,
        type: values.type ?? undefined,
        gender: values.gender ?? undefined,
      },
    });

    memberUpdate(request)
      .then((res) => {
        setIsLoading(false);

        if (res.statusCode !== 200) {
          customToast("Cập nhật người dùng thất bại", ToastType.ERROR);
          props.onClose();
          return;
        }
        customToast(`Cập nhật người dùng thành công`, ToastType.SUCCESS);
        props.onClose();
        queryClient.invalidateQueries(["memberSearch"]);
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
      initialValues={props.member}
      validationSchema={props.isDetail ? null : ValidateSchema}
      onSubmit={(values) => {
        handleMemberUpdate(values);
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
                  Biệt danh:
                </Typography.Paragraph>
                <div className="col-span-4">
                  <Input
                    readOnly={props.isDetail}
                    type="text"
                    name="nickName"
                    placeholder="Nhập biệt danh"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nickName}
                  />
                  {errors.nickName && touched.nickName && (
                    <div className="text-red-500 text-xs">
                      {errors.nickName}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-5 items-center">
                <Typography.Paragraph className="justify-self-center col-span-1">
                  Ngày sinh:
                </Typography.Paragraph>
                <div className="col-span-4">
                  <DatePicker
                    allowClear={false}
                    disabled={props.isDetail}
                    className="min-w-full	"
                    placeholder="Chọn ngày sinh"
                    onChange={(date, dateString) => {
                      setFieldValue("birthday", dayjs(dateString, dateFormat));
                    }}
                    onBlur={handleBlur}
                    format={dateFormat}
                    value={values.birthday ? dayjs(values.birthday) : null}
                  />
                  {errors.birthday && touched.birthday && (
                    <div className="text-red-500 text-xs">
                      {errors.birthday}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-5 items-center">
                <Typography.Paragraph className="justify-self-center col-span-1">
                  Tình trạng:
                </Typography.Paragraph>
                <div className="col-span-4">
                  <Select
                    disabled={props.isDetail}
                    className="min-w-full	"
                    placeholder="Chọn tình trạng"
                    onSelect={(value) => {
                      setFieldValue("status", value);
                    }}
                    options={memberStatusList}
                    onBlur={handleBlur}
                    value={values.status}
                  />
                  {errors.status && touched.status && (
                    <div className="text-red-500 text-xs">{errors.status}</div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-5 items-center">
                <Typography.Paragraph className="justify-self-center col-span-1">
                  Giới tính:
                </Typography.Paragraph>
                <div className="col-span-4">
                  <Select
                    disabled={props.isDetail}
                    className="min-w-full	"
                    placeholder="Chọn giới tính"
                    onSelect={(value) => {
                      setFieldValue("gender", value);
                    }}
                    options={genderList}
                    onBlur={handleBlur}
                    value={values.gender}
                  />
                  {errors.gender && touched.gender && (
                    <div className="text-red-500 text-xs">{errors.gender}</div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-5 items-center">
                <Typography.Paragraph className="justify-self-center col-span-1">
                  Loại:
                </Typography.Paragraph>
                <div className="col-span-4">
                  <Select
                    disabled={props.isDetail}
                    className="min-w-full	"
                    placeholder="Chọn loại"
                    onSelect={(value) => {
                      setFieldValue("type", value);
                    }}
                    options={memberTypeList}
                    onBlur={handleBlur}
                    value={values.type}
                  />
                  {errors.type && touched.type && (
                    <div className="text-red-500 text-xs">{errors.type}</div>
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
                    type="text"
                    name="hometown"
                    placeholder=""
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.memberInClub[0].club?.name}
                  />
                </div>
              </div>

              <div className="grid grid-cols-5 items-center">
                <Typography.Paragraph className="justify-self-center col-span-1">
                  Quê:
                </Typography.Paragraph>
                <div className="col-span-4">
                  <Input
                    readOnly
                    type="text"
                    name="hometown"
                    placeholder=""
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.hometown?.name}
                  />

                  {errors.hometown && touched.hometown && (
                    <div className="text-red-500 text-xs">
                      {errors.hometown}
                    </div>
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
