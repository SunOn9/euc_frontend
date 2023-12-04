"use client";
import { GetEventConditionRequest } from "@/generated/event/event.request";
import { Button } from "@nextui-org/react";
import { Formik } from "formik";
import { Input, Select, Typography } from "antd";
import { SearchDataType } from "./type";
import { EnumProto_SessionStatus } from "@/generated/enumps";
import { convertEnumSessionStatus } from "@/service/helper";

type Props = {
  showFilter: boolean;
  setEventSearchParam: React.Dispatch<
    React.SetStateAction<GetEventConditionRequest>
  >;
};

export default function EventFilterForm(props: Props) {
  const statusList = Object.values(EnumProto_SessionStatus).map((each) => {
    return {
      value: each,
      label:
        each !== EnumProto_SessionStatus.UNRECOGNIZED
          ? convertEnumSessionStatus(each)
          : "Tất cả",
    };
  });

  const onFinish = async (values: SearchDataType) => {
    const request = GetEventConditionRequest.create({
      isExtraPlace: true,
      isExtraClub: true,
      isExtraPaymentSession: true,
      isExtraReceiptSession: true,
      isExtraPayment: true,
      isExtraReceipt: true,
    });

    props.setEventSearchParam(request);
  };

  return (
    <Formik
      initialValues={GetEventConditionRequest.create({})}
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
                  {/* <div className="grid grid-cols-5 items-center">
                    <Typography.Paragraph className="justify-self-center col-span-1">
                      Tiêu đề:
                    </Typography.Paragraph>
                    <div className="col-span-4">
                      <Input
                        type="text"
                        name="title"
                        placeholder="Nhập tiêu đề"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                      />
                      {errors.title && touched.title && (
                        <div className="text-red-500 text-xs">
                          {errors.title}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-5 items-center">
                    <Typography.Paragraph className="justify-self-center col-span-1">
                      Miêu tả:
                    </Typography.Paragraph>
                    <div className="col-span-4">
                      <Input
                        type="text"
                        name="description"
                        placeholder="Nhập miêu tả"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                      />
                      {errors.description && touched.description && (
                        <div className="text-red-500 text-xs">
                          {errors.description}
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
                        className="min-w-full	"
                        placeholder="Chọn trạng thái"
                        onSelect={(value) => {
                          setFieldValue("status", value);
                        }}
                        options={statusList}
                        onBlur={handleBlur}
                        value={values.status}
                      />
                      {errors.status && touched.status && (
                        <div className="text-red-500 text-xs">
                          {errors.status}
                        </div>
                      )}
                    </div>
                  </div> */}
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
