"use client";

import { Field, Form, Formik } from "formik";
import { number, object } from "yup";

interface RangeFilterProps {
  title: string;
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
}

const initialValues = {
  minValue: "",
  maxValue: "",
};

const RangeFilter = ({ title, min, max, onChange }: RangeFilterProps) => {
  const validationSchema = object({
    minValue: number()
      .typeError("input must be number")
      .integer("input must be integer number")
      .positive("input must be positive")
      .min(min, `input must be greater than ${min}`),
    maxValue: number()
      .typeError("input must be number")
      .integer("input must be integer number")
      .positive("input must be positive")
      .max(max, `input must be lesser than ${max}`),
  });

  return (
    <div className="mb-4">
      <h4 className="mb-1 text-center text-sm">{title}</h4>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        {({ errors }) => (
          <Form>
            <div className="flex justify-between">
              <Field
                name="minValue"
                type="text"
                placeholder="Min"
                className="input-base-300 input input-bordered input-sm w-full rounded text-center focus:border-accent focus:outline-none"
              />
              <span className="mx-1">-</span>
              <Field
                name="maxValue"
                type="text"
                placeholder="Max"
                className="input-base-300 input input-bordered input-sm w-full rounded text-center focus:border-accent focus:outline-none"
              />
            </div>
            <div className="text-center text-xs text-error">
              {errors && Object.values(errors)[0]}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RangeFilter;
