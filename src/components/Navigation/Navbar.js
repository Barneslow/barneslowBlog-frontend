import PublicNavbar from "./Public/PublicNavbar";
import PrivateNavbar from "./Private/PrivateNavbar";
import AdminNavbar from "./Admin/AdminNavbar";
import { useSelector } from "react-redux";
import AccountVerificationAlert from "./Alert/AccountVerificationAlert";
import AccountVerificationSuccess from "../Account/AccountVerficationSuccess";

const NavBar = () => {
  const user = useSelector((state) => state?.user);
  const { userAuth } = user;
  const isAdmin = userAuth?.isAdmin;

  const account = useSelector((state) => state?.account);

  const { token, appError, serverError, loading } = account;

  return (
    <>
      {isAdmin ? (
        <>
          <AdminNavbar isLogin={userAuth} />
          {!userAuth?.isVerified && <AccountVerificationAlert />}
        </>
      ) : userAuth ? (
        <>
          <PrivateNavbar isLogin={userAuth} />
          {!userAuth?.isVerified && <AccountVerificationAlert />}
        </>
      ) : (
        <PublicNavbar />
      )}
      {loading && <h2 className="text-center">Loading Please Wait</h2>}
      {token && <AccountVerificationSuccess />}
      {appError ||
        (serverError && (
          <h2 className="text-red-400 text-center">
            {appError} {serverError}
          </h2>
        ))}
    </>
  );
};

export default NavBar;
