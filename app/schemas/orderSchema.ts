import { InferType, object, string } from "yup";

const orderSchema = object({
  deliveryMethod: string().required("delivery method is required"),
  paymentMethod: string().required("payment method is required"),
  promoCode: string().trim("whitespace is not allowed"),
});

export type OrderValues = InferType<typeof orderSchema>;

export default orderSchema;
