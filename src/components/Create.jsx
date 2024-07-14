import React, { useState } from "react";
import { firestore, storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
const Create = () => {
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
  const [image, setImage] = useState(null);
  const [load, setLoading] = useState("Submit");

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }
    if (
      formData.name &&
      formData.bathrooms &&
      formData.bedrooms &&
      formData.dimension &&
      formData.state &&
      formData.price &&
      image &&
      formData.mobile &&
      formData.email
    ) {
      uploadData(image);
    } else {
      alert("Enter all the required fields");
    }
  };

  const uploadData = async (image) => {
    try {
      setLoading("Loading...");
      const storageRef = ref(storage, `propertyImage/${image.name}`);
      const snapshot = await uploadBytes(storageRef, image);
      const url = await getDownloadURL(snapshot.ref);
      await addDoc(collection(firestore, "properties"), {
        img_url: url,
        name: formData.name,
        bathrooms: formData.bathrooms,
        bedrooms: formData.bedrooms,
        dimension: formData.dimension,
        state: formData.state,
        price: formData.price,
        mobile: formData.mobile,
        email: formData.email,
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

  //   console.log(formData, image);
  return (
    <div className=" pl-10 pr-10   rounded">
      <form
        className="flex  border-neutral-600 border rounded items-start justify-start bg-black my-20 p-5 md:p-10 gap-4 flex-wrap font-bold "
        onSubmit={submitHandler}
      >
        <div className="flex flex-col font-semibold gap-1">
          <label className="text-white">
            Property Image <span className="text-red-400">*</span>{" "}
          </label>
          <input
            type="file"
            className="bg-white text-black w-[220px] p-1 rounded-md"
            onChange={(e) => {
              setImage(e.target.files[0]);
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
            className="bg-white text-black p-2 w-[290px] rounded-md"
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
            className="bg-white text-black p-2 w-[290px] rounded-md"
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
            className="bg-white text-black p-2 w-[290px] rounded-md"
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
            className="bg-white text-black p-2 w-[290px] rounded-md"
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
            className="bg-white text-black p-2 w-[290px] rounded-md"
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
            className="bg-white text-black p-2 w-[290px] rounded-md"
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
            className="bg-white text-black p-2 w-[290px] rounded-md"
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
            className="bg-white text-black p-2 w-[290px] rounded-md"
            placeholder="Email"
            onChange={(e) => {
              changeHandler(e);
            }}
          />
        </div>
        <button className="bg-purple-500 text-white p-2 mt-7 w-[200px] rounded-md">
          {load}
        </button>
      </form>
    </div>
  );
};

export default Create;
