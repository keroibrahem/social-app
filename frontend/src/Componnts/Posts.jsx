import React, { useState , useEffect } from "react";
import UserToggle from "./UserToggle";
import LikeToggle from "./LikeToggle";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import SindToggle from "./SindToggle";
import CommentButton from "./CommentButton";
import LodingPost from "./LodingPost";
import { useNavigate }   from "react-router";
import { Link, NavLink } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
export default function Posts({
  posts,
  loading,
  handleLikePost,
  handleDislikePost,
  handleDeletePost
}) {
  const navigate = useNavigate();
  const currentUserId = JSON.parse(localStorage.getItem("user")).id;
  const [showComments, setShowComments] = useState(false);
  const [first_name, setFirst_name] = useState(null);
  
   useEffect(() => {
       const storedUser = JSON.parse(localStorage.getItem("user"));
      
       if (storedUser && storedUser.first_name) {
         setFirst_name(storedUser.first_name);
       }
     }, []);
  // console.log("Users:", users);
  const toggleComments = (postId) => {
    setShowComments(!showComments);
  };
  console.log("posts:",posts);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LodingPost />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-xl font-semibold">No posts found</p>
      </div>
    );
  }

  return (
    <>
    <div className="container mx-auto py-6">
     <h1 className="text-3xl  font-bold text-center text-blue-600 mb-6">
            Welcome, {first_name ? first_name : "Guest"}!
    </h1>
    <div className="flex justify-end mb-4">
    <button
      onClick={() => navigate("/AddPost")} // فتح نافذة إضافة البوست
      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
    >
      Add Post
    </button>
  </div>
      <div className="flex flex-col gap-6">
        {posts.map((post) => {
          console.log("Post:", post);
          // const user = users.length > 0 ?users.find((u) => u.id === post.user_id): users;

          return (
            <div
              key={post.id}
              className="bg-white shadow-md rounded-lg p-4 w-full max-w-2xl mx-auto"
            >
              {/* معلومات المستخدم */}
              <Link to={`/user/${post.user_id}`} className="flex items-center mb-4">
              <div className="flex items-center mb-4">
                <UserToggle profel={post?.profilePic} size={80} isOnline={post.isOnline} />
                <div className="flex flex-col  ml-1">

                <p className="text-gray-800 text-2xl font-semibold ">
                {post.user_id === currentUserId ? "You" :
                  (post.first_name && post.last_name
                
                    ? `${post.first_name} ${post.last_name}`
                    : "Unknown User"
                  )
                  }
                </p>
                
                <p className=" text-gray-600 text-sm ml-0.5 ">
                  {formatDistanceToNow(new Date(post.created_at), {
                    addSuffix: true,
                  })}
                </p>
                </div>

              </div>
              </Link>
              {/* محتوى البوست */}
              <div className="mb-4">
                <p className="text-gray-800 text-xl">{post.content}</p>
              </div>

              {/* صورة البوست */}
              {post.image!==" " && (
                <div className="mb-4  max-w-100 max-h-160 mx-auto">
                  <img
                    src={post.image}
                    alt="Post"
                    className=" max-w-100 max-h-160  object-cover rounded-lg"
                  />
                </div>
              )}

              {/* التعليقات والإعجابات */}
              <div className="flex items-center justify-between m-3">
                <div className="flex gap-x-12 items-center">
                  {post.user_id === currentUserId && (
                    <div className="flex gap-x-12 items-center">
                      <DeleteButton handleDeletePost={handleDeletePost} id={post.id} />
                      <Link to={`/EditPost/${post.id}`}> 
                      <EditButton />
                      </Link>
                    </div>
                  )}
                  <button
                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                    onClick={() => toggleComments(post.id)}
                  >
                    <CommentButton />
                  </button>
                </div>
                <div className="flex items-center ml-auto">
                  <LikeToggle
                    postId={post.id} 
                    likesCount={post.likes_count} 
                    handleLikePost={handleLikePost}
                    handleDislikePost={handleDislikePost} 
                  />
                  <p className="text-xl text-gray-600 ml-2">
                    {post.likes_count} Likes
                  </p>
                </div>
              </div>
              {showComments && (
                <div className="flex flex-col items-start mb-4 w-full">
                  {/* حاوية التعليقات */}
                  <div className="bg-gray-100 w-full pt-4 pb-3 px-4 rounded-lg shadow-md mb-4">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">
                      Comments
                    </h2>
                    {/* قائمة التعليقات */}
                    <div className="space-y-3">
                      {/* مثال على تعليق */}
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>{" "}
                        {/* صورة المستخدم */}
                        <p className="text-gray-800 bg-white p-2 rounded-lg shadow-sm w-full">
                          This is a sample comment.
                        </p>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                        <p className="text-gray-800 bg-white p-2 rounded-lg shadow-sm w-full">
                          Another comment goes here.
                        </p>
                      </div>
                    </div>
                  </div>

                  
                  <div className="flex items-center w-full gap-3">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <SindToggle />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
</>
  );
}
{
  /* قسم التعليقات */
}
{
  /* {showComments && (
            <div className="flex flex-col w-200 items-center mb-4">
            <div className="bg-gray-100 w-190 pt-4 px-3 m-1 rounded-lg shadow-md mb-4">
                <h2 className="text-xl font-semibold mb-2">Comments</h2>
                {post.comments.map((comment) => (
                  <div key={comment.id} className="mb-2">
                    <p className="text-gray-800">{comment.text}</p>
                    </div>
                ))}
              </div>
              <div className="flex w-180 items-center mb-4">
              <input
              type="text"
              placeholder="Add a comment..."
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full mr-2"
                />
                <SindToggle />
              </div>
            </div>
          )} */
}
