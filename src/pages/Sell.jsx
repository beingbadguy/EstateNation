import React, { useContext, useEffect } from "react";
import Create from "../components/Create";
import { GiBrightExplosion } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Sell = () => {
  const navigate = useNavigate();

  let { userData, setUserData, logoutHandle } = useContext(AuthContext);

  useEffect(() => {
    if (!userData) {
      return navigate("/login");
    }
  }, []);

  return (
    <div className="min-h-[81vh] text-black">
      <div className="text-black m-10 ">
        <h2 className="text-4xl font-bold">Let's Make it Happen 😍</h2>
        <p className="text-neutral-500 font-semibold w-[90%] sm:w-[60%] mt-3">
          Ready to take the first step toward your dream property? Fill out the
          form below, and our real estate wizards will work their magic to find
          your perfect match. Don't wait; let's embark on this exciting journey
          together.
        </p>
      </div>
      <div>
        <Create userData={userData} />
      </div>
    </div>
  );
};

export default Sell;
