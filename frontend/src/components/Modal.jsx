import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../features/postSlice";
import { setShowModal } from "../features/modalSlice";
// import { useNavigate } from "react-router-dom";

const Modal = () => {
  const dispatch = useDispatch();

  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
  });

  const onChange = (e) => {
    e.preventDefault();
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const onClickAddPost = () => {
    if (newPost.title && newPost.body) {
      dispatch(createPost(newPost));
      setNewPost({
        title: "",
        body: "",
      });
      dispatch(setShowModal());
    } else {
      alert("fill all fields");
    }
  };

  return (
    <>
      <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-4/12 my-2 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-800 outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <div className="grid grid-cols-3 justify-center">
                <div className="col-start-2">
                  <h3 className="text-3xl font-semibold text-slate-100">
                    ADD POST
                  </h3>
                </div>
              </div>
            </div>
            {/*body*/}
            <div className="relative p-6 grid grid-rows-2 gap-4">
              <div className="">
                <input
                  type="text"
                  placeholder="Title"
                  value={newPost.title}
                  name="title"
                  onChange={onChange}
                  className="rounded-sm shadow-sm shadow-slate-100 p-2 w-8/12 text-md font-normal text-gray-900"
                />
              </div>
              <div className="break-all">
                <textarea
                  type="textarea"
                  placeholder="Body"
                  value={newPost.body}
                  name="body"
                  onChange={onChange}
                  className="rounded-sm shadow-sm shadow-slate-100 p-2 w-8/12 text-md font-normal text-gray-900"
                />
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="bg-emerald-500 text-slate-100 active:bg-emerald-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-3 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={onClickAddPost}
              >
                Add
              </button>

              <button
                className="bg-red-600 text-slate-100 active:bg-emerald-900 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => dispatch(setShowModal())}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default Modal;
