import React from "react";
import { Link } from "react-router";
import HiddenToggle from "../Componnts/HiddenToggle";
import ShowToggle from "../Componnts/ShowToggle";


export default function Login({
  formData,
  errors,
  handleChange,
  handleSubmit,
  togglePasswordVisibility,
  showPassword,
}) {
  return (
    <div className="bg-white p-6  rounded-lg shadow-md w-full max-w-sm">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email or Phone"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="New Password"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-2 text-gray-600 hover:text-gray-800"
          >
            {showPassword ? <HiddenToggle /> : <ShowToggle />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Log In
        </button>
      </form>
      <div className="text-center mt-4">
        <a href="#" className="text-blue-600 hover:underline">
          Forgot Password?
        </a>
      </div>
      <hr className="my-4" />
      <div className="text-center">
        <Link to="/registr/signup" className="text-blue-600 hover:underline">
          <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
            Create New Account
          </button>
        </Link>
      </div>
    </div>
  );
}
