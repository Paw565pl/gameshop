import { ReactNode } from "react";

export interface ToastProps {
  variant: "info" | "success" | "warning" | "error";
  children: ReactNode;
}

const Toast = ({ variant, children }: ToastProps) => {
  const variantClass = `alert-${variant}`;

  return (
    <div className="toast toast-center toast-top min-w-max whitespace-break-spaces">
      <div className={`alert ${variantClass}`}>
        <span>{children}</span>
      </div>
    </div>
  );
};

export default Toast;
