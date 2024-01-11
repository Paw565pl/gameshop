import { ReactNode } from "react";

interface FormSubmitButtonProps {
  children: ReactNode;
}

const FormSubmitButton = ({ children }: FormSubmitButtonProps) => {
  return (
    <button type="submit" className="btn btn-block mt-3 rounded text-lg">
      {children}
    </button>
  );
};

export default FormSubmitButton;
