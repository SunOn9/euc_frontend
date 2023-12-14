"use client";

import { Button } from "@nextui-org/react";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useQueryClient } from "@tanstack/react-query";
import { DatePicker, Input, Select, Typography } from "antd";
import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { APP_CONFIG, dateFormat } from "@/config/env";
import { ExportOption } from "@/generated/common";

type Props = {
  onClose: CallableFunction;
};

export default function FundForm(props: Props) {
  const cookies = Cookies.get("euc.sessionid"); // => 'value cookies'
  const handleExportFund = async (request: ExportOption) => {
    try {
      const response = await axios.post(
        `${APP_CONFIG.API_BASE_URL}/excel/export-fund`,
        request,
        {
          headers: {
            "Content-Type": "application/json",
            sessionId: cookies,
          },
          responseType: "blob", // Set the response type to 'blob' to handle file download
        }
      );

      // Create a temporary URL for the downloaded file
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a link element and simulate a click to trigger the file download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "exported-fund.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      props.onClose();
    } catch (error) {
      // Handle any error that occurred during the file download
      console.error("Error downloading file:", error);
      props.onClose();
    }
  };
  //schema valie
  const ValidateSchema = Yup.object().shape({
    fromDate: Yup.string().required("Bắt buộc"),
    toDate: Yup.string().required("Bắt buộc"),
  });

  return (
    <Formik
      initialValues={ExportOption.create({})}
      validationSchema={ValidateSchema}
      onSubmit={(values) => {
        handleExportFund(values);
      }}
    >
      {({
        errors,
        touched,
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
                  Từ ngày:
                </Typography.Paragraph>
                <div className="col-span-4">
                  <DatePicker
                    className="min-w-full	"
                    placeholder="Chọn ngày"
                    onChange={(date, _) => {
                      if (date) setFieldValue("fromDate", date.toISOString());
                    }}
                    onBlur={handleBlur}
                    format={dateFormat}
                  />
                  {errors.fromDate && touched.fromDate && (
                    <div className="text-red-500 text-xs">
                      {errors.fromDate}
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-5 items-center">
                <Typography.Paragraph className="justify-self-center col-span-1">
                  Đến ngày:
                </Typography.Paragraph>
                <div className="col-span-4">
                  <DatePicker
                    className="min-w-full	"
                    placeholder="Chọn ngày"
                    onChange={(date, _) => {
                      if (date) setFieldValue("toDate", date.toISOString());
                    }}
                    onBlur={handleBlur}
                    format={dateFormat}
                  />
                  {errors.toDate && touched.toDate && (
                    <div className="text-red-500 text-xs">{errors.toDate}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4 gap-4">
              <Button
                className="bold"
                color="danger"
                variant="flat"
                onPress={() => props.onClose()}
              >
                Huỷ
              </Button>
              <Button className="bold" color="primary" type="submit">
                Xác nhận
              </Button>
            </div>
          </form>
        </>
      )}
    </Formik>
  );
}
