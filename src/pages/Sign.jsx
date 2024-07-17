import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiHomeModern } from "react-icons/hi2";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../config/firebase";
import { addDoc, doc, setDoc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { InfinitySpin } from "react-loader-spinner";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";

const Sign = () => {
  const { userData, setUserData } = useContext(AuthContext);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hide, setHide] = useState(false);
  const [type, setType] = useState(true);

  useEffect(() => {
    if (userData) {
      return navigate("/");
    }
  }, [userData, navigate]);

  const userFormHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    if (
      user.name != "" &&
      user.email != "" &&
      user.password != "" &&
      user.email.includes("@") &&
      user.password.length >= 6
    ) {
      try {
        setLoading(true);
        await createUserWithEmailAndPassword(auth, user.email, user.password);
        const userData = auth.currentUser;
        // console.log(userData);
        if (userData) {
          await setDoc(doc(firestore, "users", userData.uid), {
            name: user.name,
            email: userData.email,
            userId: userData.uid,
            properties: [],
            favourites: [],
            role: "user",
          });
        }
        console.log("user had created successfully");
        setLoading(false);
        navigate("/login");
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    } else {
      setError("Please enter all fields");
    }
  };

  return (
    <div className="min-h-[81vh] bg-slate-50 text-white  flex items-center justify-center mt-3 select-none">
      <div>
        <form
          className="flex flex-col p-4 gap-3"
          onSubmit={(e) => {
            handleCreateAccount(e);
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
          <div className="flex flex-col">
            <label className="text-black">
              Full name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={(e) => {
                userFormHandler(e);
              }}
              className="bg-white px-2 py-2 border border-black text-black  w-[300px] md:w-[400px] rounded-md "
              placeholder="Amann"
            />
          </div>
          <div className="flex flex-col">
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
              className="bg-white px-2 py-2 border border-black text-black  w-[300px] md:w-[400px] rounded-md "
              placeholder="demo@gmail.com"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-black">
              Password <span className="text-red-500">*</span>
            </label>

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
              {!hide ? (
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
              "Create Account"
            )}
          </button>
          <p className="text-red-500">{error}</p>

          <div className="text-black flex gap-2">
            <p>Already have account? </p>
            <Link to={"/login"} className=" underline">
              Log in here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sign;
