import React, { useContext, useState } from "react";
import { NewsContext } from "../../context/NewsContext";
const LiveStream = () => {
  const { news } = useContext(NewsContext);
  const newsVideo = news.filter((item) => item.video).slice(0, 4);
  const [indexVideo, setIndexVideo] = useState(0);
  console.log(news);

  const prevVideo = () => {
    if (indexVideo >= 1) setIndexVideo((item) => item - 1);
  };

  const nextVideo = () => {
    if (indexVideo < newsVideo.length - 1) setIndexVideo((item) => item + 1);
  };

  const chosenVideo = (id) => {
    setIndexVideo(id);
  };

  console.log(newsVideo[indexVideo]?.video);
  return (
    <div className="bg-black text-white p-6">
      <div className="flex items-center mb-4">
        <span className="text-red-500 mr-2">●</span>
        <span className="font-bold">VIDEO</span>
      </div>
      <div className="flex">
        <div className="relative w-3/4 ">
          <video
            src={newsVideo[indexVideo]?.video}
            autoPlay // Tự động phát
            muted // Tắt tiếng
            loop // Lặp video
            className="absolute top-0 left-0 w-full h-full object-cover opacity-50 rounded-lg" // opacity-50 để tạo độ mờ nhẹ
          >
            Trình duyệt của bạn không hỗ trợ video.
          </video>
          <div className="absolute bottom-4 left-4 text-white z-10">
            <h2 className="text-2xl font-bold">
              {newsVideo[indexVideo]?.title}
            </h2>
            <div className="flex items-center mt-2 text-2xl">
              <img
                src="https://source.unsplash.com/40x40/?person"
                alt="Avatar"
                className="w-6 h-6 rounded-full mr-2"
              />
              <span>{newsVideo[indexVideo]?.author}</span>
              <span className="mx-2">•</span>
              <span>
                {newsVideo[0]?.publishedAt
                  ? Math.floor(
                      (Date.now() -
                        new Date(newsVideo[indexVideo].publishedAt)) /
                        (1000 * 3600 * 24)
                    ) + " Day"
                  : "Invalid date"}
              </span>
              <span className="mx-2">•</span>
              <span>💬 {newsVideo[indexVideo]?.comments.length}</span>
            </div>
          </div>
        </div>
        <div className="w-1/4 pl-4">
          <button
            onClick={prevVideo}
            className={`w-full  py-2 rounded-md text-white font-bold mb-4 ${
              indexVideo < 1
                ? "cursor-not-allowed bg-red-300"
                : "cursor-pointer bg-red-600"
            }`}
          >
            Prev
          </button>
          <div className="space-y-4">
            {newsVideo.map((item, index) => (
              <div
                key={index}
                className="flex bg-gray-800 p-2 rounded-lg cursor-pointer"
                onClick={() => chosenVideo(index)}
              >
                <video
                  src={item?.video}
                  autoPlay // Tự động phát
                  muted // Tắt tiếng
                  loop // Lặp video
                  className="w-16 h-24 rounded-lg object-cover" // opacity-50 để tạo độ mờ nhẹ
                >
                  Trình duyệt của bạn không hỗ trợ video.
                </video>
                <span className="ml-2 text-sm line-clamp-2 overflow-hidden text-ellipsis">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={nextVideo}
            className={`w-full  py-2 rounded-md text-white font-bold mt-4 ${
              indexVideo >= newsVideo.length - 1
                ? "cursor-not-allowed bg-red-300"
                : "cursor-pointer bg-red-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveStream;
