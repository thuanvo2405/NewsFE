"use client";

import { useState } from "react";
import { NavLink } from "react-router-dom";

const LeftSection = ({ news }) => {
  const [newsLength, setNewsLength] = useState(5);

  return (
    <div className="col-span-1 md:col-span-2 space-y-4 md:space-y-6">
      {news.slice(0, newsLength).map((item) => (
        <div
          key={item._id}
          className="flex flex-col sm:flex-row gap-3 md:gap-4 border-b pb-4"
        >
          <NavLink
            to={`/DetailNew/${item._id}`}
            className="block w-full sm:w-auto"
          >
            <img
              src={item.urlToImage || "/placeholder.svg"}
              alt="News"
              className="w-full sm:w-36 md:w-48 h-48 sm:h-32 object-cover"
            />
          </NavLink>

          <div className="flex flex-col justify-between flex-1 mt-2 sm:mt-0">
            <div>
              <NavLink to={`/DetailNew/${item._id}`} className="font-semibold">
                <h2 className="text-base font-bold text-justify">
                  {item.title}
                </h2>
              </NavLink>
              <p className="text-gray-600 text-sm text-justify line-clamp-2 mt-1 md:mt-2">
                {item.description}
              </p>
            </div>
            <NavLink
              to={`/DetailNew/${item._id}`}
              className="text-red-500 font-semibold mt-2 sm:mt-0"
            >
              READ MORE
            </NavLink>
          </div>
        </div>
      ))}
      <button
        className={`bg-blue-500 text-white rounded-xl w-full sm:w-4/5 mx-auto block my-4 p-2 cursor-pointer ${
          newsLength === news.length ? "hidden" : ""
        }`}
        onClick={() => setNewsLength(newsLength + 10)}
      >
        Load More
      </button>
    </div>
  );
};

export default LeftSection;
//         onClick={index < news.length - 4 ? nextSlide : undefined}