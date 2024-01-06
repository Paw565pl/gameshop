import { InferType, object, string } from "yup";

const loginUserSchema = object({
  username: string().required("username is required"),
  password: string()
    .required("password is required")
    .min(8, "password's minimum length is 8 characters"),
});

export type LoginUserValues = InferType<typeof loginUserSchema>;

export default loginUserSchema;
