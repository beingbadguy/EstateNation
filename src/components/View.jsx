import React, { useEffect, useState } from "react";
import { SlSizeFullscreen } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

const View = ({ id }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center justify-center  gap-4 w-[100px] bg-black text-white p-1 mt-3 font-bold  rounded cursor-pointer"
      onClick={() => {
        navigate(`/property/${id}`);
      }}
    >
      View <SlSizeFullscreen className="text-sm" />
    </div>
  );
};

export default View;
