import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminProtectRoute = ({ children }) => {
  const user = useSelector((state) => state.user);

  const { userAuth } = user;

  if (!userAuth) {
    return <Navigate to="/" />;
  }

  return userAuth.isAdmin ? children : <h2>Not Allowed</h2>;
};

export default AdminProtectRoute;
