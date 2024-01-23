import { Suspense } from "react";
import RegisterForm from "./components/RegisterForm";

const RegisterPage = () => {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
};

export default RegisterPage;
