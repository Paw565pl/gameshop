import Toast, { ToastProps } from "@/app/components/common/Toast";
import useCreateSupportTicket from "@/app/hooks/client/useCreateSupportTicket";
import supportTicketMessageSchema, {
  SupportTicketMessageValues,
} from "@/app/schemas/supportTicketMessageSchema";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { IoWarning } from "react-icons/io5";

interface SupportTicketFormProps {
  orderId: string;
}

const initialValues: SupportTicketMessageValues = {
  content: "",
};

const SupportTicketForm = ({ orderId }: SupportTicketFormProps) => {
  const [toast, setToast] = useState<ToastProps | null>(null);
  const { mutate: createSupportTicket } = useCreateSupportTicket();

  const handleSubmit = (formValues: SupportTicketMessageValues) => {
    const data = {
      orderId,
      ...formValues,
    };

    createSupportTicket(data, {
      onSuccess: () =>
        setToast({ variant: "success", children: "Support ticket created." }),
      onError: (error) => {
        const errors = error.response?.data;
        const errorsString = Array.isArray(errors) && errors.join("\n");

        setToast({ variant: "error", children: errorsString });
      },
    });

    setTimeout(() => setToast(null), 5000);
  };

  return (
    <>
      {toast && <Toast variant={toast.variant}>{toast.children}</Toast>}
      <Formik
        initialValues={initialValues}
        validationSchema={supportTicketMessageSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="flex">
            <Field
              className="textarea textarea-bordered w-full resize-none focus:border-accent focus:outline-none"
              placeholder="type your complaint here"
              as="textarea"
              name="content"
            />
            <div>
              <button
                type="submit"
                className="btn btn-outline btn-error btn-xs h-full gap-0"
              >
                <IoWarning className="text-3xl" />
                <span>Report this order</span>
              </button>
            </div>
          </div>
          <ErrorMessage
            name="content"
            className="text-xs text-error"
            component="p"
          />
        </Form>
      </Formik>
    </>
  );
};

export default SupportTicketForm;
