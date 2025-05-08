import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { uploadImage, deleteImage } from "../utils/image.util";
export default function FormUpdateUser({loading}) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    profilePic: "",
    bio: "",
    gender: "",
  });
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const user_id = JSON.parse(localStorage.getItem("user")).id;
  const [localImage, setLocalImage] = useState(null);
  useEffect(() => {
    if (formData.profilePic && typeof formData.profilePic === "object") {
      setLocalImage(URL.createObjectURL(formData.profilePic));
    }
  }, [formData.profilePic]);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user")); // قراءة بيانات المستخدم من localStorage
    if (localUser) {
      setFormData({
        first_name: localUser.first_name,
        last_name: localUser.last_name,
        email: localUser.email,
        profilePic: localUser.profilePic || "",
        bio: localUser.bio || "",
        gender: localUser.gender,
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.first_name || !formData.last_name || !formData.email) {
      setErrors("First name, last name, and email are required!");
      return;
    }

    let ImageUrl = "";
    if (formData.profilePic) {
      const file = formData.profilePic;
      if (file) {
        const url = await uploadImage(file);
        ImageUrl = url.imageUrl;
      }
    }

    const updatedData = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      profilePic: ImageUrl,
      bio: formData.bio,
      gender: formData.gender,
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/api/auth/users/edit/${
          JSON.parse(localStorage.getItem("user")).id
        }`, // استخدم ID المستخدم من البيانات
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("User updated successfully:", response.data);

      // تحديث بيانات المستخدم في localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({ id: user_id, ...updatedData })
      );

      toast.success("User updated successfully!");
      navigate(`/userprofile`); // إعادة التوجيه إلى صفحة البروفايل
    } catch (error) {
      console.error(
        "Error updating user:",
        error.response?.data || error.message
      );
      setErrors("Failed to update user. Please try again.");
    }
  };
  console.log("formdata", formData);

  if(loading){
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Update User</h2>

      {errors && <p className="text-red-500 text-sm mb-4">{errors}</p>}

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          First Name
        </label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Last Name
        </label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Upload Image
        </label>
        {formData.profilePic || formData.profilePic !== "" ? (
          <div className="relative">
            <img src={localImage || formData.profilePic} alt="Uploaded Image" />
            <button
              type="button"
              onClick={() => setFormData({ ...formData, profilePic: "" })}
              className="flex items-center justify-center absolute top-0 right-0 w-6 aspect-square bg-red-500 text-white rounded-xl hover:bg-red-600"
            >
              <p>x</p>
            </button>
          </div>
        ) : (
          <input
            type="file"
            accept="image/*"
            className=" file-input"
            name="image"
            value={formData.profilePic}
            onChange={(e) => {
              setFormData({
                ...formData,
                profilePic: e.target.files[0],
              });
            }}
          />
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        ></textarea>
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => navigate(`/profile/${formData.id}`)}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Update
        </button>
      </div>
    </form>
  );
}
