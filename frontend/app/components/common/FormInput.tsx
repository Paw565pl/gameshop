import { ErrorMessage, Field } from "formik";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  name: string;
}

const FormInput = ({ name, labelText, ...props }: InputProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{labelText}</span>
      </div>
      <Field
        {...props}
        name={name}
        className="input-base-300 input input-bordered w-full rounded-xl focus:border-accent focus:outline-none"
      />
      <ErrorMessage name={name} className="text-error" component="p" />
    </label>
  );
};

export default FormInput;
