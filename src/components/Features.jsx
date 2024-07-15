import React from "react";

const Features = ({ url, title = "demo title" }) => {
  return (
    <div className="text-black bg-slate-100 p-4 flex flex-col items-start md:items-center justify-center gap-4  border-white rounded-xl md:w-[300px] md:h-[200px] w-[150px] h-[150px] text-sm  shadow-xl ">
      <div className="text-lg md:text-2xl text-purple-500 p-1">{url}</div>
      <p className="font-bold">{title}</p>
    </div>
  );
};

export default Features;
