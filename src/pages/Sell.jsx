import React from "react";
import Create from "../components/Create";
import { GiBrightExplosion } from "react-icons/gi";
import { Link } from "react-router-dom";

const Sell = () => {
  return (
    <div className="min-h-[81vh] text-white">
      <div className="text-white m-10 ">
        {/* <GiBrightExplosion className="text-yellow-300 my-2 text-2xl" /> */}
        <h2 className="text-4xl font-bold">Let's Make it Happen 😍</h2>
        <p className="text-neutral-500 font-semibold w-[90%] sm:w-[60%] mt-3">
          Ready to take the first step toward your dream property? Fill out the
          form below, and our real estate wizards will work their magic to find
          your perfect match. Don't wait; let's embark on this exciting journey
          together.
        </p>
      </div>
      <div>
        <Create />
      </div>
    </div>
  );
};

export default Sell;
