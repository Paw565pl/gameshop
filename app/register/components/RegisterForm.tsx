"use client";

import FormInput from "@/app/components/common/FormInput";
import FormSubmitButton from "@/app/components/common/FormSubmitButton";
import Toast, { ToastProps } from "@/app/components/common/Toast";
import { AuthContext } from "@/app/contexts/AuthContextProvider";
import useRegisterUser from "@/app/hooks/client/useRegisterUser";
import registerUserSchema, {
  RegisterUserValues,
} from "@/app/schemas/registerUserSchema";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useLayoutEffect, useState } from "react";

const initialValues: RegisterUserValues = {
  username: "",
  email: "",
  password: "",
};

const RegisterForm = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [toast, setToast] = useState<ToastProps | null>(null);
  const { mutate: registerUser } = useRegisterUser();
  const router = useRouter();
  const serchParams = useSearchParams();

  useLayoutEffect(() => {
    const returnUrl = serchParams.get("returnUrl");

    if (isAuthenticated) router.push(returnUrl ? returnUrl : "/");
  }, [isAuthenticated, router, serchParams]);

  const handleSubmit = (formValues: RegisterUserValues) => {
    registerUser(formValues, {
      onSuccess: () => {
        setToast({
          variant: "success",
          children:
            "Your account has been succesfully created! You can now log in.",
        });
      },
      onError: (error) => {
        if (error.response?.status === 500) {
          setToast({
            variant: "error",
            children:
              "Something went wrong. There is already a user with that username or email.",
          });
        } else {
          const errors = error.response?.data;
          const errorsString = Object.entries(errors!)
            .map(([_, values]) => `${values.join("\n")}`)
            .join("\n");

          setToast({
            variant: "error",
            children: errorsString,
          });
        }
      },
    });

    setTimeout(() => setToast(null), 5000);
  };

  return (
    <>
      {toast && <Toast variant={toast.variant}>{toast.children}</Toast>}
      <h1 className="mb-4 text-center text-6xl font-bold">Register Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={registerUserSchema}
        onSubmit={handleSubmit}
      >
        <Form className="mx-auto sm:w-2/3">
          <FormInput labelText="Username" name="username" type="text" />
          <FormInput labelText="E-mail" name="email" type="text" />
          <FormInput labelText="Password" name="password" type="password" />
          <FormSubmitButton>Sign In</FormSubmitButton>
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
