import { ReactNode } from "react";

interface ToastProps {
  variant: "info" | "success" | "warning" | "error";
  children: ReactNode;
}

const Toast = ({ variant, children }: ToastProps) => {
  return (
    <div className="toast toast-center toast-top">
      <div className={`alert alert-${variant}`}>
        <span>{children}</span>
      </div>
    </div>
  );
};

export default Toast;
