"use client";
import { GetGuestConditionRequest } from "@/generated/guest/guest.request";
import { Button } from "@nextui-org/react";
import { Formik } from "formik";
import { Input, Select, Typography } from "antd";
import { SearchDataType } from "./type";

type Props = {
  showFilter: boolean;
  setGuestSearchParam: React.Dispatch<
    React.SetStateAction<GetGuestConditionRequest>
  >;
};

export default function GuestFilterForm(props: Props) {
  const onFinish = async (values: SearchDataType) => {
    const request = GetGuestConditionRequest.create({
      isExtraClub: true,
    });

    if (values?.name) {
      request.name = values.name;
    }

    props.setGuestSearchParam(request);
  };

  return (
    <Formik
      initialValues={GetGuestConditionRequest.create({})}
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

                  {/* <div className="grid grid-cols-5 items-center">
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
