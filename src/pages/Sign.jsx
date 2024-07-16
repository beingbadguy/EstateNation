import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiHomeModern } from "react-icons/hi2";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../config/firebase";
import { addDoc, doc, setDoc } from "firebase/firestore";

const Sign = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const userFormHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, user.email, user.password);
      const userData = auth.currentUser;
      console.log(userData);
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
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-[81vh] bg-slate-50 text-white  flex items-center justify-center mt-3">
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
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={(e) => {
                userFormHandler(e);
              }}
              className="bg-white px-2 py-2 border border-black text-black  w-[300px] md:w-[400px] rounded-md "
              placeholder="anonymous123"
            />
          </div>
          <button className="bg-purple-500 px-2 py-2 border border-black text-white  w-[300px] md:w-[400px] rounded-md">
            Create account
          </button>
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
