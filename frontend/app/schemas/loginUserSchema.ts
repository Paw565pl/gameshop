import { InferType, object, string } from "yup";

const loginUserSchema = object({
  username: string()
    .trim("whitespace is not allowed")
    .required("username is required"),
  password: string()
    .required("password is required")
    .trim("whitespace is not allowed")
    .min(8, "password's minimum length is 8 characters"),
});

export type LoginUserValues = InferType<typeof loginUserSchema>;

export default loginUserSchema;
