import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const Editor = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  // Tùy chỉnh style cho React Quill
  const quillStyles = `
    .ql-container {
      background-color: #1f2937; /* bg-gray-700 */
      border: 1px solid #4b5563; /* border-gray-600 */
      border-radius: 0.5rem;
      color: #ffffff; /* text-white */
      min-height: 400px; /* Tăng chiều cao */
      font-size: 1.125rem; /* Tăng font chữ (text-lg) */
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Thêm bóng đổ nhẹ */
    }
    .ql-toolbar {
      background-color: #374151; /* bg-gray-600 */
      border: 1px solid #4b5563; /* border-gray-600 */
      border-bottom: none;
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
      padding: 8px 12px; /* Tăng padding cho toolbar */
    }
    .ql-editor {
      min-height: 360px; /* Tăng chiều cao khu vực nhập liệu */
      color: #ffffff; /* text-white */
      padding: 16px; /* Tăng padding bên trong */
      line-height: 1.75; /* Tăng khoảng cách dòng cho dễ đọc */
    }
    .ql-editor::before {
      color: #9ca3af; /* text-gray-400 */
      font-style: italic;
      font-size: 1.125rem; /* Tăng font chữ placeholder */
    }
    .ql-editor:focus {
      outline: none;
      box-shadow: inset 0 0 0 2px #3b82f6; /* Hiệu ứng focus với viền xanh (blue-500) */
    }
    .ql-picker-label, .ql-picker-item {
      color: #ffffff !important; /* Đảm bảo chữ trong dropdown trắng */
    }
    .ql-snow .ql-stroke {
      stroke: #d1d5db; /* Màu icon xám nhạt (gray-300) */
    }
    .ql-snow .ql-fill {
      fill: #d1d5db; /* Màu fill của icon xám nhạt */
    }
    .ql-snow .ql-toolbar button:hover .ql-stroke,
    .ql-snow .ql-toolbar button.ql-active .ql-stroke {
      stroke: #3b82f6; /* Màu xanh khi hover hoặc active (blue-500) */
    }
    .ql-snow .ql-toolbar button:hover .ql-fill,
    .ql-snow .ql-toolbar button.ql-active .ql-fill {
      fill: #3b82f6; /* Màu xanh khi hover hoặc active */
    }
    .ql-snow .ql-picker-label:hover,
    .ql-snow .ql-picker-label.ql-active {
      color: #3b82f6 !important; /* Màu xanh khi hover hoặc active cho dropdown */
    }
    .ql-snow .ql-picker-item:hover {
      color: #3b82f6 !important; /* Màu xanh khi hover cho các mục trong dropdown */
    }
    .ql-snow .ql-picker-options {
      background-color: #374151; /* bg-gray-600 */
      border: 1px solid #4b5563; /* border-gray-600 */
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* Thêm bóng đổ cho dropdown */
    }
    .ql-toolbar .ql-formats {
      margin-right: 16px; /* Tăng khoảng cách giữa các nhóm nút trong toolbar */
    }
  `;

  return (
    <div className="relative">
      {/* Thêm style tùy chỉnh */}
      <style>{quillStyles}</style>
      <ReactQuill
        value={value}
        onChange={onChange}
        modules={modules}
        theme="snow"
        placeholder="Viết nội dung bài báo của bạn tại đây..."
        className="rounded-lg"
      />
    </div>
  );
};

export default Editor;
