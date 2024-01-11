import FormInput from "@/app/components/common/FormInput";
import FormSubmitButton from "@/app/components/common/FormSubmitButton";
import useFetchUserInfo from "@/app/hooks/client/useFetchUserInfo";
import { Form, Formik } from "formik";

const ChangeEmailForm = () => {
  const { data: userInfo } = useFetchUserInfo();

  const initialEmail = {
    email: userInfo?.email || "",
  };

  return (
    <div>
      <Formik initialValues={initialEmail} onSubmit={() => {}}>
        <Form>
          <FormInput labelText="E-mail" name="email" />
          <FormSubmitButton>Save e-mail</FormSubmitButton>
        </Form>
      </Formik>
    </div>
  );
};

export default ChangeEmailForm;
