import FormInput from "@/app/components/common/FormInput";
import FormSubmitButton from "@/app/components/common/FormSubmitButton";
import { Form, Formik } from "formik";

const ChangeUsernameForm = () => {
  const initialUsername = {
    username: "",
  };

  return (
    <div>
      <Formik initialValues={initialUsername} onSubmit={() => {}}>
        <Form>
          <FormInput labelText="Username" name="username" />
          <FormSubmitButton>Save username</FormSubmitButton>
        </Form>
      </Formik>
    </div>
  );
};

export default ChangeUsernameForm;
