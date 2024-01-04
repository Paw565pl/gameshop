"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { InferType, object, string } from "yup";

const validationSchema = object({
  username: string().required("username is required"),
  email: string().required("email is required").email("email is invalid"),
  password: string()
    .required("password is required")
    .min(8, "password's minimum length is 8 characters"),
});

type RegisterFormValues = InferType<typeof validationSchema>;

const initialValues: RegisterFormValues = {
  username: "",
  email: "",
  password: "",
};

const RegisterForm = () => {
  return (
    <>
      <h3 className="text-center text-6xl font-bold">Register Form</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        <Form className="lg:px-30 w-full xl:px-60">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Username</span>
            </div>
            <Field
              type="text"
              name="username"
              id="username"
              className="input-base-300 input input-bordered w-full rounded-xl focus:border-accent focus:outline-none"
            />
            <ErrorMessage
              name="username"
              className="text-error"
              component="p"
            />
          </label>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <Field
              type="text"
              name="email"
              id="email"
              className="input-base-300 input input-bordered w-full rounded-xl focus:border-accent focus:outline-none"
            />
            <ErrorMessage name="email" className="text-error" component="p" />
          </label>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <Field
              type="text"
              name="password"
              id="password"
              className="input-base-300 input input-bordered w-full rounded-xl focus:border-accent focus:outline-none"
            />
            <ErrorMessage
              name="password"
              className="text-error"
              component="p"
            />
          </label>
          <button type="submit" className="btn btn-block mt-3 rounded text-lg">
            Sign In
          </button>
        </Form>
      </Formik>
      <p className="mt-2 text-center text-xs">
        Already have an account?{" "}
        <Link href={"/login"} className="link-hover link">
          Login here
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
