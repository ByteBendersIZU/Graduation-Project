import React, { useState } from "react";

import * as Yup from "yup";
import { Formik, Form } from "formik";
import FormButton from "../../components/form/FormButton";
import FormGroup from "../../components/form/FormGroup";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const signin = () => {
  const router = useRouter();
  const [logInError, setLogInError] = useState(false);

  return (
    <div className="w-screen flex items-center justify-center h-screen">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .max(30, "Email must be 30 characters or less")
            .email("Invalid email address")
            .required("Please enter your email"),
          password: Yup.string()
            .required("Please enter your password")
            .min(6, "Password must be 6 characters or more"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const payload = { email: values.email, password: values.password };
          const result = await signIn("credentials", {
            ...payload,
            redirect: false,
          });
          console.log("UI Result", result);
          if (result.ok) {
            router.push("/dashboard");
          } else {
            setLogInError(true);
          }
        }}
      >
        {() => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3">
            <FormGroup type="email" name="email" labelName={"Email"} />
            <FormGroup type="password" name="password" labelName={"Password"} />
            <FormButton type="submit" buttonName="Submit" />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default signin;
