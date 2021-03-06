import { Link, useNavigate } from "react-router-dom";
import Moment from "react-moment";

import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { deleteCommmentAction } from "../../store/commentSlice";
import { useDispatch, useSelector } from "react-redux";

const CommentsList = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { comments, _id } = props;

  const comment = useSelector((state) => state.comments);
  const user = useSelector((state) => state.user);

  const { userAuth } = user;

  const isLoginUser = userAuth?._id;

  return (
    <div>
      <ul className="divide-y bg-gray-700 w-96 divide-gray-200 p-3 mt-5">
        <div className="text-gray-400">Total Comments: {comments?.length} </div>

        {comments?.length <= 0 ? (
          <h1> No Comments</h1>
        ) : (
          comments?.map((comment) => (
            <li key={comment?._id} className="py-4  w-full">
              <div className="flex space-x-3">
                <img
                  className="h-6 w-6 rounded-full"
                  src={comment?.user?.profilePhoto}
                  alt=""
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <Link to={`/profile/${comment?.user?._id}`}>
                      <h3 className="text-sm font-medium text-green-400">
                        {comment?.user?.firstName} {comment?.user?.lastName}
                      </h3>
                    </Link>

                    <p className="text-bold text-yellow-500 text-base ml-5">
                      {/* <Moment fromNow ago>
                    {comment?.createdAt}
                  </Moment> */}

                      <Moment fromNow ago>
                        {comment?.createdAt}
                      </Moment>
                    </p>
                  </div>
                  <p className="text-sm text-gray-400">
                    {comment?.description}
                  </p>
                  {/* Check if is the same user created this comment */}

                  {isLoginUser === comment?.user?._id ? (
                    <p className="flex">
                      <Link
                        to={`/update-comment/${comment?._id}`}
                        className="p-3"
                      >
                        <PencilAltIcon className="h-5 mt-3 text-yellow-300" />
                      </Link>
                      <button
                        onClick={() =>
                          dispatch(deleteCommmentAction(comment?._id))
                        }
                        className="ml-3"
                      >
                        <TrashIcon className="h-5 mt-3 text-red-600" />
                      </button>
                    </p>
                  ) : null}
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CommentsList;
