"use client";

import { useContext } from "react";
import ListNewsCategory from "./NewsCategory/ListNewsCategory";
import imgNews from "../assets/spider.png";
import ImageNews from "./NewsCategory/ImageNews";
import LiveStream from "./NewsCategory/LiveStream";
import ListNews from "./NewsCategory/ListNews/ListNews";
import CarouselNews from "./CarouselNews";
import { NavLink } from "react-router-dom";
import { NewsContext } from "../context/NewsContext";

const Home = () => {
  window.scrollTo(0, 0);
  const { news } = useContext(NewsContext);

  const newsVideo = news.filter((item) => {
    return item.video !== null;
  });

  return (
    <div className="px-4 md:px-6 lg:px-0">
      {/* Carousel */}
      <CarouselNews />

      {/* Hero Image */}
      <NavLink to={`/DetailNew/${news[0]?._id}`}>
        <div
          className="h-64 sm:h-96 md:h-128 w-full md:w-11/12 lg:w-5/6 mx-auto bg-cover bg-center bg-no-repeat relative cursor-pointer hover:opacity-90 my-4"
          style={{ backgroundImage: `url(${news[0]?.urlToImage || ""})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>

          <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 w-full md:w-3/4 px-2">
            <div className="text-white text-sm md:text-base">
              {news[0]?.publishedAt
                ? Math.floor(
                    (Date.now() - new Date(news[0].publishedAt)) /
                      (1000 * 3600 * 24)
                  ) + " Day"
                : "Invalid date"}
            </div>

            <h2 className="text-white z-10 relative py-1 md:py-2 text-xl md:text-2xl lg:text-4xl line-clamp-2 md:line-clamp-none">
              {news[0]?.description || "No description available"}{" "}
            </h2>

            <div className="flex text-white relative items-center gap-2 md:gap-4 text-sm md:text-base">
              <img
                src={imgNews || "/placeholder.svg"}
                className="bg-center bg-no-repeat w-6 md:w-8 rounded-2xl"
                alt="author avatar"
              />
              <p className="truncate max-w-[100px] md:max-w-full">
                {news[0]?.author}
              </p>

              <div className="flex items-center gap-x-1 py-1 md:py-2">
                <i className="fa-regular fa-comment"></i>
                <p>290</p>
              </div>
            </div>
          </div>
        </div>
      </NavLink>

      {/* Sport and Business sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 py-4 md:py-8">
        <div className="md:col-span-2 border-t-4 py-2">
          <h2 className="font-bold text-lg mb-2 md:mb-4">
            <NavLink to="/category/sport">Sport &gt;</NavLink>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ListNewsCategory category="Sport" news={news} />
            <ImageNews news={news} />
          </div>
        </div>

        <div className="md:col-span-1 border-t-4 py-2">
          <h2 className="font-bold text-lg mb-2 md:mb-4">
            <NavLink to="/category/business">Business &gt;</NavLink>
          </h2>
          <ListNewsCategory category="Business" news={news} />
        </div>
      </div>

      {/* Food and Book sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 py-4 md:py-8">
        <div className="md:col-span-1 border-t-4 py-2">
          <h2 className="font-bold text-lg mb-2 md:mb-4">
            <NavLink to="/category/food">Food &gt;</NavLink>
          </h2>
          <ListNewsCategory category="Food" news={news} />
        </div>
        <div className="md:col-span-2 border-t-4 py-2">
          <h2 className="font-bold text-lg mb-2 md:mb-4">Book &gt;</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ListNewsCategory category="Book" news={news} />
            <ImageNews news={news} />
          </div>
        </div>
      </div>

      {/* Live Stream */}
      <LiveStream newsData={newsVideo} />

      {/* Latest News */}
      <ListNews news={news} />
    </div>
  );
};

export default Home;
