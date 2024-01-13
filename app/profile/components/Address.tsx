import FormInput from "@/app/components/common/FormInput";
import FormSubmitButton from "@/app/components/common/FormSubmitButton";
import Toast, { ToastProps } from "@/app/components/common/Toast";
import addressSchema, { AddressValues } from "@/app/schemas/addressSchema";
import { Form, Formik } from "formik";
import { useState } from "react";

const Address = () => {
  const [toast, setToast] = useState<ToastProps | null>(null);

  const initialValues: AddressValues = {
    first_name: "",
    last_name: "",
    phone_number: "",
    street: "",
    street_number: "",
    flat_number: "",
    city: "",
    post_code: "",
    state: "",
    country: "",
  };

  return (
    <>
      {toast && <Toast variant={toast.variant}>{toast.children}</Toast>}
      <Formik
        initialValues={initialValues}
        validationSchema={addressSchema}
        onSubmit={() => {}}
      >
        <Form>
          <FormInput labelText="First name" name="first_name" type="text" />
          <FormInput labelText="Last name" name="last_name" type="text" />
          <FormInput labelText="Phone number" name="phone_number" type="text" />
          <FormInput labelText="Street name" name="street" type="text" />
          <div className="flex items-center gap-2">
            <FormInput
              labelText="Street number"
              name="street_number"
              type="text"
            />
            <FormInput labelText="Flat number" name="flat_number" type="text" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            <FormInput labelText="Post code" name="post_code" type="text" />
            <div className="col-span-3">
              <FormInput labelText="City" name="city" type="text" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FormInput labelText="State" name="state" type="text" />
            <FormInput labelText="Country" name="country" type="text" />
          </div>
          <FormSubmitButton>Save changes</FormSubmitButton>
        </Form>
      </Formik>
    </>
  );
};

export default Address;
