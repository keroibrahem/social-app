import React from "react";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Componnts/Navbar";



export default function Home({handleLogout}) {
  const [profilePic, setProfilePic] = useState(null);
 
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.profilePic) {
      setProfilePic(storedUser.profilePic);
    }
   
  }, []);

  return (
    <>
      <div className="bg-gray-100  flex flex-col items-center justify-center">
        {/* Navbar */}
        <Navbar profilePic={profilePic} handleLogout={handleLogout} />

        {/* Main Content */}
        <div className="container mx-auto py-6">
       

          {/* Posts */}
          {/* <div className="flex items-center justify-center ">
          {/* <div className="flex justify-center">
            <div className="text-center mt-6">
              <LodingPost />
            </div>
          </div> */}
          <div className="flex items-center justify-center ">
            {/* <Posts
              users={user}
              posts={posts}
              loading={loading}
              handleLikePost={handleLikePost}
              handleDislikePost={handleDislikePost}
              getUserById={getUserById}
            /> */}
            <Outlet/>
          </div>
        </div>
      </div>
    </>
  );
}
