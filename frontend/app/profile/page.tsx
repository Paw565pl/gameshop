import PrivateRoute from "../components/common/PrivateRoute";
import Profile from "./components/Profile";

const ProfilePage = () => {
  return (
    <PrivateRoute>
      <Profile />
    </PrivateRoute>
  );
};

export default ProfilePage;
