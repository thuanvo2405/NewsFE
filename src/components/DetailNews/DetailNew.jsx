"use client";

import {
  useState,
  useEffect,
  useContext,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { NavLink, useParams } from "react-router-dom";
import Comment from "./Comment";
import { AuthContext } from "../../context/AuthContext";
import { NewsContext } from "../../context/NewsContext";
import DOMPurify from "dompurify";

const DetailNew = () => {
  const { user } = useContext(AuthContext);
  const { news } = useContext(NewsContext);
  const [newsDetail, setNewsDetail] = useState(null);
  const [infinityNewsLength, setInfinityNewsLength] = useState(5);
  const [isLoadingInfinity, setIsLoadingInfinity] = useState(false);
  const { id } = useParams();
  const observerRef = useRef(null);

  // Fetch bài viết chi tiết
  const fetchNews = useCallback(async () => {
    try {
      const response = await fetch(`https://newsserver-a71z.onrender.com/api/news/${id}`);
      if (!response.ok) throw new Error("Lỗi tải bài viết");
      const data = await response.json();
      setNewsDetail(data);
    } catch (error) {
      console.error("Lỗi khi tải bài viết:", error);
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchNews();
  }, [fetchNews]);

  const relatedNews = useMemo(() => {
    return newsDetail?.category
      ? news.filter((item) =>
          item.category.some((cat) => newsDetail.category.includes(cat))
        )
      : [];
  }, [newsDetail, news]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          infinityNewsLength < relatedNews.length
        ) {
          setIsLoadingInfinity(true);
          setInfinityNewsLength((prev) => prev + 5);
          setTimeout(() => setIsLoadingInfinity(false), 300);
        }
      },
      { threshold: 0.5 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [relatedNews, infinityNewsLength]);

  if (!newsDetail) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-4 text-gray-600">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 md:px-6 lg:px-0 max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 text-center py-6 md:py-8 lg:py-12">
        {newsDetail?.title}
      </h1>

      <ul className="flex w-3/5 sm:w-1/2 md:w-2/5 lg:w-1/3 mx-auto justify-between py-2 md:py-4">
        {[
          "fa-facebook",
          "fa-youtube",
          "fa-pinterest",
          "fa-x-twitter",
          "fa-linkedin",
        ].map((icon, index) => (
          <li
            key={index}
            className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12"
          >
            <i
              className={`fa-brands ${icon} text-xl sm:text-2xl md:text-3xl cursor-pointer hover:opacity-70 transition-opacity duration-200`}
            ></i>
          </li>
        ))}
      </ul>

      <h3 className="font-semibold text-lg sm:text-xl md:text-2xl py-4 md:py-6 lg:py-8">
        {newsDetail?.description}
      </h3>

      <img
        className="w-full md:w-11/12 lg:w-5/6 h-auto rounded mx-auto shadow-lg"
        src={newsDetail?.urlToImage || "/placeholder.svg"}
        alt={newsDetail?.title}
        loading="lazy"
      />

      <div className="py-4 md:py-6 lg:py-8 text-gray-700">
        <div
          className="leading-relaxed text-base md:text-lg prose max-w-none"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(newsDetail?.content),
          }}
        />
      </div>

      <Comment
        user={user}
        commentList={newsDetail?.comments || []}
        refreshNews={fetchNews}
      />

      <div className="mt-8 md:mt-10 lg:mt-12">
        <p className="font-bold text-2xl md:text-3xl lg:text-4xl py-2 md:py-4">
          More News in This Category
        </p>
        <div className="space-y-4 md:space-y-6">
          {relatedNews
            .filter((item) => item._id !== newsDetail._id)
            .slice(0, infinityNewsLength)
            .map((item, index) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-start sm:items-center bg-white rounded-lg shadow-md p-3 md:p-4 hover:shadow-lg transition-shadow duration-200"
              >
                <NavLink
                  to={`/DetailNew/${item._id}`}
                  className="flex flex-col sm:flex-row items-start sm:items-center w-full"
                >
                  <img
                    className="w-full sm:w-24 h-40 sm:h-24 object-cover rounded-lg mb-3 sm:mb-0 sm:mr-4"
                    src={item?.urlToImage || "/placeholder.svg"}
                    alt={item?.title}
                    loading="lazy"
                  />
                  <div className="flex-1">
                    <h5 className="text-base md:text-lg font-semibold text-gray-800 line-clamp-2 sm:line-clamp-1">
                      {item?.title}
                    </h5>
                    <p className="text-xs md:text-sm text-gray-500 mt-1">
                      By {item.author || "Unknown"} •{" "}
                      {new Date(item.publishedAt).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                </NavLink>
                {index ===
                  relatedNews.slice(0, infinityNewsLength).length - 1 && (
                  <div ref={observerRef} className="h-1" />
                )}
              </div>
            ))}
        </div>
        {isLoadingInfinity && (
          <div className="flex justify-center items-center py-4 md:py-6">
            <div className="w-6 h-6 md:w-8 md:h-8 border-3 md:border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="ml-3 md:ml-4 text-sm md:text-base text-gray-600">
              Loading more...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailNew;
