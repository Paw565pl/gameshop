"use client";

import { Field, Form, Formik } from "formik";
import { InferType, number, object } from "yup";

interface RangeFilterProps {
  title: string;
  min: number;
  max: number;
  currentMin: string;
  currentMax: string;
  handleMinChange: (value: string) => void;
  handleMaxChange: (value: string) => void;
}

const RangeFilter = ({
  title,
  min,
  max,
  currentMin,
  currentMax,
  handleMinChange,
  handleMaxChange,
}: RangeFilterProps) => {
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

  type RangeFilterValues = InferType<typeof validationSchema>;

  const initialValues = {
    minValue: currentMin ? parseInt(currentMin) : undefined,
    maxValue: currentMax ? parseInt(currentMax) : undefined,
  };

  const handleSubmit = (formValues: RangeFilterValues) => {
    const { minValue, maxValue } = formValues;

    handleMinChange(minValue?.toString() || "");
    handleMaxChange(maxValue?.toString() || "");
  };

  return (
    <div className="mb-4">
      <h4 className="mb-1 text-center text-sm">{title}</h4>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
            <button type="submit" className="hidden"></button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RangeFilter;
