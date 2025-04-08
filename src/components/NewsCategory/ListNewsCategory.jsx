import React from "react";
import { NavLink } from "react-router-dom";

const ListNewsCategory = ({ category, news }) => {
  const topFourCategory = news
    .filter((item) => item.category.includes(category))
    .slice(0, 4);

  return (
    <ul className="flex flex-col justify-between">
      {topFourCategory.map((item, index) => (
        <li key={index} className="border-b pb-4">
          <NavLink
            to={`/Detailnew/${item._id}`}
            className="flex justify-between items-center mt-4 "
          >
            <div>
              <h3 className="text-md font-semibold line-clamp-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500">{item.time}</p>
            </div>
            <img
              src={item.urlToImage}
              alt="news"
              className="w-16 h-16 object-cover rounded-md"
            />
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default ListNewsCategory;
