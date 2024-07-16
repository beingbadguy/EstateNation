import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Fav = () => {
  const { userData, setUserData, setFavNo } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      return navigate("/login");
    }
  }, []);

  return (
    <div className="pb-10">
      <h1 className="text-lg font-bold p-4 ">
        Your Favourites ({userData && userData.favourites.length})
      </h1>
      <div className="flex flex-col gap-5  px-4 sm:px-6 font-bold">
        {userData.favourites &&
          userData.favourites.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-10 sm:gap-28"
            >
              <img src={item.img_url} alt={item.name} className="h-28 w-32" />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between  w-[300px]  sm:w-[900px] sm:mr-20">
                <h2>{item.name}</h2>
                <p>${item.price}/month</p>
                <p>{item.state}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Fav;
