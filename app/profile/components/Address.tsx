import FormInput from "@/app/components/common/FormInput";
import FormSubmitButton from "@/app/components/common/FormSubmitButton";
import Toast, { ToastProps } from "@/app/components/common/Toast";
import useCreateOrUpdateUserAddress from "@/app/hooks/client/useCreateOrUpdateUserAddress";
import useFetchUserAddress from "@/app/hooks/client/useFetchUserAddress";
import addressSchema, { AddressValues } from "@/app/schemas/addressSchema";
import { Form, Formik } from "formik";
import { useState } from "react";

const Address = () => {
  const [toast, setToast] = useState<ToastProps | null>(null);
  const { data: userAddress, isFetching } = useFetchUserAddress();
  const { mutate: createOrUpdateUserAddress } = useCreateOrUpdateUserAddress();

  if (isFetching) return <p>Loading...</p>;

  const initialValues: AddressValues = {
    first_name: userAddress?.first_name || "",
    last_name: userAddress?.last_name || "",
    phone_number: userAddress?.phone_number || "",
    street: userAddress?.street || "",
    street_number: userAddress?.street_number || "",
    flat_number: userAddress?.flat_number || "",
    city: userAddress?.city || "",
    post_code: userAddress?.post_code || "",
    state: userAddress?.state || "",
    country: userAddress?.country || "",
  };

  const handleSubmit = (formValues: AddressValues) => {
    createOrUpdateUserAddress(formValues, {
      onSuccess: () =>
        setToast({ variant: "success", children: "Address saved." }),
      onError: () =>
        setToast({ variant: "error", children: "Something went wrong." }),
    });

    setTimeout(() => setToast(null), 5000);
  };

  return (
    <>
      {toast && <Toast variant={toast.variant}>{toast.children}</Toast>}
      <Formik
        initialValues={initialValues}
        validationSchema={addressSchema}
        onSubmit={handleSubmit}
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
