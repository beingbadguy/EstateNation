import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { getDoc, doc, updateDoc, addDoc, deleteDoc } from "firebase/firestore";
import { firestore } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { MdOutlineDelete } from "react-icons/md";

const User = () => {
  const { userData, setUserData, logoutHandle } = useContext(AuthContext);
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

  const deleteProperty = async (propertyId) => {
    try {
      await deleteDoc(doc(firestore, "properties", propertyId));
      setProperties((prevProperties) =>
        prevProperties.filter((property) => property.id !== propertyId)
      );
      console.log(`Property with ID ${propertyId} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  const userProperty = properties.filter((item) => {
    return item.user_id == userData.userId;
  });

  useEffect(() => {
    fetchingData();
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center flex-col min-h-[61vh] bg-white ">
        <h1 className="mt-10 mb-5 font-semibold">My Profile</h1>
        <div className="border flex items-center p-4 sm:gap-10 relative flex-col sm:flex-row shadow-md">
          <img src="./img.png" alt="" className="h-20 w-20 rounded-full" />
          <div className="text-center sm:text-left ">
            <p className="font-bold text-xl my-2"> {userData.name}</p>
            <p className="font-semibold">Email Address: {userData.email}</p>
          </div>

          <div className="absolute right-0 top-0 p-2">
            <Link
              to={`/`}
              className="font-bold"
              onClick={() => {
                logoutHandle();
              }}
            >
              <IoIosLogOut className="text-xl" />
            </Link>
          </div>
        </div>
      </div>
      <div className="p-5">
        <h1 className="font-bold mb-4">
          Property Added by You ({userProperty.length})
        </h1>
        {userProperty.map((item) => (
          <div key={item.id} className="mb-5">
            <div className="flex justify-between items-center p-4 sm:gap-10 relative flex-col sm:flex-row shadow-md">
              <img
                src={`${item.img_url}`}
                alt=""
                className="h-20 w-20 rounded-full"
              />
              <div className="text-center sm:text-left ">
                <p className="font-bold text-xl my-2">{item.name}</p>
                <p className="font-semibold">Price: ${item.price}</p>
                <p className="font-semibold">Location: {item.state}</p>
              </div>
              <div className=" p-2">
                <Link to={`/property/${item.id}`}>
                  <p className="text-sm hover:bg-purple-700 font-bold bg-purple-500 text-white duration-500 transition-all p-1 rounded">
                    View
                  </p>
                </Link>
              </div>
              <div className="absolute right-0 top-0 p-2">
                <button
                  onClick={() => {
                    deleteProperty(item.id);
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

export default User;
