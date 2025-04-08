"use client";

import { useContext, useState, useEffect, useRef, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { NewsContext } from "../../context/NewsContext";
import { Search, Edit, Trash2, AlertCircle, X } from "lucide-react";

const Gridnews = () => {
  const [newsLength, setNewsLength] = useState(9); // Initial number of articles to display
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNews, setFilteredNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid or list view
  const { news, setNews } = useContext(NewsContext);
  const observerRef = useRef(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Filter news based on searchTerm
  useEffect(() => {
    if (searchTerm.length >= 2) {
      const filtered = news.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredNews(filtered);
    } else {
      setFilteredNews(news);
    }
    setNewsLength(9); // Reset newsLength when searching
  }, [searchTerm, news]);

  // Delete article
  const handleDelete = async () => {
    if (!confirmDelete) return;

    setNews((prevNews) =>
      prevNews.filter((item) => item._id !== confirmDelete)
    );
    setFilteredNews((prevFiltered) =>
      prevFiltered.filter((item) => item._id !== confirmDelete)
    );
    setConfirmDelete(null);

    try {
      const response = await fetch(
        `https://newsserver-a71z.onrender.com/api/news/${confirmDelete}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) console.error("Delete failed");
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate displayNews with useMemo
  const displayNews = useMemo(() => {
    if (searchTerm.length >= 2 && filteredNews.length === 0) {
      return [];
    }
    return filteredNews.length > 0 ? filteredNews : news;
  }, [searchTerm, filteredNews, news]);

  // Infinite scroll logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && newsLength < displayNews.length) {
          setIsLoading(true);
          setTimeout(() => {
            setNewsLength((prev) => prev + 9);
            setIsLoading(false);
          }, 500);
        }
      },
      { threshold: 0.1 }
    );

    const currentObserver = observerRef.current;
    if (currentObserver) {
      observer.observe(currentObserver);
    }

    return () => {
      if (currentObserver) {
        observer.unobserve(currentObserver);
      }
    };
  }, [displayNews.length, newsLength]);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Articles</h1>

        {/* Search and view toggle */}
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>

          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1.5 rounded-md ${
                viewMode === "grid" ? "bg-white shadow-sm" : "text-gray-600"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-1.5 rounded-md ${
                viewMode === "list" ? "bg-white shadow-sm" : "text-gray-600"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Articles list */}
      {displayNews.length > 0 ? (
        viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayNews.slice(0, newsLength).map((item, index) => (
              <div
                key={item._id}
                className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
              >
                <NavLink to={`/DetailNew/${item._id}`} className="block">
                  <img
                    src={item.urlToImage || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = "/placeholder.svg";
                    }}
                  />
                </NavLink>

                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="text-xs font-medium px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                        {Array.isArray(item.category)
                          ? item.category[0]
                          : item.category || "Uncategorized"}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        {formatDate(item.publishedAt)}
                      </span>
                    </div>

                    <NavLink to={`/DetailNew/${item._id}`} className="block">
                      <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-indigo-600 transition-colors">
                        {item.title}
                      </h2>
                    </NavLink>

                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">
                      By {item.author || "Unknown"}
                    </span>

                    <div className="flex space-x-1">
                      <button
                        onClick={() => setConfirmDelete(item._id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        aria-label="Delete"
                      >
                        <Trash2 size={18} />
                      </button>

                      <NavLink
                        to={`/admin/updatenew/${item._id}`}
                        className="p-1.5 text-indigo-500 hover:bg-indigo-50 rounded-full transition-colors"
                        aria-label="Edit"
                      >
                        <Edit size={18} />
                      </NavLink>
                    </div>
                  </div>
                </div>

                {index === displayNews.slice(0, newsLength).length - 1 && (
                  <div ref={observerRef} className="h-1" />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="border rounded-xl overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Article
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayNews.slice(0, newsLength).map((item, index) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 hidden sm:block">
                          <img
                            className="h-10 w-10 rounded-md object-cover"
                            src={item.urlToImage || "/placeholder.svg"}
                            alt=""
                            onError={(e) => {
                              e.target.src = "/placeholder.svg";
                            }}
                          />
                        </div>
                        <div className="ml-0 sm:ml-4">
                          <NavLink
                            to={`/DetailNew/${item._id}`}
                            className="text-sm font-medium text-gray-900 hover:text-indigo-600"
                          >
                            {item.title.length > 60
                              ? item.title.substring(0, 60) + "..."
                              : item.title}
                          </NavLink>
                          <div className="text-sm text-gray-500 hidden sm:block">
                            By {item.author || "Unknown"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                        {Array.isArray(item.category)
                          ? item.category[0]
                          : item.category || "Uncategorized"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                      {formatDate(item.publishedAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <NavLink
                          to={`/admin/updatenew/${item._id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </NavLink>
                        <button
                          onClick={() => setConfirmDelete(item._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                    {index === displayNews.slice(0, newsLength).length - 1 && (
                      <td ref={observerRef} className="h-1 p-0 m-0"></td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : searchTerm.length >= 2 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-gray-100 p-3 rounded-full mb-4">
            <AlertCircle className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No articles found
          </h3>
          <p className="text-gray-500 max-w-md">
            We couldn't find any articles matching "{searchTerm}". Try adjusting
            your search term.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-gray-100 p-3 rounded-full mb-4">
            <AlertCircle className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No articles available
          </h3>
          <p className="text-gray-500">Start by creating your first article.</p>
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="ml-3 text-gray-600">Loading more articles...</p>
        </div>
      )}

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 z-40"
          aria-label="Back to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      )}

      {/* Delete confirmation modal */}
      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 m-4">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-red-100">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 text-center mb-2">
              Delete Article
            </h3>
            <p className="text-gray-500 text-center mb-6">
              Are you sure you want to delete this article? This action cannot
              be undone.
            </p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
              >
                <X className="h-4 w-4 mr-1.5" />
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
              >
                <Trash2 className="h-4 w-4 mr-1.5" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gridnews;
