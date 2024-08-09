import { InferType, object, string } from "yup";

const changeUserPasswordSchema = object({
  currentPassword: string()
    .required("password is required")
    .trim("whitespace is not allowed")
    .min(8, "password's minimum length is 8 characters"),
  newPassword: string()
    .required("password is required")
    .trim("whitespace is not allowed")
    .min(8, "password's minimum length is 8 characters"),
});

export type ChangeUserPasswordValues = InferType<
  typeof changeUserPasswordSchema
>;

export default changeUserPasswordSchema;
