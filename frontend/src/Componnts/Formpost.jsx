import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { uploadImage, deleteImage } from "../utils/image.util";

export default function FormPost({
  loading,
  formpost,
  handleChange,
  handle,
  errors,
  setErrors,
  setFormPost,
  getPostById,
}) {
  const location = useLocation();
  const { id } = useParams();
  const isAdd = location.pathname.includes("AddPost");
  // const [isLoading, setIsLoading] = useState(false);

  // const handleImageChange = async (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setIsLoading(true);
  //     const url = await uploadImage(file);
  //     setFormPost({
  //       ...formpost,
  //       image: url.imageUrl,
  //     });
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    if (!isAdd && id) {
      // إذا كنت في وضع التعديل، قم بجلب بيانات البوست
      const fetchPost = async () => {
        const oldPost = await getPostById(id);
        setFormPost({
          content: oldPost.content,
          image: oldPost.image,
        }); // تحديث الحقول في النموذج
      };
      fetchPost();
    }
  }, []);

  const [localImage, setLocalImage] = useState(null);
  useEffect(() => {
    if (formpost.image && typeof formpost.image === "object") {
      setLocalImage(URL.createObjectURL(formpost.image));
    }
  }, [formpost.image]);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  return (
    <form
      onSubmit={isAdd ? handle : (e) => handle(e, id)} // استخدام الدالة المناسبة حسب الحالة
      className="bg-white p-6 rounded-lg shadow-md w-full  max-w-2xl mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        {" "}
        {isAdd ? "Add New Post" : "Update Post"}
      </h2>

      {/* حقل إدخال النص */}
      <textarea
        name="content"
        value={formpost.content || ""}
        onChange={handleChange} // تحديث الحالة عند الكتابة
        placeholder="Write your post here..."
        className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="4"
      ></textarea>
      {typeof errors === "string" && (
        <p className="text-red-500 text-sm mb-4">{errors}</p> // عرض رسالة الخطأ إذا كانت نصًا
      )}

      {/* حقل رفع الصورة */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Upload Image
        </label>
        {/* <input
          type="text"
          name="image"
          value={formpost.image|| ""}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        /> */}
        {
          formpost.image ? (
            <div className="relative max-w-160 max-h-160 rounded-lg overflow-hidden border border-gray-300">
              <img src={localImage || formpost.image} alt="Uploaded Image" />
              <button
                type="button"
                onClick={() => setFormPost({ ...formpost, image: "" })}
                className="flex items-center justify-center absolute top-0 right-0 w-6 aspect-square bg-red-500 text-white rounded-xl hover:bg-red-600"
              >
                <p>x</p> 
              </button>
            </div>
          ) : (
            <input
              type="file"
              accept="image/*"
              className=" block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                 file:rounded-full file:border-0
                 file:text-sm file:font-semibold
                 file:bg-blue-500 file:text-white
                 hover:file:bg-blue-600"
              name="image"
              value={formpost.image}
              onChange={(e) => {
                setFormPost({
                  ...formpost,
                  image: e.target.files[0],
                })
              }}
            />
          )
        }
      </div>

      {/* الأزرار */}
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => {
            setErrors("");
            formpost("");
          }}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
         {isAdd ? "Add Post" : "Update Post"}
        </button>
      </div>
    </form>
  );
}
