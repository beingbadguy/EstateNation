import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { HiHomeModern } from "react-icons/hi2";
import { IoIosMenu } from "react-icons/io";
import { FaTelegramPlane } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import ScrollToTop from "../components/ScrollTop";
import { CiUser } from "react-icons/ci";
import { AuthContext } from "../context/AuthContext";
import { auth, firestore } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { CiHeart } from "react-icons/ci";
import { ImUser } from "react-icons/im";

const Layout = () => {
  let { userData, setUserData, logoutHandle, favno, setFavNo } =
    useContext(AuthContext);

  const fetchUser = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const DocRef = doc(firestore, "users", user.uid);
        const docSnap = await getDoc(DocRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
          setFavNo(docSnap.data().favourites.length);
          // console.log(docSnap.data());
        } else {
          console.log("user is not logged in ");
        }
      } else {
        console.log("not getting data, user is not logged in ");
      }
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const [cross, setCross] = useState(true);
  const [menu, setMenu] = useState(false);
  return (
    <div className=" bg-slate-50">
      <ScrollToTop />
      <div>
        <div
          className={`${
            cross ? "flex" : "hidden"
          } bg-white   text-black  gap-2 items-center justify-center p-3 border-b `}
        >
          <p className="text-[13px] sm:text-md">
            ✨Discover Your Dream Property with EstateNation
          </p>
          <p className=" text-[13px] sm:text-md underline cursor-pointer hidden sm:flex">
            <Link to={"/about"} className="text-purple-500">
              Learn More{" "}
            </Link>
          </p>
          <div className="absolute right-1 top-3 ">
            <IoIosClose
              className="rounded-[100%] text-red-500  cursor-pointer text-xl  sm:text-xl md:text-2xl"
              onClick={() => {
                setCross(false);
              }}
            />
          </div>
        </div>
        <div className=" flex items-center justify-between py-4  px-6  text-black bg-slate-100 ">
          {/* logo */}
          <div className="flex items-center gap-2 ">
            <HiHomeModern className="text-purple-500" />
            <h3>
              <Link to={"/"} className="font-bold">
                EstateNation
              </Link>
            </h3>
          </div>

          {/* menu bar  */}
          <div
            className={`md:flex md:items-center justify-center md:justify-between gap-10  bg-slate-200 md:bg-transparent min-h-[100vh] p-20  md:p-0 md:min-h-0  fixed md:static top-0 left-0 translate-x-[-100%] transition-all duration-500 z-[999]   ${
              menu
                ? "translate-x-[0%] md:translate-x-0"
                : "translate-x-[-100%] md:translate-x-0"
            } `}
          >
            <div className=" sm:block font-bold ">
              <ul className="md:flex flex flex-col  md:flex-row items-center justify-center gap-6 lg:gap-10 text-4xl md:text-sm mt-20 md:mt-0">
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
                    className={({ isActive }) =>
                      isActive
                        ? "bg-purple-500 text-white p-2 transition-all duration-300 rounded-md"
                        : "hover:bg-purple-500 hover:text-white p-2 transition-all duration-300 rounded-md"
                    }
                    onClick={() => {
                      setMenu(false);
                    }}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/buy"}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-purple-500 text-white p-2 transition-all duration-300 rounded-md"
                        : "hover:bg-purple-500 hover:text-white p-2 transition-all duration-300 rounded-md"
                    }
                    onClick={() => {
                      setMenu(false);
                    }}
                  >
                    Buy
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/sell"}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-purple-500 text-white p-2 transition-all duration-300 rounded-md"
                        : "hover:bg-purple-500 hover:text-white p-2 transition-all duration-300 rounded-md"
                    }
                    onClick={() => {
                      setMenu(false);
                    }}
                  >
                    Sell
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/about"}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-purple-500 text-white p-2 transition-all duration-300 rounded-md"
                        : "hover:bg-purple-500 hover:text-white p-2 transition-all duration-300 rounded-md"
                    }
                    onClick={() => {
                      setMenu(false);
                    }}
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/services"}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-purple-500 text-white p-2 transition-all duration-300 rounded-md"
                        : "hover:bg-purple-500 hover:text-white p-2 transition-all duration-300 rounded-md"
                    }
                    onClick={() => {
                      setMenu(false);
                    }}
                  >
                    Services
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/contact"}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-purple-500 text-white p-2 transition-all duration-300 rounded-md"
                        : "hover:bg-purple-500 hover:text-white p-2 transition-all duration-300 rounded-md"
                    }
                    onClick={() => {
                      setMenu(false);
                    }}
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex items-center gap-2 px-2 ">
            {userData ? (
              <div className="flex gap-2">
                <Link to={`/favourites`} className="font-bold relative">
                  <CiHeart className="text-xl md:text-2xl" />
                  <p className="text-[10px] absolute top-[-4px] right-0 font-bold bg-slate-100  text-red-500">
                    {favno}
                  </p>
                </Link>
                <Link to={`/user`} className="font-bold">
                  <ImUser className="text-2xl" />
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2 ">
                <Link to={`/favourites`} className="font-bold">
                  <CiHeart className="text-xl md:text-2xl" />

                  <p
                    className={` ${
                      favno === 0 ? "hidden" : "block"
                    } text-[10px] absolute top-[-4px] right-0 font-bold bg-slate-100  text-red-500"`}
                  >
                    {favno}
                  </p>
                </Link>
                <div className="flex">
                  <div className="md:hidden">
                    <Link to={`/login`} className="font-bold">
                      <CiUser className="text-xl" />
                    </Link>
                  </div>
                </div>
                <div className=" hidden md:flex   mt-10   text-md md:mt-0 items-center gap-4">
                  <Link
                    to={"/login"}
                    className="bg-purple-500 text-white px-2 py-1 rounded-md"
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
            )}

            <div
              onClick={() => {
                setMenu(true);
              }}
              className="md:hidden"
            >
              <IoIosMenu className="text-black text-2xl" />
            </div>
          </div>

          {/* <div>
            {user ? (
              <div className="flex ">
                <Link to={"/login"} className="font-bold">
                  <CiUser />
                </Link>
              </div>
            ) : (
              
            )}
          </div> */}

          {/* login signup */}
        </div>
      </div>

      {/* outlet  */}
      <Outlet />
      {/* outlet  */}

      <div className="flex p-5 md:items-center justify-start md:justify-center flex-col md:flex-row md:p-8  gap-4 pb-5">
        <div className=" md:w-[80%]">
          <h3 className="text-3xl font-bold text-black">
            Start Your Real Estate Journey Today
          </h3>
          <p className=" w-[100%] md:w-[70%]  text-neutral-400 mt-3">
            Your dream property is just a click away. Whether you're looking for
            a new home, a strategic investment, or expert real estate advice,
            Estatein is here to assist you every step of the way. Take the first
            step towards your real estate goals and explore our available
            properties or get in touch with our team for personalized
            assistance.
          </p>
        </div>
        <div>
          <Link
            to={"/buy"}
            className="border-purple-500 border p-2 rounded-md text-purple-500"
          >
            Explore Properties
          </Link>
        </div>
      </div>
      <div className="text-white bg-purple-500 p-4">
        <div className="flex flex-wrap sm:justify-evenly p-4 ml-8 items-start gap-5 ">
          <div className="flex flex-col  gap-3">
            <div className="flex items-center gap-2">
              <HiHomeModern className="text-yellow-500" />
              <p>EstateNation</p>
            </div>
            <form className="flex items-center bg-white rounded-xl text-black p-2">
              {/* <FaMessage /> */}
              <input
                type="email"
                className="px-2 font-bold outline-none"
                placeholder="Enter your email "
              />
              <button>
                <FaTelegramPlane className="pr-1" />
              </button>
            </form>
          </div>
          <div className="flex flex-wrap gap-10 ">
            <ul>
              <li className="font-bold my-3">Home</li>
              <li>Hero section</li>
              <li>Features</li>
            </ul>
            <ul>
              <li className="font-bold my-3">About Us</li>
              <li>Our Works</li>
              <li>Our Story</li>
            </ul>
            <ul>
              <li className="font-bold my-3">Properties</li>
              <li>Portfolio</li>
              <li>Categories</li>
            </ul>
            <ul>
              <li className="font-bold my-3">Services</li>
              <li>Valuation mastery</li>
              <li>Strategic marketing</li>
            </ul>
            <ul>
              <li className="font-bold my-3">Contact Us</li>
              <li>Contact Form </li>
              <li>our Offices</li>
            </ul>
          </div>
        </div>
        <div className="flex  p-3 gap-6  bg-purple-500">
          <p>@2024 EstateNation.</p>
          <p className="hidden md:block">All Rights Reserved.</p>
          <p className="hidden md:block">Terms & Conditions</p>
        </div>
      </div>
    </div>
  );
};

export default Layout;
