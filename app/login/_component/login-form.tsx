"use client";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";
import { LoginRequest } from "@/generated/auth/auth.request";
import { login } from "@/service/api/auth/login";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import clsx from "clsx";
import { Formik } from "formik";
import Cookies from "js-cookie";
import { useState } from "react";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { ToastType, customToast } from "@/components/hooks/useToast";

export default function LoginForm() {
  const router = useRouter();
  //schema valie
  const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Required").email("Invalid email"),
    password: Yup.string().required("Required"),
  });
  //show password button
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  //loading
  const [isLoading, setIsLoading] = useState(false);
  //handle login
  const handleLogin = async (value: LoginRequest) => {
    setIsLoading(true);

    await login({ ...value, data: {} })
      .then((res) => {
        setIsLoading(false);

        if (res.statusCode !== 200) {
          return;
        } else {
          const sessionId = res.extraData?.sessionId;

          if (sessionId !== undefined) {
            Cookies.set("euc.sessionid", sessionId);
          }

          localStorage.setItem("user-info", JSON.stringify(res.payload));
          router.push("/dashboard");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        customToast(`${err.response?.data?.message}`, ToastType.ERROR);
        return;
      });
  };

  return (
    <Card
      isBlurred
      shadow="sm"
      className="p-3 min-w-[35%] bg-background/60 dark:bg-default-100/50"
    >
      <CardHeader className="pb-4 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">Đăng nhập vào EUC</h4>
        <small className="text-default-500">Chào mừng đến với EUC</small>
      </CardHeader>
      <Formik
        initialValues={LoginRequest.create()}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          handleLogin(values);
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
          <CardBody className="overflow-visible py-2">
            <form
              className="flex flex-col justify-center gap-4"
              onSubmit={handleSubmit}
            >
              <Input
                className="pt-4"
                type="email"
                label="Email"
                name="username"
                labelPlacement="outside"
                placeholder="Nhập email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                errorMessage={
                  errors.username && touched.username ? errors.username : " "
                }
              />
              <Input
                className="pt-4"
                label="Mật khẩu"
                name="password"
                placeholder="Nhập mật khẩu"
                labelPlacement="outside"
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

              <Button
                radius="full"
                className={clsx(
                  "bg-gradient-to-tr from-[#FF705B] to-[#FFB457] text-white shadow-lg place-self-center"
                )}
                type="submit"
                isLoading={isLoading}
              >
                Xác nhận
              </Button>
            </form>
          </CardBody>
        )}
      </Formik>
    </Card>
  );
}
