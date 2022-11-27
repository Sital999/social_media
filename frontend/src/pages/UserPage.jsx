import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userPosts, deletePost } from "../features/postSlice";
import { useNavigate } from "react-router-dom";
import {
  setShowModal,
  setShowUpdateModal,
  setUpdate,
  setClickEllipsis,
  setShowComments,
} from "../features/modalSlice";
import Modal from "../components/Modal";
import ModalUpdate from "../components/ModalUpdate";
import { getComments } from "../features/commentSlice";

import CommentPage from "./CommentPage";

const UserPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // extracting state from global store
  const { post, isError, isSuccess, message, isLoading } = useSelector(
    (state) => state.post
  );
  const { user } = useSelector((state) => state.user);
  const { showModal, showUpdateModal, updateId, clickEllipsis, showComments } =
    useSelector((state) => state.modal);

  useEffect(() => {
    dispatch(userPosts());
  }, []);

  //   for checking errors
  useEffect(() => {
    if (isError) {
      alert(message.data.msg);
    }
    if (!user) {
      navigate("/login");
    }
  }, [isError, message, dispatch, navigate]);

  //   handling redux persist
  const postToView = isSuccess ? post.posts : null;

  const handleDelete = (postID) => {
    dispatch(setClickEllipsis());
    dispatch(deletePost(postID));
  };

  const handleEllipsis = () => {
    dispatch(setClickEllipsis());
  };

  // updating postId in global store
  const handleUpdate = (postID) => {
    dispatch(setUpdate(postID));
    dispatch(setShowUpdateModal());
  };

  const handleComment = (postId) => {
    dispatch(setShowComments());
    dispatch(getComments(postId));
    dispatch(setUpdate(postId));
  };

  if (isLoading) {
    return (
      <div className="bg-gray-900 bg-gradient-to-tl from-cyan-900 min-h-screen text-center text-slate-200 text-3xl">
        Loading...
      </div>
    );
  }

  return (
    <>
      <main className=" bg-gray-900 bg-gradient-to-tl from-cyan-900 min-h-screen">
        <section className="text-slate-200 text-center font-bold p-8">
          <div className="text-2xl">
            <div className="grid grid-cols-8 divide-x-2 divide-double">
              {/* first section ====>Add post */}
              <div className=" col-span-2 p-2">
                <button
                  onClick={() => dispatch(setShowModal())}
                  className="rounded-full bg-teal-800 p-4 shadow-md shadow-indigo-100
                  active:bg-cyan-700 active:shadow-lg
                        transition
                        duration-150
                        ease-in-out"
                >
                  Add Post
                </button>
                {/* modal for addition of post*/}
                {showModal ? (
                  <>
                    <Modal />
                  </>
                ) : null}
              </div>
              {/* second section ===> User's Post */}
              <div className="col-start-3 col-span-4 divide-y p-4 ">
                {postToView == null ? (
                  <div>Error Occured</div>
                ) : postToView.length === 0 ? (
                  <div>You haven't posted any posts yet!</div>
                ) : (
                  postToView.map((post) => {
                    return (
                      <div key={post.id}>
                        <section className="rounded-md shadow-md shadow-slate-400 bg-gray-800 text-slate-50 mb-4 p-4 ">
                          <div className="grid grid-rows-4 divide-y ">
                            <div className="row-start-1 row-span-4 ">
                              <div className="grid grid-cols-4 justify-items-start">
                                <div className="rounded-sm shadow-sm shadow-slate-100  bg-cyan-800 bg-gradient-to-r from-teal-800 p-1 font-bold">
                                  <h1>{post.userName}</h1>
                                </div>

                                {clickEllipsis === false ? (
                                  <>
                                    {/* ellipsis button */}
                                    <div className="col-start-5">
                                      <button onClick={handleEllipsis}>
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth={1.5}
                                          stroke="currentColor"
                                          className="w-6 h-6"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                  </>
                                ) : (
                                  <div className="col-start-5">
                                    {/* only showing on click of 3 dots */}
                                    <div className="grid grid-rows-2 gap-1">
                                      {/* delete icon */}

                                      <div>
                                        <button
                                          onClick={() => {
                                            handleDelete(post.id);
                                          }}
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                            />
                                          </svg>
                                        </button>
                                      </div>
                                      {/* update icon */}
                                      <div>
                                        <button
                                          onClick={() => handleUpdate(post.id)}
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                            />
                                          </svg>
                                        </button>
                                        {/* modal for update of post*/}
                                        {showUpdateModal ? (
                                          <>
                                            <ModalUpdate postId={updateId} />
                                          </>
                                        ) : null}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                              {/* main body of post */}
                              <div className="grid grid-cols-1 justify-items-center text-slate-300 text-xl">
                                <h1>{post.title.toUpperCase()}</h1>
                              </div>
                              <div className="grid grid-cols-1 justify-items-start text-slate-400 mb-4 text-lg">
                                <h4>{post.body}</h4>
                              </div>
                            </div>
                            {/* like and comment section */}
                            {showComments && updateId === post.id ? (
                              <div className="grid grid-cols-1 justify-start">
                                <CommentPage postId={updateId} />
                              </div>
                            ) : (
                              <div className="grid grid-cols-2 text-xl divide-x divide-double text-gray-400">
                                <button>like</button>
                                <button onClick={() => handleComment(post.id)}>
                                  comment
                                </button>
                              </div>
                            )}
                          </div>
                        </section>
                      </div>
                    );
                  })
                )}
              </div>
              {/* third section */}
              <div className=""></div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default UserPage;
