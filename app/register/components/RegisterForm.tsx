"use client";

import FormInput from "@/app/components/common/FormInput";
import { Form, Formik } from "formik";
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
      <h1 className="mb-4 text-center text-6xl font-bold">Register Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        <Form className="mx-auto sm:w-2/3">
          <FormInput labelText="Username" name="username" type="text" />
          <FormInput labelText="E-mail" name="email" type="text" />
          <FormInput labelText="Password" name="password" type="password" />
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
