import React from "react";
import imgNews from "../../assets/spider.png";
import { NavLink } from "react-router-dom";

const ImageNews = ({ news }) => {
  const randomNews = Math.floor(Math.random() * news.length);
  return (
    <div className="relative cursor-pointer hover:opacity-80">
      <NavLink to={`/DetailNew/${news[randomNews]?._id}`}>
        <img
          src={news[randomNews]?.urlToImage}
          alt="featured"
          className="w-full h-full object-cover rounded-md"
        />
        <div className="absolute inset-0 bg-black/50  rounded-md">1</div>
        <div className="absolute bottom-4 left-4 text-white">
          <p className="text-sm">
            {news[randomNews]?.publishedAt
              ? Math.floor(
                  (Date.now() - new Date(news[randomNews].publishedAt)) /
                    (1000 * 3600 * 24)
                ) + " Day"
              : "Invalid date"}
          </p>
          <h2 className="text-2xl font-bold line-clamp-2 text-ellipsis overflow-hidden w-11/12">
            {news[randomNews]?.description}
          </h2>
          <div className="flex items-center gap-2 mt-2">
            <img src={imgNews} alt="author" className="w-8 h-8 rounded-full" />
            <p className="text-sm">{news[randomNews]?.author}</p>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default ImageNews;
