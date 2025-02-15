import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
import { firestore } from "../config/firebase";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { IoIosReturnRight } from "react-icons/io";

const Fav = () => {
  const { userData, setUserData, setFavNo } = useContext(AuthContext);

  const navigate = useNavigate();

  const deleteFavorite = async (property) => {
    try {
      const userRef = doc(firestore, "users", userData.userId);
      await updateDoc(userRef, {
        favourites: arrayRemove(property),
      });

      setUserData((prevData) => ({
        ...prevData,
        favourites: prevData.favourites.filter((fav) => fav.id !== property.id),
      }));
      setFavNo(userData.favourites.length - 1);
      // navigate(0);
    } catch (error) {
      console.error("Error removing favorite: ", error);
    }
  };

  useEffect(() => {
    if (!userData) {
      return navigate("/login");
    }
  }, []);
  useEffect(() => {}, [setFavNo]);

  return (
    <div className="pb-10 select-none">
      <h1 className="text-lg font-bold p-4 ">
        Your Favourites ({userData && userData.favourites.length})
      </h1>
      <div className="flex flex-col gap-5  px-4 sm:px-6 font-bold">
        {userData.favourites &&
          userData.favourites.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-10 sm:gap-28 relative border-b pb-2"
            >
              <img src={item.img_url} alt={item.name} className="h-32 w-20 sm:w-32 rounded-sm" />
              <div className="flex flex-col md:flex-row sm:items-center justify-between  w-[300px]  sm:w-[900px] sm:mr-20">
                <h2>{item.name}</h2>
                <p>${item.price}/month</p>
                <p>{item.state}</p>
                <Link to={`/property/${item.id}`}>
                  <div className=" text-sm font-bold bg-purple-500 p-1 text-white rounded w-[90px] hover:bg-purple-700 duration-500 transition-all flex items-center justify-center gap-2">
                    <IoIosReturnRight />
                    <p className="">View</p>
                  </div>
                </Link>
              </div>
              <div>
                <div className="absolute right-0 top-0 p-2 bg-slate-300 hover:bg-red-300 transition-all duration-500 cursor-pointer w-8 h-8 flex justify-center items-center rounded-full">
                  <button
                    onClick={() => {
                      deleteFavorite(item);
                    }}
                    className="text-sm font-bold text-red-600"
                  >
                    <MdOutlineDelete />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Fav;
