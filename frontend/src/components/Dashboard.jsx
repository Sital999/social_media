import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { reset, getPosts } from "../features/postSlice";
import MainPage from "../pages/MainPage";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { post, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    if (isError) {
      alert(message.data.msg);
    }
    dispatch(getPosts());
    return () => {
      dispatch(reset());
    };
  }, [isError, dispatch, message]);

  if (isLoading) {
    return (
      <div className="bg-gray-900 bg-gradient-to-tl from-cyan-900 min-h-screen text-center text-slate-200 text-3xl">
        Loading...
      </div>
    );
  }
  return (
    <>{isSuccess ? <MainPage posts={post.posts} /> : <div>No posts</div>}</>
  );
};

export default Dashboard;
