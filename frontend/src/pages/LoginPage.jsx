import { useState, useEffect } from "react";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../features/userSlice";
import { getPosts } from "../features/postSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.user
  );

  const [person, setPerson] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    e.preventDefault();
    setPerson({ ...person, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (person.email && person.password) {
      dispatch(login(person));
      setPerson({ email: "", password: "" });
    }
  };

  useEffect(() => {
    if (isError) {
      alert(message.data.msg);
    }
    if (isSuccess) {
      navigate("/dashboard");
      dispatch(getPosts());
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message]);

  return (
    <>
      <main className="bg-gray-900 bg-gradient-to-bl from-slate-800 min-h-screen ">
        <div className="grid grid-cols-3 gap-4  content-evenly">
          <div></div>
          <div className="bg-gray-100 rounded-2xl p-6 shadow-md shadow-slate-300">
            <h1 className="text-slate-700 text-center font-bold text-2xl">
              Login
            </h1>
            <form onSubmit={onSubmit}>
              <div className="grid grid-rows-3 gap-6">
                <div className="text-md font-bold text-slate-700 p-4">
                  <label htmlFor="email">Email: </label>
                  <input
                    className="rounded-sm bg-gray-300 ml-8 w-72 p-0.5 shadow-md shadow-neutral-400 "
                    type="email"
                    name="email"
                    value={person.email}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="text-md font-bold text-slate-700 p-4">
                  <label htmlFor="password">Password: </label>
                  <input
                    className="rounded-sm bg-gray-300 w-72 p-0.5 shadow-md shadow-neutral-400"
                    type="password"
                    name="password"
                    value={person.password}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="text-md font-bold text-slate-700 p-4">
                  <button
                    className="rounded-lg bg-slate-700 w-96 p-1 text-slate-100 shadow-lg shadow-zinc-700
                  active:bg-cyan-700 active:shadow-lg
                        transition
                        duration-150
                        ease-in-out"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div></div>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
