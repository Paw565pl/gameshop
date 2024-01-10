/* eslint-disable jsx-a11y/label-has-associated-control */
"use client";

import { AuthContext } from "@/app/contexts/AuthContextProvider";
import reviewSchema, { ReviewValues } from "@/app/schemas/reviewSchema";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useContext } from "react";
import { BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";

const initialValues: ReviewValues = { content: "", is_positive: "" };

const AddReviewForm = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) return null;

  return (
    <Formik
      onSubmit={() => {}}
      initialValues={initialValues}
      validationSchema={reviewSchema}
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
  );
};

export default AddReviewForm;
