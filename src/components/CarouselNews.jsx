import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { NewsContext } from "../context/NewsContext";

const CarouselNews = () => {
  const { news } = useContext(NewsContext);

  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    if (index < news.length - 4) {
      setIndex(index + 1);
    }
  };

  const prevSlide = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Nút prev */}
      <button
        onClick={index > 0 ? prevSlide : undefined}
        className={`absolute left-0 top-1/2 -translate-y-1/2 px-2 py-2 bg-white border  z-10 rounded-full text-black cursor-pointer ${
          index === 0 && "hidden"
        }`}
      >
        ◀
      </button>

      {/* Danh sách ảnh */}
      <ul
        className="flex transition-transform duration-300 h-28"
        style={{ transform: `translateX(-${index * 25}%)` }}
      >
        {news.map((item) => (
          <li
            key={item._id}
            className="lg:w-1/4 md:w-1/3 flex-shrink-0 px-4 h-full "
          >
            <NavLink to={`/DetailNew/${item._id}`}>
              <div className="flex items-center justify-center">
                <img
                  src={item.urlToImage}
                  alt={`Image ${item.title}`}
                  className="w-24 h-24 mr-4  object-contain"
                />
                <h2 className="text-[12px] font-semibold text-black my-2 tracking-wide text-justify  overflow-hidden line-clamp-3">
                  {item.title}
                </h2>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Nút next */}
      <button
        onClick={nextSlide}
        className={`absolute right-0 top-1/2 -translate-y-1/2 bg-white border text-black px-2 py-1 rounded-full z-10 cursor-pointer ${
          index === news.length - 4 && "hidden"
        }`}
      >
        ▶
      </button>
    </div>
  );
};

export default CarouselNews;
