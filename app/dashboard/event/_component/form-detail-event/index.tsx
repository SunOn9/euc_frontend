"use client";
import {
  convertEnumEventTypeToVietnamese,
  convertToVietNamDate,
} from "@/service/helper";
import { Formik } from "formik";
import { Event } from "@/generated/event/event";
import { Input, Typography } from "antd";

type Props = {
  event: Event;
};

export default function EventDetailForm(props: Props) {
  return (
    <Formik enableReinitialize initialValues={props.event} onSubmit={() => {}}>
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
                    readOnly={true}
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
                  Ngày bắt đầu:
                </Typography.Paragraph>
                <div className="col-span-4">
                  <Input
                    readOnly={true}
                    type="text"
                    name="startEventDate"
                    placeholder="Nhập tên"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={
                      values.startEventDate
                        ? convertToVietNamDate(values.startEventDate)
                        : ""
                    }
                  />
                  {errors.startEventDate && touched.startEventDate && (
                    <div className="text-red-500 text-xs">
                      {errors.startEventDate}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-5 items-center">
                <Typography.Paragraph className="justify-self-center col-span-1">
                  Ngày kết thúc:
                </Typography.Paragraph>
                <div className="col-span-4">
                  <Input
                    readOnly={true}
                    type="text"
                    name="endEventDate"
                    // placeholder="Nhập tên"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={
                      values.endEventDate
                        ? convertToVietNamDate(values.endEventDate)
                        : ""
                    }
                  />
                  {errors.endEventDate && touched.endEventDate && (
                    <div className="text-red-500 text-xs">
                      {errors.endEventDate}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-5 items-center">
                <Typography.Paragraph className="justify-self-center col-span-1">
                  Loại:
                </Typography.Paragraph>
                <div className="col-span-4">
                  <Input
                    readOnly={true}
                    type="text"
                    name="type"
                    // placeholder="Nhập tên"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={
                      values.type
                        ? convertEnumEventTypeToVietnamese(values.type)
                        : ""
                    }
                  />
                  {errors.type && touched.type && (
                    <div className="text-red-500 text-xs">{errors.type}</div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </Formik>
  );
}
