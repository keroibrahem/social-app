import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserToggle from "../Componnts/UserToggle";
import Posts from "../Componnts/Posts";
import EditButton from "../Componnts/EditButton";

export default function UserProfile({
  getpostByIdUser,
  setloading,
  loading,
  getUserById,
  handleLikePost,
  handleDislikePost,
  handleDeletePost,
}) {
  const { id } = useParams();
  const [profuser, setProfuser] = useState(null);
  const [Allposts, setAllposts] = useState([]);
  const localUser = JSON.parse(localStorage.getItem("user"));
  const isyourprofaile = id === localUser?._id;

  // Load user
  useEffect(() => {
    const fetchUser = async () => {
      setloading(true);
      try {
        if (!isyourprofaile) {
          const response = await getUserById(id);
          setProfuser(response);
        } else {
          setProfuser(localUser);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setloading(false);
      }
    };

    fetchUser();
  }, [id]);

  // Load posts after user is fetched
  useEffect(() => {
    if (!profuser?.id && !profuser?._id) return;

    const fetchPosts = async () => {
      setloading(true);
      try {
        const userId = profuser.id || profuser._id;
        const response = await getpostByIdUser(userId);
        console.log("Posts response:", response); // تأكد من شكل الريسبونس هنا
        setAllposts(response || []);
        console.log("allpost", Allposts); // تأكد من شكل البيانات هنا
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setloading(false);
      }
    };

    fetchPosts();
  }, [profuser]);

  if (!profuser) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }
  console.log("profuser", profuser.id); // تأكد من شكل البيانات هنا

  return (
    <div className="container mx-auto py-6">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
        <div className="flex justify-end ">
          {
            isyourprofaile && (
              <Link to={`/userprofile/edit/${profuser.id}`}>
                <EditButton />
              </Link>
            )
          }
         
        </div>
        <div className="flex items-center mb-6">
          <UserToggle profel={profuser.profilePic} size={100} isOnline={isyourprofaile ? 1 : profuser.isOnline } />
          <div className="ml-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {profuser.first_name} {profuser.last_name}
            </h1>
            <p className="text-gray-600">{profuser.email}</p>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-gray-700">About</h2>
          <p className="text-gray-600 mt-2">
            {profuser.bio || "No bio available."}
          </p>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-gray-700">Gender</h2>
          <p className="text-gray-600 mt-2">
            {profuser.gender || "Not specified"}
          </p>
        </div>
      </div>

      <Posts
        posts={Allposts}
        loading={loading}
        handleLikePost={handleLikePost}
        handleDislikePost={handleDislikePost}
        handleDeletePost={handleDeletePost}
      />
    </div>
  );
}
