"use client";

import FormInput from "@/app/components/common/FormInput";
import FormSubmitButton from "@/app/components/common/FormSubmitButton";
import Toast, { ToastProps } from "@/app/components/common/Toast";
import { AuthContext } from "@/app/contexts/AuthContextProvider";
import useLoginUser from "@/app/hooks/client/useLoginUser";
import loginUserSchema, {
  LoginUserValues,
} from "@/app/schemas/loginUserSchema";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useLayoutEffect, useState } from "react";

const initialValues: LoginUserValues = {
  username: "",
  password: "",
};

const LoginForm = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [toast, setToast] = useState<ToastProps | null>(null);
  const { mutate: loginUser } = useLoginUser();
  const router = useRouter();
  const serchParams = useSearchParams();

  useLayoutEffect(() => {
    const returnUrl = serchParams.get("returnUrl");

    if (isAuthenticated) router.replace(returnUrl ? returnUrl : "/");
  }, [isAuthenticated, router, serchParams]);

  const handleSubmit = (formValues: LoginUserValues) => {
    loginUser(formValues, {
      onError: (error) => {
        if (error.response?.status === 401) {
          setToast({
            variant: "error",
            children: "Invalid username or password.",
          });
        } else {
          setToast({
            variant: "error",
            children: "Something went wrong. Please try again later.",
          });
        }
      },
    });

    setTimeout(() => setToast(null), 5000);
  };

  return (
    <>
      {toast && <Toast variant={toast.variant}>{toast.children}</Toast>}
      <h2 className="mb-4 text-center text-6xl font-bold">Login Form</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={loginUserSchema}
        onSubmit={handleSubmit}
      >
        <Form className="mx-auto sm:w-2/3">
          <FormInput labelText="Username" name="username" type="text" />
          <FormInput labelText="Password" name="password" type="password" />
          <FormSubmitButton>Log In</FormSubmitButton>
        </Form>
      </Formik>
      <p className="mt-2 text-center text-xs">
        Don&apos;t have an account yet?{" "}
        <Link href={"/register"} className="link-hover link">
          Register here
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
