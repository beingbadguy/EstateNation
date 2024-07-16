import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { googleProvider } from "../config/firebase";
import { auth } from "../config/firebase";
import { AuthContext } from "../context/AuthContext";
import { HiHomeModern } from "react-icons/hi2";

const Login = () => {
  const {  userData, setUserData } = useContext(AuthContext);
  // console.log(isAuth);

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const userFormHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);
      console.log("user has been logged in with google");
     

      navigate("/");
    } catch (error) {
      console.error("Error signing in with Google: ", error);
      console.log(error);
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, user.email, user.password);
      navigate("/");
      console.log("user logged in successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-[81vh] bg-slate-50 text-white  flex items-center justify-center mt-3">
      <div className="flex items-center flex-col">
        <form
          className="flex flex-col p-4 gap-3"
          onSubmit={(e) => {
            handleLogin(e);
          }}
        >
          <div className="text-center flex flex-col justify-center items-center ">
            <HiHomeModern className="text-purple-500 text-4xl text-center" />
            <h1 className="text-black font-bold">
              Welcome To the EstateNation
            </h1>
            <p className="text-neutral-500 font-semibold">
              We're a team that guides each other.
            </p>
          </div>

          <div className="flex flex-col mt-10">
            <label className="text-black">
              Email address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={(e) => {
                userFormHandler(e);
              }}
              className="bg-white px-2 py-2 border border-black text-black w-[300px] md:w-[400px]  rounded-md "
              placeholder="demo@gmail.com"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-black">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={(e) => {
                userFormHandler(e);
              }}
              className="bg-white px-2 py-2 border border-black text-black w-[300px] md:w-[400px]  rounded-md "
              placeholder="anonymous123"
            />
          </div>
          <button className="bg-purple-500 px-2 py-2 border border-black text-white  w-[300px] md:w-[400px]  rounded-md">
            Login
          </button>

          <div className="text-black flex gap-2">
            <p>Don't have an account? </p>
            <Link to={"/signup"} className=" underline">
              Sign up here
            </Link>
          </div>
        </form>
        <p className="text-black text-center">or</p>
        <div>
          <button
            className="bg-white px-2 py-2 border border-black text-purple-500  w-[300px] md:w-[400px]  rounded-md text-center cursor-pointer"
            onClick={() => {
              handleGoogleSignIn();
            }}
          >
            login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
