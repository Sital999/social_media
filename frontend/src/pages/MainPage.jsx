import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchPosts } from "../features/postSlice";
import { setShowComments, setUpdate } from "../features/modalSlice";
import { getComments } from "../features/commentSlice";
import CommentPage from "./CommentPage";

const MainPage = ({ posts }) => {
  const dispatch = useDispatch();
  const { post, isError, isSuccess, message } = useSelector(
    (state) => state.post
  );
  const { showComments, updateId } = useSelector((state) => state.modal);

  // name of user to search
  const [name, setName] = useState("");

  const postToView = isSuccess ? post.posts : posts.posts;

  useEffect(() => {
    if (isError) {
      alert(message.data.msg);
    }
  }, [isError, message, isSuccess]);

  // text area change for name
  const onChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const onClickSearch = () => {
    dispatch(searchPosts(name));
  };

  // handle comment button
  const handleComment = (postId) => {
    dispatch(setShowComments());
    dispatch(getComments(postId));
    // for passing post id value  to Component Page
    dispatch(setUpdate(postId));
  };

  return (
    <>
      <main className=" bg-gray-900 bg-gradient-to-tl from-cyan-900 min-h-screen">
        <section className="text-slate-200 text-center font-bold p-8">
          <div className="text-2xl">
            {/* col - 8 divided in 3 parts */}
            <div className="grid grid-cols-8 divide-x-2 divide-double">
              {/* first part for search section */}
              <div className=" col-span-2 p-2">
                <form>
                  <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                      </svg>
                    </div>
                    <input
                      type="search"
                      value={name}
                      onChange={onChange}
                      className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Friends..."
                      required
                    />
                    <button
                      type="submit"
                      onClick={onClickSearch}
                      className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>
              {/* second section */}
              <div className="col-start-3 col-span-4 divide-y p-4 ">
                {postToView.length == 0 ? (
                  <>No post to show</>
                ) : (
                  postToView.map((post) => {
                    return (
                      <div key={post.id}>
                        <section className="rounded-md shadow-md shadow-slate-400 bg-gray-800 text-slate-50 mb-4 p-4">
                          <div className="grid grid-rows-4 divide-y ">
                            <div className="row-start-1 row-span-4 ">
                              <div className="grid grid-cols-1 justify-items-start">
                                <div className="rounded-sm shadow-sm shadow-slate-100  bg-cyan-800 bg-gradient-to-r from-teal-800 p-1 font-bold">
                                  <h1>{post.userName}</h1>
                                </div>
                              </div>
                              <div className="grid grid-cols-1 justify-items-center text-slate-300 text-xl">
                                <h1>{post.title.toUpperCase()}</h1>
                              </div>
                              <div className="grid grid-cols-1 justify-items-start text-slate-400 mb-4 text-lg">
                                <h4>{post.body}</h4>
                              </div>
                            </div>
                            {showComments ? (
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

export default MainPage;
