import { useSelector, useDispatch } from "react-redux";
import { setShowComments } from "../features/modalSlice";
import { useEffect, useState } from "react";
import { addComment } from "../features/commentSlice";

const CommentPage = ({ postId }) => {
  const dispatch = useDispatch();
  const { comment, isError, isSuccess, message, isLoading } = useSelector(
    (state) => state.comment
  );

  const [text, setText] = useState("");

  //   for additon of comment when there is no comment
  const [add, setAdd] = useState(false);

  //   for addition of comment when there are comments
  const [addCommentToggle, setAddCommentToggle] = useState(false);

  useEffect(() => {
    if (isError) {
      alert(message.data.msg);
    }
  }, [isError, dispatch]);

  //   when there is no commen present
  const handleAddComment = () => {
    if (!text) {
      alert("enter comment");
    }
    const data = { postId, text };
    dispatch(addComment(data));
    setAdd(!add);
    setText("");
  };

  //   when there are comments present
  const handleAddComment2 = () => {
    if (!text) {
      alert("enter comment");
    }
    const data = { postId, text };
    dispatch(addComment(data));
    setAddCommentToggle(!addCommentToggle);
    setText("");
  };

  if (isLoading) {
    return <>Loading Comment ...</>;
  }

  return (
    <>
      {isSuccess ? (
        comment.length === 0 ? (
          // check if add button is clicked
          add ? (
            <div className="grid grid-cols-6 gap-1">
              <div className="col-start-1 col-span-5">
                <input
                  type="text"
                  placeholder="Add Comment"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="rounded-md bg-slate-200 text-gray-600 min-w-full m-2 p-2"
                />
              </div>
              <div>
                <button
                  onClick={() => handleAddComment()}
                  className="bg-gray-700 bg-gradient-to-l from-cyan-700 p-2 m-2 rounded-sm shadow-sm shadow-slate-100"
                >
                  Add
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-1">
              <div className="col-start-1 col-span-6 text-gray-300">
                <button onClick={() => dispatch(setShowComments())}>
                  No comments yet
                </button>
              </div>

              <div>
                <button
                  onClick={() => {
                    setAdd(!add);
                  }}
                  className="hover:bg-gray-700 hover:bg-gradient-to-l
                   hover:from-cyan-700 p-2 m-1 hover:rounded-sm hover:shadow-sm hover:shadow-slate-200"
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
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )
        ) : (
          <>
            {/* main section */}
            <button onClick={() => dispatch(setShowComments())}>
              {comment.map((c) => {
                return (
                  <div key={c.id}>
                    <div className="grid grid-rows-2 gap-1 justify-items-start mb-2 ">
                      <div className="rounded-sm text-lg bg-gray-700 bg-gradient-to-l from-cyan-700 text-slate-200 m-2 p-1.5 shadow-sm shadow-slate-200">
                        {c.userName}
                      </div>
                      <div className="grid grid-cols-1 p-0 m-2 min-w-full bg-slate-400 text-gray-800 rounded-md text-lg">
                        {c.body}
                      </div>
                    </div>
                  </div>
                );
              })}
            </button>

            {/* add comment check */}
            {addCommentToggle ? (
              <>
                <div className="grid grid-cols-6 gap-1">
                  <div className="col-start-1 col-span-5">
                    <input
                      type="text"
                      placeholder="Add Comment"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="rounded-md bg-slate-200 text-gray-600 min-w-full m-2 p-2"
                    />
                  </div>
                  <div>
                    <button
                      onClick={() => handleAddComment2()}
                      className="bg-gray-700 bg-gradient-to-l from-cyan-700 p-2 m-2 rounded-sm shadow-sm shadow-slate-100"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* button for addtion of comments */}
                <div className="grid grid-cols-7 gap-1">
                  <div className="col-start-7 col-span-2">
                    <button
                      onClick={() => {
                        setAddCommentToggle(!addCommentToggle);
                      }}
                      className="hover:bg-gray-700 hover:bg-gradient-to-l
                   hover:from-cyan-700 p-2 m-1 hover:rounded-sm hover:shadow-sm hover:shadow-slate-200"
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
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        )
      ) : (
        <></>
      )}
    </>
  );
};

export default CommentPage;
