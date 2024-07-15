import React, { useState, useEffect } from "react";
import { firestore } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { MdBathroom } from "react-icons/md";
import { IoBedSharp } from "react-icons/io5";
import { GiBathtub } from "react-icons/gi";
import { BsTextareaResize } from "react-icons/bs";
import { VscCallOutgoing } from "react-icons/vsc";
import { IoIosMail } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import View from "../components/View";
import { useNavigate } from "react-router-dom";

const Buy = () => {
  const [property, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

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

  const NewfilterdData = property.filter((value) => {
    return value.state.toLowerCase() == search;
  });
  useEffect(() => {}, [setFilteredData]);

  return (
    <div className="min-h-[81vh] text-black">
      <div className="ml-8 mt-8">
        <h2 className="text-3xl font-bold">Find Your Dream Properly ❤️</h2>
        <p className="text-neutral-600  w-[90%] sm:w-[60%] mt-3">
          Welcome to Estatein, where your dream property awaits in every corner
          of our beautiful world. Explore our curated selection of properties,
          each offering a unique story and a chance to redefine your life. With
          categories to suit every dreamer, your journey
        </p>
      </div>
      <div className="mt-6 flex items-center gap-5 ml-[10%]  md:w-[80%] text-black rounded">
        <input
          type="text"
          className=" p-3 border-2 border-purple-500 text-black w-[90%] font-bold rounded-md outline-none"
          placeholder="Enter State or City (e.g mumbai)"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value.toLowerCase());
          }}
        />
        <CiSearch
          className=" bg-purple-500 p-2 cursor-pointer rounded-xl text-5xl mr-10 md:mr-0 md:ml-10 text-white"
          onClick={() => {
            if (search === "") {
              alert("Please enter a state");
            } else {
              // console.log(NewfilterdData);
              setFilteredData(NewfilterdData);
              NewfilterdData < 1
                ? setError("No properties found in this state or city.")
                : setError("");
            }
            setSearch("");
          }}
        />
      </div>
      <div>
        <p className="ml-8 font-bold mt-10 text-red-500"> {error}</p>

        {filteredData && filteredData.length >= 1 ? (
          <p className="ml-8 font-bold mt-10 text-green-600">
            {filteredData.length} properties found.
          </p>
        ) : (
          ""
        )}

        <div className="flex flex-wrap items-center justify-center md:items-center md:justify-center md:gap-10 mt-4 gap-2  sm:mb-5">
          {filteredData &&
            filteredData.map((item) => (
              <div key={item.id}>
                <div
                  key={item.id}
                  className="rounded-t-2xl w-[200px] sm:w-[250px] md:w-[300px] relative text-sm md:text-md "
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

      <div className="ml-8 mt-0">
        <h2 className="text-3xl font-bold">
          Discover a World of Possibilities 🔥
        </h2>
        <p className="text-neutral-600  w-[90%] sm:w-[60%] mt-3">
          Our portfolio of properties is as diverse as your dreams. Explore the
          following categories to find the perfect property that resonates with
          your vision of home
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center md:items-center md:justify-center gap-2 md:gap-10 p-2 sm:p-10 mt-5">
        {property.map((item) => (
          <div key={item.id}>
            <div
              key={item.id}
              className="rounded-t-2xl w-[200px] sm:w-[250px] md:w-[300px] relative text-sm md:text-md "
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
  );
};

export default Buy;
