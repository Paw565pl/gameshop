/* eslint-disable jsx-a11y/label-has-associated-control */
"use client";

import Toast, { ToastProps } from "@/app/components/common/Toast";
import { AuthContext } from "@/app/contexts/AuthContextProvider";
import useAddGameReview from "@/app/hooks/client/useAddGameReview";
import reviewSchema, { ReviewValues } from "@/app/schemas/reviewSchema";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useContext, useState } from "react";
import { BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";

interface AddReviewFormProps {
  gameId: number;
}

const initialValues: ReviewValues = { content: "", is_positive: "" };

const AddReviewForm = ({ gameId }: AddReviewFormProps) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [toast, setToast] = useState<ToastProps | null>(null);
  const { mutate: addReview } = useAddGameReview(gameId);

  if (!isAuthenticated) return null;

  const handleSubmit = (formValues: ReviewValues) => {
    addReview(formValues, {
      onError: (error) => {
        const errorText = error.response?.data as string[];
        if (error.response?.status === 400)
          setToast({ variant: "error", children: errorText[0] });
        else {
          setToast({
            variant: "error",
            children: "Something went wrong. Please try again later.",
          });
        }
      },
      onSuccess: () => {
        setToast({
          variant: "success",
          children: "Your review has been added.",
        });
      },
    });

    setTimeout(() => setToast(null), 5000);
  };

  return (
    <section>
      {toast && <Toast variant={toast.variant}>{toast.children}</Toast>}
      <h2 className="mt-6 flex justify-between text-xl font-semibold">
        Reviews
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={reviewSchema}
        onSubmit={handleSubmit}
      >
        <Form className="my-4 px-1">
          <div>
            <Field
              className="textarea textarea-bordered w-full resize-none focus:border-accent focus:outline-none"
              placeholder="type your review here"
              as="textarea"
              name="content"
            />
            <ErrorMessage name="content" className="text-error" component="p" />
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-1">
              <label>
                <Field
                  type="radio"
                  name="is_positive"
                  id="like"
                  className="peer hidden"
                  value="true"
                />
                <BiSolidLike className="cursor-pointer text-xl peer-checked:text-success" />
              </label>
              <label>
                <Field
                  type="radio"
                  name="is_positive"
                  id="dislike"
                  className="peer hidden"
                  value="false"
                />
                <BiSolidDislike className="cursor-pointer text-xl peer-checked:text-error" />
              </label>
              <ErrorMessage
                name="is_positive"
                className="text-error"
                component="span"
              />
            </div>
            <button type="submit" className="btn btn-outline btn-sm">
              <FaPlus /> Add
            </button>
          </div>
        </Form>
      </Formik>
    </section>
  );
};

export default AddReviewForm;
