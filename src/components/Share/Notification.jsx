import React, { useEffect } from "react";

const Notification = ({ message, type = "info", onClose, duration = 3000 }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer); // Dọn dẹp timer khi component unmount
    }
  }, [message, duration, onClose]);

  if (!message) return null;

  const bgColor =
    {
      success: "bg-green-500",
      error: "bg-red-500",
      info: "bg-blue-500",
    }[type] || "bg-gray-500";

  return (
    <div
      className={`${bgColor} text-white p-4 rounded-md shadow-md fixed top-4 right-4 z-50 flex items-center justify-between w-80`}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-white hover:text-gray-200 focus:outline-none"
      >
        ✕
      </button>
    </div>
  );
};

export default Notification;
