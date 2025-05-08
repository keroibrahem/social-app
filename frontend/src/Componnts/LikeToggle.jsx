import React, { useState } from "react";

export default function LikeToggle({ postId, likesCount, handleLikePost, handleDislikePost }) {
  const [liked, setLiked] = useState(false); // حالة الإعجاب

  const toggleLike = () => {
    if (liked) {
      handleDislikePost(postId); // استدعاء دالة إلغاء الإعجاب
    } else {
      handleLikePost(postId); // استدعاء دالة الإعجاب
    }
    setLiked(!liked); // تحديث حالة الإعجاب
  };

  return (
    <button onClick={toggleLike} className="focus:outline-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={liked ? "red" : "none"} // تغيير اللون بناءً على حالة الإعجاب
        stroke="red"
        strokeWidth="2"
        className="w-8 h-8 cursor-pointer"
      >
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </svg>
    </button>
  );
}