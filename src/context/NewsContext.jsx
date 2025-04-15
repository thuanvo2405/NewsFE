import { useState, createContext, useEffect } from "react";

const NewsContext = createContext();

function NewsProvider({ children }) {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("https://newsserver-a71z.onrender.com/api/news")
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
      });
  }, []);

  // Thêm hàm addNews
  const addNews = (newArticle) => {
    setNews((prevNews) => [newArticle, ...prevNews]);
  };

  return (
    <NewsContext.Provider value={{ news, setNews, addNews }}>
      {children}
    </NewsContext.Provider>
  );
}

export { NewsContext, NewsProvider };
