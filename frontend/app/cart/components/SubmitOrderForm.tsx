/* eslint-disable jsx-a11y/label-has-associated-control */
"use client";

import Toast, { ToastProps } from "@/app/components/common/Toast";
import useCreateOrder from "@/app/hooks/client/useCreateOrder";
import orderSchema, { OrderValues } from "@/app/schemas/orderSchema";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";

const initialValues: OrderValues = {
  deliveryMethod: "",
  paymentMethod: "",
  promoCode: "",
};

const SubmitOrderForm = () => {
  const [toast, setToast] = useState<ToastProps | null>(null);
  const { mutate: createOrder } = useCreateOrder();

  const handleSubmit = (formValues: OrderValues) => {
    createOrder(formValues, {
      onSuccess: () => {
        setToast({
          variant: "success",
          children: "Order created successfully.",
        });
      },
      onError: (error) => {
        const errorsString = Array.isArray(error.response?.data)
          ? error.response?.data.join("\n")
          : "Invalid promo code.";

        setToast({
          variant: "error",
          children: errorsString,
        });
      },
    });

    setTimeout(() => setToast(null), 5000);
  };

  return (
    <section>
      {toast && <Toast variant={toast.variant}>{toast.children}</Toast>}
      <Formik
        initialValues={initialValues}
        validationSchema={orderSchema}
        onSubmit={handleSubmit}
      >
        <Form className="mt-4 flex flex-wrap justify-between px-4">
          <div>
            <h6 className="font-bold">Pick your delivery method</h6>
            <label className="label w-max cursor-pointer justify-start gap-2">
              <Field
                type="radio"
                name="deliveryMethod"
                className="radio radio-sm"
                value="INPOST"
              />
              <span className="label-text">Inpost</span>
            </label>
            <label className="label w-max cursor-pointer justify-start gap-2">
              <Field
                type="radio"
                name="deliveryMethod"
                className="radio radio-sm"
                value="DHL"
              />
              <span className="label-text">DHL</span>
            </label>
            <ErrorMessage
              name={"deliveryMethod"}
              className="text-sm text-error"
              component="p"
            />
          </div>
          <div>
            <h6 className="font-bold">Pick your payment method</h6>
            <label className="label w-max cursor-pointer justify-start gap-2">
              <Field
                type="radio"
                name="paymentMethod"
                className="radio radio-sm"
                value="BLIK"
              />
              <span className="label-text">Blik</span>
            </label>
            <label className="label w-max cursor-pointer justify-start gap-2">
              <Field
                type="radio"
                name="paymentMethod"
                className="radio radio-sm"
                value="PAYPAL"
              />
              <span className="label-text">Paypal</span>
            </label>
            <ErrorMessage
              name={"paymentMethod"}
              className="text-sm text-error"
              component="p"
            />
          </div>
          <div className="flex items-center gap-2">
            <Field
              type="text"
              name="promoCode"
              placeholder="promo code"
              className="input-base-300 input input-bordered w-full max-w-32 rounded-xl focus:border-accent focus:outline-none"
            />
            <button type="submit" className="btn btn-neutral">
              Submit order
            </button>
          </div>
        </Form>
      </Formik>
    </section>
  );
};

export default SubmitOrderForm;
