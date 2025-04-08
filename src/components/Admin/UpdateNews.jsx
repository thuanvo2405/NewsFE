import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "react-quill-new/dist/quill.snow.css"; // Import CSS của React Quill
import Editor from "./Editor";

const UpdateNews = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    source: { id: null, name: "" },
    author: "",
    title: "",
    description: "",
    url: "",
    urlToImage: "",
    publishedAt: "",
    content: "",
    video: null,
    category: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // Trạng thái khi gửi form

  // Lấy dữ liệu bài viết từ server khi component được mount
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`https://newsserver-a71z.onrender.com/api/news/${id}`);
        if (!response.ok) throw new Error("Không thể lấy dữ liệu bài viết");
        const data = await response.json();
        setFormData({
          source: {
            id: data.source?.id || null,
            name: data.source?.name || "",
          },
          author: data.author || "Unknown",
          title: data.title || "",
          description: data.description || "",
          url: data.url || "",
          urlToImage: data.urlToImage || "",
          publishedAt: data.publishedAt
            ? new Date(data.publishedAt).toISOString().slice(0, 16)
            : "",
          content: data.content || "",
          video: data.video || "",
          category: data.category || "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        setLoading(false);
      }
    };
    fetchNews();
  }, [id]);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "source") {
      setFormData({ ...formData, source: { ...formData.source, name: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Xử lý thay đổi nội dung từ Editor
  const handleContentChange = (value) => {
    setFormData({ ...formData, content: value });
  };

  // Xác thực dữ liệu
  const validate = () => {
    let newErrors = {};
    if (!formData.source.name) newErrors.source = "Nguồn là bắt buộc.";
    if (!formData.title) newErrors.title = "Tiêu đề là bắt buộc.";
    if (!formData.description) newErrors.description = "Mô tả là bắt buộc.";
    if (!formData.urlToImage)
      newErrors.urlToImage = "URL hình ảnh là bắt buộc.";
    if (!formData.content) newErrors.content = "Nội dung là bắt buộc.";
    if (!formData.category) newErrors.category = "Danh mục là bắt buộc.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Gửi dữ liệu cập nhật lên server
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      try {
        const response = await fetch(`https://newsserver-a71z.onrender.com/api/news/${id}`, {
          method: "PUT",
          body: JSON.stringify(formData),
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error("Lỗi khi cập nhật dữ liệu");

        console.log("Bài viết đã được cập nhật thành công!");
        navigate("/admin/listnew"); // Quay lại danh sách sau khi cập nhật
      } catch (error) {
        console.error("Lỗi khi cập nhật tin tức:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Xử lý nút Hủy
  const handleCancel = () => {
    navigate("/admin/listnew");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex items-center space-x-2">
          <svg
            className="animate-spin h-6 w-6 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8h-8z"
            ></path>
          </svg>
          <span className="text-lg text-gray-700">Đang tải...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-800 p-8 rounded-xl shadow-lg mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Cập Nhật Bài Viết
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Source */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Nguồn <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="source"
            placeholder="Nguồn bài viết"
            value={formData.source.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {errors.source && (
            <p className="text-red-500 text-sm mt-1">{errors.source}</p>
          )}
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Tác giả
          </label>
          <input
            type="text"
            name="author"
            placeholder="Tác giả (mặc định: Unknown)"
            value={formData.author}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Tiêu đề <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            placeholder="Tiêu đề bài viết"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Mô tả <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            placeholder="Mô tả ngắn gọn về bài viết"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition h-28 resize-none"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* URL */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            URL bài viết
          </label>
          <input
            type="url"
            name="url"
            placeholder="URL bài viết (nếu có)"
            value={formData.url}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* URL Image */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            URL hình ảnh <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            name="urlToImage"
            placeholder="URL hình ảnh minh họa"
            value={formData.urlToImage}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {errors.urlToImage && (
            <p className="text-red-500 text-sm mt-1">{errors.urlToImage}</p>
          )}
        </div>

        {/* Published Date */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Ngày đăng
          </label>
          <input
            type="datetime-local"
            name="publishedAt"
            value={formData.publishedAt}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Nội dung <span className="text-red-500">*</span>
          </label>
          <Editor value={formData.content} onChange={handleContentChange} />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">{errors.content}</p>
          )}
        </div>

        {/* Video */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            URL video (tuỳ chọn)
          </label>
          <input
            type="text"
            name="video"
            placeholder="URL video (nếu có)"
            value={formData.video}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Danh mục <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="category"
            placeholder="Danh mục (phân cách bằng dấu phẩy, ví dụ: Công nghệ, Thể thao)"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
            disabled={isSubmitting}
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8h-8z"
                ></path>
              </svg>
            ) : null}
            {isSubmitting ? "Đang cập nhật..." : "Cập Nhật Bài Viết"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateNews;
