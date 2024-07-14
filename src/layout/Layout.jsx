import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { HiHomeModern } from "react-icons/hi2";
import { IoIosMenu } from "react-icons/io";

const Layout = () => {
  const [cross, setCross] = useState(true);
  const [menu, setMenu] = useState(false);
  return (
    <div className="min-h-[87vh]">
      <div>
        <div
          className={`${
            cross ? "flex" : "hidden"
          } bg-black text-sm md:text-lg text-white  gap-2 items-center justify-center p-3 `}
        >
          <p>✨Discover Your Dream Property with EstateNation</p>
          <p className="underline cursor-pointer hidden sm:flex">Learn More</p>
          <div className="absolute right-0 pr-4">
            <IoIosClose
              className="rounded-[100%]  cursor-pointer text-lg sm:text-xl md:text-2xl"
              onClick={() => {
                setCross(false);
              }}
            />
          </div>
        </div>
        <div className="flex items-center justify-between sm:justify-between mt-4 pl-6 pr-4 text-white">
          {/* logo */}
          <div className="flex items-center gap-2 ">
            <HiHomeModern className="text-yellow-500" />
            <h3>
              <Link to={"/"}>EstateNation</Link>
            </h3>
          </div>

          {/* menu bar  */}
          <div
            className={`md:flex md:items-center md:justify-between gap-10 bg-black md:bg-transparent min-h-[99vh] p-32  md:p-0 md:min-h-0  absolute md:static top-0 left-0 translate-x-[-100%] transition-all duration-500  ${
              menu
                ? "translate-x-[0%] md:translate-x-0"
                : "translate-x-[-100%] md:translate-x-0"
            } `}
          >
            <div className=" sm:block font-bold">
              <ul className="md:flex flex flex-col md:flex-row items-start justify-center gap-6 lg:gap-10 text-4xl md:text-sm">
                <p className="absolute right-16 top-10 md:hidden">
                  <IoIosClose
                    onClick={() => {
                      setMenu(false);
                    }}
                  />
                </p>
                <li>
                  <NavLink
                    to={"/"}
                    className="hover:bg-black p-2 transition-all duration-300 rounded-md"
                    onClick={() => {
                      setMenu(false);
                    }}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <Link
                    to={"/buy"}
                    className="hover:bg-black p-2 transition-all duration-300 rounded-md"
                    onClick={() => {
                      setMenu(false);
                    }}
                  >
                    Buy
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/sell"}
                    className="hover:bg-black p-2 transition-all duration-300 rounded-md"
                    onClick={() => {
                      setMenu(false);
                    }}
                  >
                    Sell
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/about"}
                    className="hover:bg-black p-2 transition-all duration-300 rounded-md"
                    onClick={() => {
                      setMenu(false);
                    }}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/services"}
                    className="hover:bg-black p-2 transition-all duration-300 rounded-md"
                    onClick={() => {
                      setMenu(false);
                    }}
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/contact"}
                    className="hover:bg-black p-2 transition-all duration-300 rounded-md"
                    onClick={() => {
                      setMenu(false);
                    }}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* login signup */}
            <div className="flex  w-[200px]  mt-10  text-xl md:text-sm md:mt-0 items-center gap-4">
              <Link
                to={"/login"}
                className="bg-purple-500 px-2 py-1 rounded-md"
                onClick={() => {
                  setMenu(false);
                }}
              >
                Login
              </Link>
              <Link
                to={"/signup"}
                className="border border-purple-500 px-2 py-1 rounded-md"
                onClick={() => {
                  setMenu(false);
                }}
              >
                Sign Up
              </Link>
            </div>
          </div>
          <div
            onClick={() => {
              setMenu(true);
            }}
            className="md:hidden"
          >
            <IoIosMenu className="text-white text-2xl" />
          </div>
        </div>
      </div>
      <Outlet />
      <div className="text-white">
        <div className="flex  p-3 gap-6 text-sm bg-black">
          <p>@2024 EstateNation.</p>
          <p className="hidden md:block">All Rights Reserved.</p>
          <p className="hidden md:block">Terms & Conditions</p>
        </div>
      </div>
    </div>
  );
};

export default Layout;
