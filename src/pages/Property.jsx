import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdArrowLeft } from "react-icons/md";
import { IoBedSharp } from "react-icons/io5";
import { GiBathtub } from "react-icons/gi";
import { MdLocalPhone } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { getDoc, doc, updateDoc, addDoc } from "firebase/firestore";
import { firestore } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import View from "../components/View";
import { BsTextareaResize } from "react-icons/bs";
// import Rating from "../components/Rating";
import { MdLocationOn } from "react-icons/md";
import { RxDimensions } from "react-icons/rx";
import { MdOutlineAttachMoney } from "react-icons/md";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { AuthContext } from "../context/AuthContext";
import { FaHeart } from "react-icons/fa";

const Property = () => {
  const { userData } = useContext(AuthContext);

  const { id } = useParams();
  const [property, setProperties] = useState([]);

  const [product, setProduct] = useState(null);
  const [currentUrl, setCurrentUrl] = useState();

  const [fav, setFav] = useState([]);
  const [heart, setHeart] = useState(false);

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
  }, [id]);

  const filteredData = property.filter((item) => item.id != id);

  const productFetch = async () => {
    try {
      const productRef = doc(firestore, "properties", id);
      const productSnapshot = await getDoc(productRef);
      if (productSnapshot.exists()) {
        setProduct({ id: productSnapshot.id, ...productSnapshot.data() });
      } else {
        console.log("Product not found");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const userinfo = async (userData) => {
    try {
      const dataRef = doc(firestore, "users", userData.userId);
      const dataSnapshot = await getDoc(dataRef);
      const NewData = dataSnapshot.data();
      // console.log(NewData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleFav = async (userData, proId, product) => {
    if (!userData) {
      return navigate("/login");
    }
    try {
      const userRef = doc(firestore, "users", userData.userId);
      const dataSnapshot = await getDoc(userRef);

      if (dataSnapshot.exists()) {
        const alreadyFav = dataSnapshot.data().favourites || [];
        // console.log(alreadyFav);

        const isFav = alreadyFav.some((item) => item.id === proId);

        if (isFav) {
          return "Already added to Favourites";
        } else {
          const updatedFav = [...alreadyFav, product];

          await updateDoc(userRef, { favourites: updatedFav });
        }
      }
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    productFetch();
  }, [id]);

  useEffect(() => {
    if (userData) {
      userinfo(userData);
    }
  }, [userData]);

  // useEffect(() => {}, []);

  return (
    <div className="text-black select-none">
      <div className="m-5 text-sm flex items-center  flex-row gap-2 font-sans text-purple-400">
        <Link to="/" className=" ">
          Home
        </Link>
        <MdArrowLeft className="text-xl rotate-180" />
        <Link to="/buy" className=" ">
          Buy
        </Link>
        <MdArrowLeft className="text-xl rotate-180" />

        <p className="text-black font-medium">{product && product.name}</p>
      </div>
      <div>
        {product && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-6  font-bold ">
            <div className="flex flex-col gap-4">
              <img
                src={currentUrl || product.img_url}
                alt=""
                className="md:w-[700px] h-[270px] md:h-[400px] rounded-xl object-cover"
              />
              <div className="flex gap-4 items-center justify-start">
                {product.img_url.length < 100
                  ? product.img_url.map((item, index) => (
                      <div key={index}>
                        <img
                          src={item}
                          alt=""
                          className="h-20 w-20 cursor-pointer"
                          onClick={() => {
                            setCurrentUrl(item);
                          }}
                        />
                      </div>
                    ))
                  : ""}
              </div>
            </div>

            <div className="flex flex-col gap-2 md:gap-6">
              <h1 className="font-bold text-4xl ">{product.name}</h1>
              <div className="flex flex-wrap gap-1 sm:gap-10 text-sm p-1 ">
                <div className="text-white flex items-center text-md gap-2 bg-blue-800  px-4 py-1 rounded ">
                  <GiBathtub />
                  {product.bathrooms}
                </div>
                <div className="text-white flex items-center text-md gap-2 bg-green-800  px-4 py-1 rounded">
                  <IoBedSharp />
                  <p>{product.bedrooms}</p>
                </div>

                <div className="text-white flex items-center text-md gap-2 bg-yellow-800  px-4 py-1 rounded">
                  <RxDimensions />
                  <p>{product.dimension}</p>
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <MdLocationOn />
                <p>{product.state.toUpperCase()}</p>
              </div>

              <div className="flex items-center">
                <MdOutlineAttachMoney className="text-xl" />
                <p className="">
                  {product.price}
                  <span className="text-neutral-400"> /month</span>{" "}
                </p>
              </div>

              <div className="flex gap-2 items-center">
                <MdLocalPhone />
                <p>
                  <a href={`tel:+${product.mobile}`}>{product.mobile}</a>
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <BiSolidMessageSquareDetail />
                <a href={`mailto:${product.email}`}>{product.email}</a>
              </div>
              <div>{/* <Rating /> */}</div>
              <div
                className="border-purple-500   border  flex justify-center items-center font-bold p-2 gap-2 cursor-pointer rounded-xl"
                onClick={async () => {
                  await handleFav(userData, product.id, product);
                  setFav([...fav, product]);
                  setHeart(true);
                }}
              >
                <FaHeart
                  className={` ${
                    userData
                      ? userData.favourites.some(
                          (item) => item.id === product.id
                        ) || heart
                        ? "text-pink-600"
                        : "text-black text-xl"
                      : null
                  }
                    
                  `}
                  onClick={() => [setHeart(true)]}
                />

                {userData &&
                userData.favourites.some((item) => item.id === product.id) ? (
                  <p className="text-pink-600">Added to Wishlist</p>
                ) : (
                  <p className="text-black">Add to wishlist</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-7">
        <h1 className="ml-4  font-bold">Properties you may like</h1>
        <div className="flex flex-wrap items-center justify-center md:items-center md:justify-center md:gap-10 mt-4 gap-2  sm:p-10">
          {filteredData &&
            filteredData.map((item) => (
              <div key={item.id} className="shadow-sm">
                <div
                  key={item.id}
                  className="rounded-t-2xl w-[320px] sm:w-[250px] md:w-[300px] relative text-sm md:text-md "
                >
                  <div className="rounded-t-xl">
                    <img
                      src={item.img_url}
                      alt=""
                      className="h-[300px] w-[530px] sm:w-[300px] md:w-[300px] rounded-t-xl"
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
    </div>
  );
};

export default Property;
