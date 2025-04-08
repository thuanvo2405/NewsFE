import { useState } from "react";
import "react-quill-new/dist/quill.snow.css"; // Import CSS của React Quill
import Editor from "./Editor";
import { useNavigate } from "react-router-dom"; // Thêm useNavigate để xử lý nút Hủy

const CreateNews = () => {
  const navigate = useNavigate(); // Dùng để điều hướng khi nhấn Hủy
  const [formData, setFormData] = useState({
    source: { id: null, name: "" },
    author: "Unknown",
    title: "",
    description: "",
    url: "",
    urlToImage: "",
    publishedAt: new Date().toISOString().slice(0, 16),
    content: "",
    video: null,
    category: "",
  });

  const [errors, setErrors] = useState({});

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "source") {
      setFormData({ ...formData, source: { ...formData.source, name: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleContentChange = (value) => {
    setFormData({ ...formData, content: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const formattedData = {
          ...formData,
          category: formData.category.split(",").map((item) => item.trim()),
        };

        const response = await fetch("https://newsserver-a71z.onrender.com/api/news", {
          method: "POST",
          body: JSON.stringify(formattedData),
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error("Lỗi khi gửi dữ liệu");

        console.log("Bài viết đã được thêm thành công!");
        navigate("/admin/listnew"); // Chuyển hướng sau khi thêm thành công
      } catch (error) {
        console.error("Error creating news:", error);
      }
    }
  };

  const handleCancel = () => {
    navigate("/admin/listnew"); // Quay lại danh sách bài viết khi nhấn Hủy
  };

  return (
    <div className="max-w-6xl mx-auto bg-gray-800 text-white p-8 rounded-xl shadow-2xl mt-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-300">
        Thêm Bài Viết Mới
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Source */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-300">
            Nguồn <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="source"
            placeholder="Nguồn bài viết"
            value={formData.source.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {errors.source && (
            <p className="text-red-400 text-sm mt-1">{errors.source}</p>
          )}
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-300">
            Tác giả
          </label>
          <input
            type="text"
            name="author"
            placeholder="Tác giả (mặc định: Unknown)"
            value={formData.author}
            onChange={handleChange}
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-300">
            Tiêu đề <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            placeholder="Tiêu đề bài viết"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {errors.title && (
            <p className="text-red-400 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-300">
            Mô tả <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            placeholder="Mô tả ngắn gọn về bài viết"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition h-24 resize-none"
          ></textarea>
          {errors.description && (
            <p className="text-red-400 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* URL */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-300">
            URL bài viết
          </label>
          <input
            type="url"
            name="url"
            placeholder="URL bài viết (nếu có)"
            value={formData.url}
            onChange={handleChange}
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* URL Image */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-300">
            URL hình ảnh <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            name="urlToImage"
            placeholder="URL hình ảnh minh họa"
            value={formData.urlToImage}
            onChange={handleChange}
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {errors.urlToImage && (
            <p className="text-red-400 text-sm mt-1">{errors.urlToImage}</p>
          )}
        </div>

        {/* Published Date */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-300">
            Ngày đăng
          </label>
          <input
            type="datetime-local"
            name="publishedAt"
            value={formData.publishedAt}
            onChange={handleChange}
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            readOnly
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-300">
            Nội dung <span className="text-red-500">*</span>
          </label>
          <Editor value={formData.content} onChange={handleContentChange} />
          {errors.content && (
            <p className="text-red-400 text-sm mt-1">{errors.content}</p>
          )}
        </div>

        {/* Video */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-300">
            URL video (tuỳ chọn)
          </label>
          <input
            type="text"
            name="video"
            placeholder="URL video (nếu có)"
            value={formData.video}
            onChange={handleChange}
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-300">
            Danh mục <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="category"
            placeholder="Danh mục (phân cách bằng dấu phẩy, ví dụ: Công nghệ, Thể thao)"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {errors.category && (
            <p className="text-red-400 text-sm mt-1">{errors.category}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Thêm Bài Viết
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNews;
