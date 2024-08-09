import { ReactNode } from "react";

export interface ToastProps {
  variant: "info" | "success" | "warning" | "error";
  children: ReactNode;
}

const Toast = ({ variant, children }: ToastProps) => {
  const variantClass = `alert alert-${variant}`; // alert-info or alert-success or alert-warning or alert-error

  return (
    <div className="toast toast-center toast-top min-w-max whitespace-break-spaces">
      <div className={variantClass}>
        <span>{children}</span>
      </div>
    </div>
  );
};

export default Toast;
