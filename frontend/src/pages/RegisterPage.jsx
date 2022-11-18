import { useState, useEffect } from "react";
import "../index.css";
import { register, reset } from "../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );

  const [person, setPerson] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const onChange = (e) => {
    e.preventDefault();
    setPerson({ ...person, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (person.name && person.email && person.password && person.password2) {
      if (person.password !== person.password2) {
        alert("incorrect password");
        setPerson({
          name: "",
          email: "",
          password: "",
          password2: "",
        });
      } else {
        dispatch(register(person));
        setPerson({
          name: "",
          email: "",
          password: "",
          password2: "",
        });
      }
    }
  };

  useEffect(() => {
    if (isError) {
      alert(message.data.msg);
    }

    if (isSuccess) {
      navigate("/login");
    }

    if (user) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message]);

  return (
    <>
      <main className="bg-gray-900 bg-gradient-to-bl from-slate-800 min-h-screen ">
        <div className="grid grid-cols-3 gap-4  content-evenly">
          <div></div>
          <div className="bg-gray-100 rounded-2xl p-6 shadow-md shadow-gray-200">
            <h1 className="text-slate-700 text-center font-bold text-2xl">
              Register
            </h1>
            <form onSubmit={onSubmit}>
              <div className="grid grid-rows-3 gap-6">
                <div className="text-md font-bold text-slate-700 p-4">
                  <label htmlFor="name">Name: </label>
                  <input
                    className=" bg-gray-300 ml-8 w-72 p-0.5  rounded-sm shadow-md shadow-neutral-400"
                    type="text"
                    name="name"
                    value={person.name}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="text-md font-bold text-slate-700 p-4">
                  <label htmlFor="email">Email: </label>
                  <input
                    className=" bg-gray-300 ml-8 w-72 p-0.5  rounded-sm shadow-md shadow-neutral-400"
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
                    className=" bg-gray-300 ml-8 w-72 p-0.5  rounded-sm shadow-md shadow-neutral-400"
                    type="password"
                    name="password"
                    value={person.password}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="text-md font-bold text-slate-700 p-4">
                  <label htmlFor="password">Confirm Password: </label>
                  <input
                    className=" bg-gray-300 ml-8 w-56 p-0.5  rounded-sm shadow-md shadow-neutral-400"
                    type="password"
                    name="password2"
                    value={person.password2}
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

export default RegisterPage;
