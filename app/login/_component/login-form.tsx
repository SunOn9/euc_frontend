"use client";
import { Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { Formik } from "formik";

export default function LoginForm() {
  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">Frontend Radio</h4>
        <small className="text-default-500">12 Tracks</small>
      </CardHeader>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {
            email: "",
            password: "",
          };
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
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
            <form onSubmit={handleSubmit}>
              <Input
                type="email"
                label="Email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                errorMessage={errors.email && touched.email && errors.email}
              />

              <Input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                errorMessage={
                  errors.password && touched.password && errors.password
                }
              />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          </CardBody>
        )}
      </Formik>
    </Card>
  );
}
