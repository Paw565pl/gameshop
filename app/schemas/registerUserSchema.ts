import { InferType, object, string } from "yup";

const registerUserSchema = object({
  username: string()
    .trim("whitespace is not allowed")
    .required("username is required"),
  email: string()
    .trim("whitespace is not allowed")
    .required("email is required")
    .email("email is invalid"),
  password: string()
    .trim("whitespace is not allowed")
    .required("password is required")
    .min(8, "password's minimum length is 8 characters"),
});

export type RegisterUserValues = InferType<typeof registerUserSchema>;

export default registerUserSchema;
