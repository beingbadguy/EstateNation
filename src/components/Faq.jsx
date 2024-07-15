import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";

const Faq = ({ q, a }) => {
  const [faq, setFaq] = useState(false);
  return (
    <div
      className={` ${
        faq ? "h-28" : "h-10 md:h-12 "
      } flex flex-col duration-500 bg-purple-500 text-white p-2 overflow-hidden font-bold transition-all w-[390px] lg:w-[600px] cursor-pointer text-sm rounded md:text-lg`}
    >
      <div
        className="flex items-start justify-between   "
        onClick={() => {
          setFaq(!faq);
        }}
      >
        <p>{q}</p>
        <FaCaretDown
          className={` ${
            faq ? "" : " rotate-[90deg] transition-all duration-all"
          } `}
        />
      </div>
      <div className="text-white pt-3 ">
        <p>{a}</p>
      </div>
    </div>
  );
};

export default Faq;
