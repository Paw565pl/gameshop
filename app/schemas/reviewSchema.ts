import { InferType, object, string } from "yup";

const reviewSchema = object({
  content: string()
    .required("content is required")
    .min(10, "minimum length is 10 characters")
    .max(1000, "maximum length is 1000 characters"),
  is_positive: string().required("pick like or dislike"),
});

export type ReviewValues = InferType<typeof reviewSchema>;

export default reviewSchema;
