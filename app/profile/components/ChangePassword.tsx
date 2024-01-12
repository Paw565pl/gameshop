import FormInput from "@/app/components/common/FormInput";
import FormSubmitButton from "@/app/components/common/FormSubmitButton";
import Toast, { ToastProps } from "@/app/components/common/Toast";
import useUpdateUserPassword from "@/app/hooks/client/useUpdateUserPassword";
import changeUserPasswordSchema, {
  ChangeUserPasswordValues,
} from "@/app/schemas/changeUserPasswordSchema";
import { Form, Formik } from "formik";
import { useState } from "react";

const ChangePassword = () => {
  const [toast, setToast] = useState<ToastProps | null>(null);
  const { mutate: updateUserPassword } = useUpdateUserPassword();

  const initialValues: ChangeUserPasswordValues = {
    currentPassword: "",
    newPassword: "",
  };

  const handleSubmit = (formValues: ChangeUserPasswordValues) => {
    updateUserPassword(formValues, {
      onSuccess: () =>
        setToast({ variant: "success", children: "Changes saved." }),
      onError: (error) => {
        const errors = error.response?.data;
        const errorsString = Object.entries(errors!)
          .map(([_, values]) => `${values.join("\n")}`)
          .join("\n");

        setToast({
          variant: "error",
          children: errorsString,
        });
      },
    });

    setTimeout(() => setToast(null), 5000);
  };

  return (
    <>
      {toast && <Toast variant={toast.variant}>{toast.children}</Toast>}
      <Formik
        initialValues={initialValues}
        validationSchema={changeUserPasswordSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormInput
            labelText="Current password"
            name="currentPassword"
            type="password"
          />
          <FormInput
            labelText="New password"
            name="newPassword"
            type="password"
          />
          <FormSubmitButton>Save changes</FormSubmitButton>
        </Form>
      </Formik>
    </>
  );
};

export default ChangePassword;
