import FormInput from "@/app/components/common/FormInput";
import FormSubmitButton from "@/app/components/common/FormSubmitButton";
import Toast, { ToastProps } from "@/app/components/common/Toast";
import useFetchUserInfo from "@/app/hooks/client/useFetchUserInfo";
import useUpdateUserInfo from "@/app/hooks/client/useUpdateUserInfo";
import registerUserSchema, {
  RegisterUserValues,
} from "@/app/schemas/registerUserSchema";
import { Form, Formik } from "formik";
import { useState } from "react";

const Personal = () => {
  const [toast, setToast] = useState<ToastProps | null>(null);
  const { data: userInfo, isLoading } = useFetchUserInfo();
  const { mutate: updateUserInfo } = useUpdateUserInfo();

  if (isLoading) return <p>Loading...</p>;

  const initialValues = {
    username: userInfo?.username || "",
    email: userInfo?.email || "",
    password: "",
  };

  const handleSubmit = (formValues: RegisterUserValues) => {
    updateUserInfo(formValues, {
      onSuccess: () =>
        setToast({ variant: "success", children: "Changes saved." }),
      onError: () =>
        setToast({
          variant: "error",
          children: "Something went wrong. Please provide valid data.",
        }),
    });

    setTimeout(() => setToast(null), 5000);
  };

  return (
    <>
      {toast && <Toast variant={toast.variant}>{toast.children}</Toast>}
      <Formik
        initialValues={initialValues}
        validationSchema={registerUserSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormInput labelText="Username" name="username" type="text" />
          <FormInput labelText="E-mail" name="email" type="text" />
          <FormInput
            labelText="Current password"
            name="password"
            type="password"
          />
          <FormSubmitButton>Save changes</FormSubmitButton>
        </Form>
      </Formik>
    </>
  );
};

export default Personal;
