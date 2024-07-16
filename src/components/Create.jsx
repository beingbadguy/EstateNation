import React, { useState } from "react";
import { firestore, storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
const Create = ({ userData }) => {
  console.log(userData);
  const [formData, setFormData] = useState({
    name: "",
    bathrooms: "",
    bedrooms: "",
    dimension: "",
    state: "",
    price: "",
    mobile: "",
    email: "",
  });
  const [images, setImages] = useState([]);
  const [hide, setHide] = useState();
  const [load, setLoading] = useState("Submit");

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (images.length < 1 || images.length > 4) {
      alert("Please select an image that should be between 1 and 4");
      return;
    }
    if (formData.mobile.length < 10 || formData.mobile.length > 10) {
      alert("Please enter a valid 10-digit mobile number");
    }

    if (
      formData.name &&
      formData.bathrooms &&
      formData.bedrooms &&
      formData.dimension &&
      formData.state &&
      formData.price &&
      images &&
      formData.mobile
    ) {
      uploadData(images);
    } else {
      alert("Enter all the required fields");
    }
  };

  const uploadData = async (images) => {
    const promises = Array.from(images).map(async (image) => {
      const storageRef = ref(storage, `propertyImage/${image.name}`);
      return uploadBytes(storageRef, image).then(async (snapshot) => {
        return getDownloadURL(snapshot.ref);
      });
    });

    try {
      setLoading("Loading...");
      const downloadURLs = await Promise.all(promises);

      await addDoc(collection(firestore, "properties"), {
        img_url: downloadURLs,
        name: formData.name,
        bathrooms: formData.bathrooms,
        bedrooms: formData.bedrooms,
        dimension: formData.dimension,
        state: formData.state,
        price: formData.price,
        mobile: formData.mobile,
        email: userData.email,
        user_id: userData.userId,
      });
      console.log("data uploaded successfully!");
      setLoading("submit");
      setFormData({
        name: "",
        bathrooms: "",
        bedrooms: "",
        dimension: "",
        state: "",
        price: "",
        mobile: "",
        email: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(images);
  return (
    <div className=" pl-10 pr-10   rounded">
      <form
        className="flex  border-neutral-600 border rounded items-start justify-start bg-black my-20 p-5 md:p-10 gap-4 flex-wrap font-bold "
        onSubmit={submitHandler}
      >
        <div className="flex flex-col font-semibold gap-1">
          <label className="text-white">
            Property Image (max 4) <span className="text-red-400">*</span>{" "}
          </label>
          <input
            multiple
            type="file"
            className="bg-white text-black w-[220px] p-1 rounded-md"
            onChange={(e) => {
              setImages([...e.target.files]);
            }}
            accept="jpg,png,jpeg"
          />
        </div>
        <div className="flex flex-col font-semibold gap-1 ">
          <label className="text-white">
            Property Name <span className="text-red-400">*</span>{" "}
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            className="bg-white text-black p-2 w-[200px] md:w-[290px] rounded-md"
            placeholder="Avenue mansion"
            onChange={(e) => {
              changeHandler(e);
            }}
          />
        </div>
        <div className="flex flex-col font-semibold gap-1  ">
          <label className="text-white">
            Bathroom quantity <span className="text-red-400">*</span>{" "}
          </label>

          <input
            type="text"
            name="bathrooms"
            value={formData.bathrooms}
            className="bg-white text-black p-2 w-[200px] md:w-[290px] rounded-md"
            placeholder="2"
            onChange={(e) => {
              changeHandler(e);
            }}
          />
        </div>
        <div className="flex flex-col font-semibold gap-1 ">
          <label className="text-white">
            Bedroom quantity <span className="text-red-400">*</span>{" "}
          </label>
          <input
            type="text"
            name="bedrooms"
            value={formData.bedrooms}
            className="bg-white text-black p-2 w-[200px] md:w-[290px] rounded-md"
            placeholder="5"
            onChange={(e) => {
              changeHandler(e);
            }}
          />
        </div>
        <div className="flex flex-col font-semibold gap-1 ">
          <label className="text-white">
            Dimension <span className="text-red-400">*</span>{" "}
          </label>
          <input
            type="text"
            name="dimension"
            value={formData.dimension}
            className="bg-white text-black p-2 w-[200px] md:w-[290px] rounded-md"
            placeholder="25 X 30"
            onChange={(e) => {
              changeHandler(e);
            }}
          />
        </div>
        <div className="flex flex-col font-semibold gap-1 ">
          <label className="text-white">
            Price <span className="text-red-400">*</span>{" "}
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            className="bg-white text-black p-2 w-[200px] md:w-[290px] rounded-md"
            placeholder="40k"
            onChange={(e) => {
              changeHandler(e);
            }}
          />
        </div>
        <div className="flex flex-col font-semibold gap-1 ">
          <label className="text-white">
            State <span className="text-red-400">*</span>{" "}
          </label>
          <input
            type="text"
            name="state"
            value={formData.state}
            className="bg-white text-black p-2 w-[200px] md:w-[290px] rounded-md"
            placeholder="Noida"
            onChange={(e) => {
              changeHandler(e);
            }}
          />
        </div>
        <div className="flex flex-col font-semibold gap-1 ">
          <label className="text-white">
            Mobile <span className="text-red-400">*</span>{" "}
          </label>
          <input
            type="number"
            name="mobile"
            value={formData.mobile}
            className="bg-white text-black p-2 w-[200px] md:w-[290px]  rounded-md"
            placeholder="Number"
            onChange={(e) => {
              changeHandler(e);
            }}
          />
        </div>{" "}
        <div className="flex flex-col font-semibold gap-1 ">
          <label className="text-white">
            Email <span className="text-red-400">*</span>{" "}
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            className="bg-white text-black p-2 w-[200px] md:w-[290px] rounded-md"
            placeholder="Email"
            onChange={(e) => {
              changeHandler(e);
            }}
          />
        </div>
        <button className="bg-purple-500 text-white p-2 mt-7 w-[200px] md:w-[290px] rounded-md">
          {load}
        </button>
      </form>
    </div>
  );
};

export default Create;
