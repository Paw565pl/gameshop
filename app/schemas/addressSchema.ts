import { InferType, object, string } from "yup";

const addressSchema = object({
  first_name: string()
    .required("this field is required")
    .max(255, "this field is too long"),
  last_name: string()
    .required("this field is required")
    .max(255, "this field is too long"),
  phone_number: string()
    .required("this field is required")
    .matches(/^[0-9]{9}$/, "this field is not valid phone number"),
  street: string()
    .required("this field is required")
    .max(255, "this field is too long"),
  street_number: string()
    .required("this field is required")
    .max(255, "this field is too long"),
  flat_number: string().max(255, "this field is too long"),
  city: string()
    .required("this field is required")
    .max(255, "this field is too long"),
  post_code: string()
    .required("this field is required")
    .matches(/^[0-9]{2}-[0-9]{3}$/, "this field is not valid post code"),
  state: string()
    .required("this field is required")
    .max(255, "this field is too long"),
  country: string()
    .required("this field is required")
    .max(255, "this field is too long"),
});

export type AddressValues = InferType<typeof addressSchema>;

export default addressSchema;
