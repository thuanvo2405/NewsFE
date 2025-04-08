import React, { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";

const Category = () => {
  const { category, page } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(Number(page) || 1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 12;
  const maxButtons = 5;

  useEffect(() => {
    setCurrentPage(Number(page) || 1);
  }, [category, page]);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://newsserver-a71z.onrender.com/api/news/category/${category}/${currentPage}`
        );
        const data = await response.json();
        if (response.ok) {
          setNews(data.data);
          setTotalPages(data.pages);
          setTotalItems(data.total);
        } else {
          setNews([]);
          setTotalPages(0);
          setTotalItems(0);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        setNews([]);
        setTotalPages(0);
        setTotalItems(0);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, [category, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      navigate(`/Category/${category}/${page}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 capitalize">
          {category}
        </h1>
        <p className="text-gray-600 mt-2">
          {isLoading
            ? "Loading..."
            : `Showing ${news.length} of ${totalItems} items`}
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 mt-4">Loading news...</p>
        </div>
      ) : news.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <NavLink
              to={`/DetailNew/${item._id}`}
              key={item._id}
              className="transform transition duration-300 hover:scale-105"
            >
              <div className="bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-xl h-[350px] flex flex-col">
                <div className="w-full h-48">
                  <img
                    src={item.urlToImage}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col flex-1 justify-between">
                  <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 min-h-[3rem]">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-2">
                    By {item.author || "Unknown"} -{" "}
                    {new Date(item.publishedAt).toLocaleDateString("en-GB")}
                  </p>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-12">
          <p className="text-lg">No news found for this category.</p>
        </div>
      )}

      {totalItems > 0 && !isLoading && (
        <div className="flex justify-center mt-8 space-x-2">
          <button
            className="px-4 py-2 border rounded bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 transition duration-200"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            {"<<"}
          </button>
          <button
            className="px-4 py-2 border rounded bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 transition duration-200"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>

          {Array.from({ length: Math.min(maxButtons, totalPages) }, (_, i) => {
            const page =
              Math.max(
                1,
                Math.min(
                  totalPages - maxButtons + 1,
                  currentPage - Math.floor(maxButtons / 2)
                )
              ) + i;
            return (
              <button
                key={page}
                className={`px-4 py-2 border rounded ${
                  currentPage === page
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } transition duration-200`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            );
          })}

          <button
            className="px-4 py-2 border rounded bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 transition duration-200"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
          <button
            className="px-4 py-2 border rounded bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 transition duration-200"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            {">>"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Category;
