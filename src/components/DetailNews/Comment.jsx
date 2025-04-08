import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Notification from "../Share/Notification";

const Comment = ({ user, refreshNews }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const { id } = useParams();
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);

  const toggleOptions = (commentId) => {
    setActiveCommentId(activeCommentId === commentId ? null : commentId);
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => hideNotification(), 3000);
  };

  const hideNotification = () => {
    setNotification({ message: "", type: "" });
  };

  const fetchComments = async () => {
    try {
      const res = await fetch(
        `https://newsserver-a71z.onrender.com/api/news/${id}/comments/users`
      );
      const data = await res.json();
      setComments(data.data);
    } catch (error) {
      showNotification("Lỗi khi tải bình luận!", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      showNotification("Vui lòng nhập nội dung bình luận!", "error");
      return;
    }
    if (!user) {
      showNotification("Bạn cần đăng nhập để bình luận!", "error");
      return;
    }
    if (editingCommentId) {
      await handleUpdate(editingCommentId);
    } else {
      try {
        const response = await fetch(
          `https://newsserver-a71z.onrender.com/api/news/${id}/comment`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user._id, text: comment }),
          }
        );
        const result = await response.json();
        if (response.ok) {
          setComment("");
          showNotification("Thêm bình luận thành công!", "success");
          fetchComments();
          await refreshNews();
        } else {
          showNotification(result.message || "Có lỗi xảy ra!", "error");
        }
      } catch (error) {
        showNotification("Lỗi server, vui lòng thử lại!", error);
      }
    }
  };

  const handleDelete = async (commentId) => {
    try {
      const response = await fetch(
        `https://newsserver-a71z.onrender.com/api/news/${id}/comment`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ commentId }),
        }
      );
      if (response.ok) {
        showNotification("Xóa bình luận thành công!", "success");
        fetchComments();
        await refreshNews();
      } else {
        const result = await response.json();
        showNotification(result.message || "Có lỗi xảy ra!", "error");
      }
    } catch (error) {
      showNotification("Lỗi khi xóa bình luận!", error);
    }
  };

  const handleEdit = (commentId, text) => {
    setEditingCommentId(commentId);
    setComment(text);
    setActiveCommentId(null);
  };

  const handleUpdate = async (commentId) => {
    try {
      const response = await fetch(
        `https://newsserver-a71z.onrender.com/api/news/${id}/comment/${commentId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: comment }),
        }
      );
      if (response.ok) {
        showNotification("Cập nhật bình luận thành công!", "success");
        fetchComments();
        setComment("");
        setEditingCommentId(null);
        await refreshNews();
      } else {
        const result = await response.json();
        showNotification(result.message || "Có lỗi xảy ra!", "error");
      }
    } catch (error) {
      showNotification("Lỗi khi cập nhật bình luận!", error);
    }
  };

  return (
    <>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={hideNotification}
      />
      <div className="mx-auto w-3/5 border p-4">
        {comments.length > 0 ? (
          comments.map((commentItem) => (
            <div
              key={commentItem.commentId}
              className="mb-4 border my-4 p-4 relative"
            >
              <div className="flex items-center gap-4">
                <img
                  src={commentItem?.avatar}
                  alt="User"
                  className="rounded-full w-8 h-8"
                />
                <p>{commentItem?.name || "Anonymous"}</p>
                {user && user._id === commentItem.userId && (
                  <div className="ml-auto relative">
                    <i
                      className="fa-solid fa-ellipsis cursor-pointer"
                      onClick={() => toggleOptions(commentItem.commentId)}
                    ></i>
                    {activeCommentId === commentItem.commentId && (
                      <div className="absolute right-0 mt-2 w-24 bg-white border rounded-lg shadow-lg z-10">
                        <p
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() =>
                            handleEdit(
                              commentItem.commentId,
                              commentItem.commentText
                            )
                          }
                        >
                          Edit
                        </p>
                        <p
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleDelete(commentItem.commentId)}
                        >
                          Delete
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="mt-2 text-justify">{commentItem.commentText}</div>
              <small className="text-gray-500">
                {new Date(commentItem.createdAt).toLocaleString()}
              </small>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Chưa có bình luận nào.</p>
        )}
      </div>

      {user ? (
        <div className="mx-auto mt-4 w-3/5 border p-4">
          <form className="mt-4" onSubmit={handleSubmit}>
            <textarea
              className="w-full h-24 p-2 border rounded-md"
              placeholder="Viết bình luận..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <div className="flex justify-between mt-2">
              <button
                type="submit"
                className="bg-amber-300 px-4 py-1 rounded-2xl"
              >
                {editingCommentId ? "Cập nhật" : "Gửi"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button className="border rounded-2xl py-2 w-1/2 mt-4 block mx-auto">
          Đăng nhập để bình luận
        </button>
      )}
    </>
  );
};

export default Comment;
