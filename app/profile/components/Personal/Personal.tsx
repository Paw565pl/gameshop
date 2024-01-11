import ChangeEmailForm from "./ChangeEmailForm";
import ChangeUsernameForm from "./ChangeUsernameForm";

const Personal = () => {
  return (
    <div className="space-y-4">
      <ChangeUsernameForm />
      <ChangeEmailForm />
    </div>
  );
};

export default Personal;
