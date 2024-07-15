import React from "react";
import Create from "./components/Create";
import { firestore } from "./config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import Features from "./components/Features";
import { FaHome } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";
import { FaBuilding } from "react-icons/fa";
import { MdPhotoCameraBack } from "react-icons/md";

const App = () => {
  const fetchingData = async () => {
    try {
      const dataRef = collection(firestore, "properties");
      const dataSnapshot = await getDocs(dataRef);
      const properties = dataSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(properties);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="text-white min-h-[85vh]">
      {/* first section  */}
      <div className=" md:hidden ml-10 mr-10 mt-10 ">
        <img src="./1.jpg" alt="" className="rounded-xl " />
      </div>

      <div className="flex items-center md:items-start  gap-5  md:h-[99vh] mb-5 ">
        <div className="flex items-center md:items-start  flex-col gap-5 md:mt-36 md:ml-20  mt-6 text-center md:text-left ">
          <h1 className="text-4xl md:text-5xl font-bold w-[80%] md:w-[550px]">
            Buy, rent, or sell your property easily
          </h1>
          <p className="text-1xl md;w-[450px] text-neutral-400">
            A great platform to buy, sell, or even rent your properties without
            any commisions.
          </p>
          <div className="flex justify-start items-center gap-7">
            <Link
              to={"/services"}
              className="border-purple-500 border px-2 py-1 rounded-md"
            >
              Learn More
            </Link>
            <Link to={"/buy"} className="bg-purple-500 px-2 py-1 rounded-md">
              Browse Properties
            </Link>
          </div>

          <div className="flex gap-5 mt-0 md:mt-20 flex-col md:flex-row  w-[300px] sm:[100%] ">
            <div className="bg-neutral-800 p-6">
              <p className="text-2xl">200+</p>
              <p className="text-neutral-400">Happy Customers</p>
            </div>
            <div className="bg-neutral-800 p-6">
              <p className="text-2xl">10K+</p>
              <p className="text-neutral-400">Properties for clients</p>
            </div>
            <div className="bg-neutral-800 p-6">
              <p className="text-2xl">10+</p>
              <p className="text-neutral-400">Years of Experience</p>
            </div>
          </div>
        </div>
        <div
          id="map"
          className="relative h-[200px] hidden md:block rounded-xl cursor-pointer"
        >
          <img
            src="./map.png"
            alt=""
            className="mt-10 h-[650px] w-[800px] rounded"
          />
          <div className="absolute left-10 top-20 hidden lg:block  ">
            <img src="./Property.png" alt="" className="rounded-xl h-[300px]" />
          </div>
          <div className="absolute left-[400px] top-20 hidden lg:block   ">
            <img src="./12.png" alt="" className="rounded-xl h-[300px]" />
          </div>
          <div className="absolute left-[400px] top-[355px] hidden lg:block    ">
            <img src="./2.png" alt="" className="rounded-xl h-[300px]" />
          </div>
        </div>
      </div>

      {/* second section  */}
      <div className="flex flex-wrap ml-5 mr-5 gap-5 items-center justify-center ">
        <Features url={<FaHome />} title="Find Your Dream Home" />
        <Features url={<MdPhotoCameraBack />} title="Unlock Property Value" />
        <Features url={<FaBuilding />} title="Effortless Property Management" />
        <Features
          url={<IoSunny />}
          title="Smart Investment, Informed Decisions"
        />
      </div>

      {/* <Create /> */}
      {/* <button
        className="bg-red-600 text-white p-3"
        onClick={() => {
          fetchingData();
        }}
      >
        FetchData
      </button> */}
    </div>
  );
};

export default App;
