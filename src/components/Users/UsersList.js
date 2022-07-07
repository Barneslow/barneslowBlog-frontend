import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsersAction } from "../../store/usersSlices";
import LoadingSpinner from "../../utils/LoadingSpinner";
import UsersListItem from "./UsersListItem";

const UsersList = () => {
  //dispatch
  const dispatch = useDispatch();

  const users = useSelector((state) => state?.user);

  const { usersList, appErr, serverErr, loading, blocked, unblocked } = users;

  useEffect(() => {
    dispatch(fetchAllUsersAction());
  }, [blocked, unblocked]);

  return (
    <>
      <section className="py-8 bg-gray-900 min-h-screen">
        {loading ? (
          <LoadingSpinner />
        ) : appErr || serverErr ? (
          <h3 className="text-yellow-600 text-center text-lg">
            {serverErr} {appErr}
          </h3>
        ) : usersList?.length <= 0 ? (
          <h2>No User Found</h2>
        ) : (
          usersList?.map((user) => (
            <UsersListItem key={user?._id} user={user} />
          ))
        )}
      </section>
    </>
  );
};

export default UsersList;
