import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

//Redux
import { authService } from "../../../redux/services/AuthService";
import { getAuthMessage, getJWT } from "../../../redux/slices/AuthSlice";

//Extensions
import { Formik } from "formik";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  //Selectors
  const JWT = useSelector(getJWT);
  const authMessage = useSelector(getAuthMessage);

  if (JWT) {
    router.push(`/account/register`);
  }

  return (
    <div className="w-screen  flex items-center justify-center h-screen">
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Required";
          } else if (values.password.length < 6) {
            errors.password = "Password requires min 6 character";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(
            authService({
              email: values.email,
              password: values.password,
            })
          );
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
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                name="email"
                autoComplete="on"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && (
                <p className="text-red-500 text-xs italic">{errors.email}</p>
              )}
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                name="password"
                autoComplete="on"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && (
                <p className="text-red-500 text-xs italic">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={!errors}
              >
                Submit
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
            {authMessage && (
              <p className="text-red-500 text-xs italic">{authMessage}</p>
            )}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
