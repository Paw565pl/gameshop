import FormInput from "@/app/components/common/FormInput";
import FormSubmitButton from "@/app/components/common/FormSubmitButton";
import useFetchUserInfo from "@/app/hooks/client/useFetchUserInfo";
import registerUserSchema from "@/app/schemas/registerUserSchema";
import { Form, Formik } from "formik";

const Personal = () => {
  const { data: userInfo } = useFetchUserInfo();

  const initialValues = {
    username: userInfo?.username || "",
    email: userInfo?.email || "",
    password: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerUserSchema}
      onSubmit={() => {}}
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
  );
};

export default Personal;
