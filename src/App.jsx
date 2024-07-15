import React, { useEffect, useState } from "react";
import Create from "./components/Create";
import { firestore } from "./config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import Features from "./components/Features";
import { FaHome } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";
import { FaBuilding } from "react-icons/fa";
import { MdPhotoCameraBack } from "react-icons/md";
import Testimonial from "./components/Testimonial";
import Faq from "./components/Faq";
import View from "./components/View";
import { IoBedSharp } from "react-icons/io5";
import { BsTextareaResize } from "react-icons/bs";
import { GiBathtub } from "react-icons/gi";

const App = () => {
  const [properties, setProperties] = useState([]);
  const fetchingData = async () => {
    try {
      const dataRef = collection(firestore, "properties");
      const dataSnapshot = await getDocs(dataRef);
      const properties = dataSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProperties(properties);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  const specData = properties.filter((property) => {
    return property.state === "Mumbai";
  });

  return (
    <div className="text-black min-h-[85vh] ">
      {/* first section  */}
      <div className=" md:hidden ml-10 mr-10 mt-10 ">
        <img src="./1.jpg" alt="" className="rounded-xl h-[350px] " />
      </div>

      <div className="flex items-center justify-between md:items-start  gap-5  md:h-[99vh] mb-10 ">
        <div className="flex items-center md:items-start  flex-col gap-5 md:mt-36 md:ml-20  mt-6 text-center md:text-left ">
          <h1 className="text-3xl md:text-6xl font-bold w-[80%] md:w-[550px]">
            Buy, rent, or sell your property easily
          </h1>
          <p className="text-xl md;w-[450px] text-neutral-500">
            A great platform to buy, sell, or even rent your properties without
            any commisions.
          </p>
          <div className="flex justify-start items-center gap-7">
            <Link
              to={"/services"}
              className="border-purple-500 text-purple-500 border px-2 py-2 rounded-md "
            >
              Learn More
            </Link>
            <Link
              to={"/buy"}
              className="bg-purple-500 text-white px-2 py-2 rounded-md"
            >
              Browse Properties
            </Link>
          </div>

          <div className="flex gap-5 mt-0 md:mt-20 flex-col md:flex-row  w-[300px] sm:[100%] ">
            <div className="bg-slate-100 p-6 rounded-xl ">
              <p className="text-3xl">200+</p>
              <p className="text-black">Happy Customers</p>
            </div>
            <div className="bg-slate-100 p-6 rounded-xl">
              <p className="text-3xl">10K+</p>
              <p className="text-black">Properties for clients</p>
            </div>
            <div className="bg-slate-100 p-6 rounded-xl">
              <p className="text-3xl">10+</p>
              <p className="text-black">Years of Experience</p>
            </div>
          </div>
        </div>
        <div
          id="map"
          className="relative h-[200px] hidden md:block rounded-xl cursor-pointer "
        >
          <img
            src="./map.png"
            alt=""
            className="mt-0 h-[650px] w-[800px] rounded"
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
      <div className="flex flex-wrap ml-5 mr-5 gap-5 items-center justify-center  border-white   p-4 rounded">
        <Features url={<FaHome />} title="Find Your Dream Home" />
        <Features url={<MdPhotoCameraBack />} title="Unlock Property Value" />
        <Features url={<FaBuilding />} title="Effortless Property Management" />
        <Features
          url={<IoSunny />}
          title="Smart Investment, Informed Decisions"
        />
      </div>

      <div className="mt-10">
        <h1 className="ml-5 text-xl font-bold">Featured Properties</h1>
        <p className="ml-5 my-2">
          Explore our handpicked selection of featured properties. Each listing
          offers a glimpse into exceptional homes and investments available
          through Estatein. Click "View" for more information.
        </p>

        <div className="flex flex-wrap items-center justify-center md:items-center md:justify-center gap-2 md:gap-10 p-2 sm:p-10 mt-5">
          {specData.map((item) => (
            <div key={item.id}>
              <div
                key={item.id}
                className="rounded-t-2xl w-[350px] sm:w-[250px] md:w-[300px] relative text-sm md:text-md "
              >
                <div className="rounded-t-xl">
                  <img
                    src={item.img_url}
                    alt=""
                    className="h-[300px] w-[530px] sm:w-[250px] md:w-[300px] rounded-t-xl"
                  />
                </div>
                <div className="bg-slate-200 text-black font-bold p-3 rounded-b-xl">
                  <p className="text-lg">
                    ${item.price}
                    <span className="text-neutral-500 text-sm">/month</span>
                  </p>
                  <p className="text-xl font-bold">{item.name}</p>
                  <p>{item.state}</p>

                  <View id={item.id} />

                  <hr className="font-bold text-red-600 h-2 border-purple-500 mt-2" />
                  <div className="flex justify-between items-center mt-1">
                    <div className="flex items-center text-md gap-2">
                      <GiBathtub />
                      {item.bathrooms}
                    </div>
                    <div className="flex items-center text-md gap-2">
                      <IoBedSharp />
                      <p>{item.bedrooms}</p>
                    </div>
                    <div className="flex items-center text-md gap-2">
                      <BsTextareaResize />
                      {item.dimension}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* testimonial section */}

      <div className="mx-10  mt-10">
        <h1 className="md:text-3xl md:ml-14 my-3">
          What people think about us?
        </h1>
        <div className="flex flex-wrap  justify-center items-center gap-5  ">
          <Testimonial />
          <Testimonial />
          <Testimonial />
          <Testimonial />
          <Testimonial />
        </div>
      </div>
      {/* faq  */}

      <div className="flex items-center justify-around mt-10 flex-col md:flex-row">
        <div className=" md:block ">
          <h1 className="text-3xl">Some Hot Burning Question?</h1>
        </div>
        <div className="ml-5 mr-5 my-5 flex flex-col gap-4">
          <Faq
            q={"How do I search for properties on EstateinNation?"}
            a={
              " Learn how to use our user-friendly search tools to find properties that match your criteria."
            }
          />
          <Faq
            q={"What documents do I need to sell my property?"}
            a={
              " Find out about the necessary documentation for listing your property with us."
            }
          />
          <Faq
            q={"How can I contact an EstateinNation agent?"}
            a={
              "Discover the different ways you can get in touch with our experienced agents."
            }
          />{" "}
          <Faq
            q={"How do I search for properties on EstateinNation?"}
            a={
              " Learn how to use our user-friendly search tools to find properties that match your criteria."
            }
          />
        </div>
      </div>

      {/* <Create /> */}
      {/* <button
        className="bg-red-600 text-black p-3"
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
