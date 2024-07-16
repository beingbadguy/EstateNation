import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { googleProvider } from "../config/firebase";
import { auth } from "../config/firebase";
import { AuthContext } from "../context/AuthContext";
import { HiHomeModern } from "react-icons/hi2";
import { InfinitySpin } from "react-loader-spinner";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";

const Login = () => {
  const { userData, setUserData } = useContext(AuthContext);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hide, setHide] = useState(true);
  const [type, setType] = useState(true);

  useEffect(() => {
    if (userData) {
      return navigate("/");
    }
  }, [userData, navigate]);

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
    if (
      user.email != "" &&
      user.password != "" &&
      user.email.includes("@") &&
      user.password.length >= 6
    ) {
      try {
        setLoading(true);
        await signInWithEmailAndPassword(auth, user.email, user.password);
        navigate("/");
        console.log("user logged in successfully");
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    } else {
      setError("Please enter email and password");
    }
  };

  // if (userData) {
  //   return navigate("/");
  // }

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
          <div className="flex items-center relative">
            <input
              type={type ? "password" : "text"}
              name="password"
              value={user.password}
              onChange={(e) => {
                userFormHandler(e);
              }}
              className="bg-white px-2 py-2 border border-black text-black  w-[300px] md:w-[400px] rounded-md "
              placeholder="anonymous123"
            />
            {hide ? (
              <VscEyeClosed
                className="text-black absolute right-2 top-3"
                onClick={() => {
                  setHide(!hide);
                  setType(!type);
                }}
              />
            ) : (
              <VscEye
                className="text-black absolute right-2 top-3"
                onClick={() => {
                  setHide(!hide);
                  setType(!type);

                }}
              />
            )}
          </div>
          <button className="bg-purple-500 px-2 py-2 border border-black text-white  w-[300px] md:w-[400px] rounded-md text-center flex justify-center items-center">
            {loading ? (
              <InfinitySpin
                visible={true}
                width="50"
                height="50"
                color="white"
                ariaLabel="infinity-spin-loading"
              />
            ) : (
              "Login"
            )}
          </button>

          <p className="text-red-500">{error}</p>

          <div className="text-black flex gap-2">
            <p>Don't have an account? </p>
            <Link to={"/signup"} className=" underline">
              Sign up here
            </Link>
          </div>
        </form>
        {/* <p className="text-black text-center">or</p>
        <div>
          <button
            className="bg-white px-2 py-2 border border-black text-purple-500  w-[300px] md:w-[400px]  rounded-md text-center cursor-pointer"
            onClick={() => {
              handleGoogleSignIn();
            }}
          >
            login with Google
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
