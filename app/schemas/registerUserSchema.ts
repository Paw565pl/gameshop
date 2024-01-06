import { InferType, object, string } from "yup";

const registerUserSchema = object({
  username: string().required("username is required"),
  email: string().required("email is required").email("email is invalid"),
  password: string()
    .required("password is required")
    .min(8, "password's minimum length is 8 characters"),
});

export type RegisterUserValues = InferType<typeof registerUserSchema>;

export default registerUserSchema;
