import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/login";
import NewAccount from "./pages/NewAccount";
import Registr from "./pages/registr";
import { ToastContainer, toast } from "react-toastify";
import Home from "./pages/home";
import Posts from "./Componnts/Posts";
import Formpost from "./Componnts/Formpost";
import UserProfile from "./pages/userprofaile";
import FormUpdateUser from "./Componnts/formUpdateuser";
import AuthMiddleware from "./pages/Middleware";
import { uploadImage } from "./utils/image.util";
// import Test from "./pages/test";

function App() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    gender: "Male",
  });

  const [formpost, setFormPost] = useState({
    content: "",
    image: "",
  });

  const [errors, setErrors] = useState({});
  const [user, setUser] = useState([]);
  const [Allposts, setPosts] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  const getAllPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/posts", {});
      // console.log("Posts fetched successfully:", response.data);
      setPosts(response.data); // تخزين البوستات في الحالة
    } catch (error) {
      console.error(
        "Error fetching posts:",
        error.response?.data || error.message
      );
      toast.error("Failed to fetch posts. Please try again.");
    }
    setloading(false);
  };
  const getUserById = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/auth/users/${userId}`,
        {}
      );

      // console.log("User fetched successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching user:",
        error.response?.data || error.message
      );
      // toast.error("Failed to fetch the user. Please try again.");
      return null;
    }
  };
  const getPostById = async (postId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/posts/${postId}`
      );
      // console.log("post fetched successfully:", response.data);
      // console.log("Put get data by id");
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching post:",
        error.response?.data || error.message
      );
      return null;
    }
  };

  const handleUpdatePost = async (e, id) => {
    setloading(true);
    e.preventDefault();

    let ImageUrl = "";
    if (formpost.image) {
      const file = formpost.image;
      if (file) {
        const url = await uploadImage(file);
        ImageUrl = url.imageUrl;
      }
    }

   
    // console.log("id", id);
    if (formpost.content === "") {
      setErrors("Post content cannot be empty!");
      return;
    }

    setErrors("");

    const updatedData = {
      content: formpost.content,
      image: ImageUrl,
    };
    
    try {
      const response = await axios.put(
        `http://localhost:5000/api/posts/${id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // console.log("Put updated successfully:", response.data);
      
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === Number(id) ? { ...post, ...updatedData } : post
    )
  );
  toast.success("Post updated successfully!");
  localStorage.removeItem("postId");
  setloading(false);
  navigate("/");
    } catch (error) {
      console.error(
        "Error updating post:",
        error.response?.data || error.message
      );
      toast.error("Failed to update post. Please try again.");
    }
  };

  const handleDeletePost = async (postId) => {
    console.log(postId);
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/posts/${postId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("Post deleted successfully:", response.data);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      toast.success("Post deleted successfully!");
    } catch (error) {
      console.error(
        "Error deleting post:",
        error.response?.data || error.message
      );
      toast.error("Failed to delete post. Please try again.");
    }
  };
  const handleLogout = async () => {
    const userId = JSON.parse(localStorage.getItem("user")).id; // الحصول على معرف المستخدم من localStorage

    try {
      await axios.put(`http://localhost:5000/api/auth/logout/${userId}`);
      // console.log("User logged out successfully!");

      // إزالة التوكن وبيانات المستخدم من localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      toast.success("Logged out successfully :(");
      navigate("/registr/login"); // إعادة التوجيه إلى صفحة تسجيل الدخول
    } catch (error) {
      console.error(
        "Error logging out:",
        error.response?.data || error.message
      );
      toast.error("Failed to log out. Please try again.");
    }
  };
  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/users",
        {}
      );
      // console.log("Users fetched successfully:", response.data);
      setUser(response.data);
    } catch (error) {
      console.error(
        "Error fetching users:",
        error.response?.data || error.message
      );
      toast.error("Failed to fetch user. Please try again.");
    }
  };
  useEffect(() => {
    // console.log("useEffect is working"); // للتأكد
    const fetchData = async () => {
      setloading(true);
      await getAllPosts();
      await getAllUsers();
      setloading(false);
    };

    fetchData();
  }, []);

  const getpostByIdUser = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/posts/user/${userId}`
      );
      // console.log("Posts by user fetched successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching posts by user:",
        error.response?.data || error.message
      );
      toast.error("Failed to fetch posts by user. Please try again.");
    }
  };
  const handleAddPost = async (e) => {
    setloading(true);
    e.preventDefault();
    if (formpost.content === "") {
      setErrors("Post content cannot be empty!");
      return;
    }

    setErrors("");

    let ImageUrl = "";
    if (formpost.image) {
      const file = formpost.image;
      if (file) {
        const url = await uploadImage(file);
        ImageUrl = url.imageUrl;
      }
    }

    const userId = JSON.parse(localStorage.getItem("user")).id;
    const postData = {
      content: formpost.content,
      image: ImageUrl,
      user_id: userId,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/posts",
        postData,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      toast.success("Post added successfully :)");
      
      setloading(false);
      navigate("/");
    } catch (error) {
      console.error(
        "Error adding post :",
        error.response?.data || error.message
      );
      toast.error("failed to add post :( ,please try agin");
    }
  };

  const handleLikePost = async (postId) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/posts/${postId}/like`,
        {}
      );
      // console.log("Post liked successfully:", response.data);

      // تحديث حالة البوستات بعد الإعجاب
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, likes_count: post.likes_count + 1 }
            : post
        )
      );
    } catch (error) {
      console.error(
        "Error liking post:",
        error.response?.data || error.message
      );
      toast.error("Failed to like the post. Please try again.");
    }
  };

  const handleDislikePost = async (postId) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/posts/${postId}/unlike`,
        {}
      );
      // console.log("Post disliked successfully:", response.data);

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, likes_count: post.likes_count - 1 }
            : post
        )
      );
    } catch (error) {
      console.error(
        "Error disliking post:",
        error.response?.data || error.message
      );
      toast.error("Failed to dislike the post. Please try again.");
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleChangeUser = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangePost = (e) => {
    setFormPost({
      ...formpost,
      [e.target.name]: e.target.value,
    });
  };

  const validateNewAccount = () => {
    const newErrors = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = "First Name is required.";
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const validateLogin = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    if (validateLogin()) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            email: formData.email,
            password: formData.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const token = response.data.token;
        localStorage.setItem("token", token);
        const datauser = {
          id: response.data.user.id,
          first_name: response.data.user.first_name,
          last_name: response.data.user.last_name,
          email: response.data.user.email,
          profilePic: response.data.user.profilePic,
          gender: response.data.user.gender,
          bio: response.data.user.bio,
          isOnline: 1,
        };
        localStorage.setItem("user", JSON.stringify(datauser));
        // console.log("Login Response:", response.data);
        setUser(datauser);
        toast.success("Login successful!");

        navigate("/");
      } catch (error) {
        console.error(
          "Error logging in:",
          error.response?.data || error.message
        );
        toast.error(
          error.response?.data?.error || "Failed to log in. Please try again."
        );
      }
    }
  };

  const handleSubmitNewAccount = async (e) => {
    e.preventDefault();
    if (validateNewAccount()) {
      // console.log("Form Data:", formData);
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/register",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // console.log("Server Response:", response.data);
        setUser(response.data.user);
        toast.success("Account created successfully :)");
        navigate("/registr/login");
      } catch (error) {
        console.error(
          "Error submitting form:",
          error.response?.data || error.message
        );
        alert("Failed to create account. Please try again.");
      }
    }
  };
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <AuthMiddleware>
              <Home handleLogout={handleLogout} />
            </AuthMiddleware>
          }
        >
          <Route
            index
            element={
              <Posts
                users={user}
                posts={Allposts}
                loading={loading}
                handleLikePost={handleLikePost}
                handleDislikePost={handleDislikePost}
                getUserById={getUserById}
                handleDeletePost={handleDeletePost}
              />
            }
          />
          <Route
            path="AddPost"
            element={
              <Formpost
                loading={loading}
                formpost={formpost}
                handleChange={handleChangePost}
                setFormPost={setFormPost}
                handle={handleAddPost}
                errors={errors}
                setErrors={setErrors}
              />
            }
          />
          <Route
            path="EditPost/:id"
            element={
              <Formpost
                loading={loading}
                formpost={formpost}
                handleChange={handleChangePost}
                handle={handleUpdatePost}
                errors={errors}
                getPostById={getPostById}
                setFormPost={setFormPost}
                setErrors={setErrors}
              />
            }
          />
          <Route path="/userprofile/edit/:id" element={<FormUpdateUser loading={loading} />} />
          <Route
            path="user/:id"
            element={
              <UserProfile
                getUserById={getUserById}
                getpostByIdUser={getpostByIdUser}
                loading={loading}
                setloading={setloading}
                handleLikePost={handleLikePost}
                handleDislikePost={handleDislikePost}
                handleDeletePost={handleDeletePost}
              />
            }
          />
          <Route
            path="userprofile"
            element={
              <UserProfile
                getUserById={getUserById}
                getpostByIdUser={getpostByIdUser}
                loading={loading}
                setloading={setloading}
                handleLikePost={handleLikePost}
                handleDislikePost={handleDislikePost}
                handleDeletePost={handleDeletePost}
              />
            }
          />
        </Route>
        <Route path="/registr" element={<Registr />}>
          <Route index element={<Navigate to="login" />} />
          <Route
            path="login"
            element={
              <Login
                formData={formData}
                errors={errors}
                handleChange={handleChangeUser}
                handleSubmit={handleSubmitLogin}
                togglePasswordVisibility={togglePasswordVisibility}
                showPassword={showPassword}
              />
            }
          />
          <Route
            path="signup"
            element={
              <NewAccount
                formData={formData}
                errors={errors}
                handleChange={handleChangeUser}
                handleSubmit={handleSubmitNewAccount}
                togglePasswordVisibility={togglePasswordVisibility}
                showPassword={showPassword}
              />
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
