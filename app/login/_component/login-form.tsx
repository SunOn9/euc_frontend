"use client";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";
import { text } from "@/components/primitives";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import clsx from "clsx";
import { Formik } from "formik";
import Link from "next/link";
import { useState } from "react";
import * as Yup from "yup";

export default function LoginForm() {
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Card className="p-3 lg:min-w-[30%] md:min-w-[40%]	sm:min-w-[50%]">
      <CardHeader className="pb-4 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">Login to EUC</h4>
        <small className="text-default-500">Welcome to EUC</small>
      </CardHeader>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <CardBody className="overflow-visible py-2">
            <form
              className="flex flex-col place-items-center	"
              onSubmit={handleSubmit}
            >
              <Input
                className="pb-5"
                type="email"
                label="Email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                errorMessage={
                  errors.email && touched.email ? errors.email : " "
                }
              />
              <Input
                className="pb-5 "
                label="Password"
                name="password"
                placeholder="Enter your password "
                endContent={
                  <button
                    className="focus:outline-none	ml-2"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                errorMessage={
                  errors.password && touched.password ? errors.password : " "
                }
              />
              <Link
                href={"/"}
                className={text({
                  color: "cyan",
                })}
              >
                Forgot your password ?
              </Link>
              <Button
                radius="full"
                className={clsx(
                  "bg-gradient-to-tr from-[#FF705B] to-[#FFB457] text-white shadow-lg"
                )}
                type="submit"
                isLoading={isSubmitting}
              >
                Submit
              </Button>
            </form>
          </CardBody>
        )}
      </Formik>
    </Card>
  );
}
