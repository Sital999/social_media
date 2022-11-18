import React from "react";
import { logout } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, userPosts } from "../features/postSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin, user } = useSelector((state) => state.user);
  const name = isLogin ? user.name.toUpperCase() : null;
  const onLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const onLogin = () => {
    navigate("/login");
  };

  const onRegistration = () => {
    navigate("/");
  };

  const onClickHomePage = () => {
    dispatch(getPosts());
    navigate("/dashboard");
  };

  const onClickUserPage = () => {
    dispatch(userPosts());
    navigate("/userPage");
  };

  return (
    <>
      {!isLogin ? (
        <>
          <main className=" bg-gray-900 bg-gradient-to-tl from-slate-800">
            <section className="text-slate-200 text-center font-bold p-8">
              <div className="grid grid-cols-2 justify-items-end">
                <div className="text-3xl">
                  <h1>Social_Media</h1>
                </div>
                <div className="grid grid-cols-2 justify-end">
                  <div>
                    <button onClick={onLogin}>Login</button>
                  </div>
                  <div>
                    <button onClick={onRegistration}>Registration</button>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </>
      ) : (
        <>
          <main className=" bg-gray-900 bg-gradient-to-tl from-cyan-900 ">
            <section className="text-slate-200 text-center font-bold p-8">
              <div className="grid grid-cols-8 justify-items-end">
                <div className="text-2xl ">
                  <button onClick={onClickUserPage}>{name}</button>
                </div>
                <div className="text-3xl col-start-5 col-span-1">
                  <button onClick={onClickHomePage}>Social_Media</button>
                </div>
                <div className="col-start-9 text-xl">
                  <button onClick={onLogout}>LogOut</button>
                </div>
              </div>
            </section>
          </main>
        </>
      )}
    </>
  );
};

export default Header;
