import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";

const User = () => {
  const {  userData, setUserData, logoutHandle } =
    useContext(AuthContext);

  return (
    <div className="flex justify-center items-center flex-col min-h-[61vh] bg-white ">
      <h1 className="mt-10 mb-5 font-semibold">My Profile</h1>
      <div className="border flex items-center p-4 sm:gap-10 relative flex-col sm:flex-row shadow-md">
        <img
          src="./img.png"
          alt=""
          className="h-20 w-20 rounded-full"
        />
        <div className="text-center sm:text-left ">
          <p className="font-bold text-xl my-2"> {userData.name}</p>
          <p className="font-semibold">Email Address: {userData.email}</p>
        </div>

        <div className="absolute right-0 top-0 p-2">
          <Link
            to={`/`}
            className="font-bold"
                      onClick={() => {
              logoutHandle();
            }}
          >
            <IoIosLogOut className="text-xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default User;
