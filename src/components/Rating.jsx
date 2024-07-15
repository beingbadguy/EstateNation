import React, { useState } from "react";
import { IoStarSharp } from "react-icons/io5";

const Rating = ({ noOfStars = 5 }) => {
  const [star, setStar] = useState(noOfStars);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const handleRating = (index) => {
    setRating(index);
  };
  const handleHover = (index) => {
    setHover(index);
  };
  const handleLeave = () => {
    setHover(rating);
  };
  return (
    <div className="flex gap-4">
      {[...Array(star)].map((_, index) => {
        index = index + 1;
        return (
          <div key={index}>
            <IoStarSharp
              className={` ${
                index <= (rating || hover) ? "text-yellow-300" : "text-black"
              } text-black text-2xl cursor-pointer`}
              onClick={() => {
                handleRating(index);
              }}
              onMouseEnter={() => {
                handleHover(index);
              }}
              onMouseLeave={() => {
                handleLeave();
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Rating;
