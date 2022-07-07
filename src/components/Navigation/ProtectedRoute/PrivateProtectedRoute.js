import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user);

  const { userAuth } = user;

  if (!userAuth) {
    return <Navigate to="/login" />;
  }

  return userAuth ? children : <h2>Not Allowed</h2>;
};

export default PrivateProtectedRoute;

// import React from "react";
// import { useSelector } from "react-redux";
// import { Route, Navigate } from "react-router-dom";

// const PrivateProtectRoute = ({ component: Component, ...rest }) => {
//   const user = useSelector((state) => state?.users);
//   const { userAuth } = user;
//   return (
//     <Route
//       {...rest}
//       render={() =>
//         userAuth ? <Component {...rest} /> : <Navigate to="/login" />
//       }
//     />
//   );
// };

// export default PrivateProtectRoute;
