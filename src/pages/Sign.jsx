import React, { useState } from "react";
import { Link } from "react-router-dom";

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
  console.log(user);
  return (
    <div className="min-h-[81vh] bg-slate-50 text-white  flex items-center justify-center mt-3">
      <div>
        <form className="flex flex-col p-4 gap-3">
          <div className="text-center ">
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
              className="bg-white px-2 py-2 border border-black text-black w-[400px] rounded-md "
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
              className="bg-white px-2 py-2 border border-black text-black w-[400px] rounded-md "
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
              className="bg-white px-2 py-2 border border-black text-black w-[400px] rounded-md "
              placeholder="anonymous123"
            />
          </div>
          <button className="bg-purple-500 px-2 py-2 border border-black text-white w-[400px] rounded-md">
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
