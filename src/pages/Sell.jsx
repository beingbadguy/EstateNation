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
      <div className="flex items-center flex-col md:flex-row p-8  gap-4">
        <div className="  w-[80%]">
          <h3 className="text-2xl font-bold">
            Start Your Real Estate Journey Today
          </h3>
          <p className=" w-[100%] md:w-[70%] font-semibold text-neutral-400 mt-3">
            Your dream property is just a click away. Whether you're looking for
            a new home, a strategic investment, or expert real estate advice,
            Estatein is here to assist you every step of the way. Take the first
            step towards your real estate goals and explore our available
            properties or get in touch with our team for personalized
            assistance.
          </p>
        </div>
        <div>
          <Link to={"/buy"} className="bg-purple-500 p-2 rounded-md">
            Explore Properties
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sell;
