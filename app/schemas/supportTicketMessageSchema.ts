import { InferType, object, string } from "yup";

const supportTicketMessageSchema = object({
  content: string()
    .required("content is required")
    .min(10, "minimum length is 10 characters")
    .max(1000, "maximum length is 1000 characters"),
});

export type SupportTicketMessageValues = InferType<
  typeof supportTicketMessageSchema
>;

export default supportTicketMessageSchema;
