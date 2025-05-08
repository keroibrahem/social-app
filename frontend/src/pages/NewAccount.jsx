import React from "react";
import HiddenToggle from "../Componnts/HiddenToggle";
import ShowToggle from "../Componnts/ShowToggle";
export default function NewAccount({ formData, errors, handleChange, handleSubmit ,togglePasswordVisibility, showPassword }) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Create a new account
        </h1>
        <p className="text-gray-600">It's quick and easy.</p>
        <hr className="mt-4 border-gray-300" />
      </div>
      <div className="flex space-x-4">
        <div className="w-1/2">
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="First Name"
          />
          {errors.first_name && (
            <p className="text-red-500 text-sm">{errors.first_name}</p>
          )}
        </div>
        <div className="w-1/2">
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Last Name"
          />
          {errors.last_name && (
            <p className="text-red-500 text-sm">{errors.last_name}</p>
          )}
        </div>
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">Gender:</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="email address"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email}</p>
        )}
      </div>
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
          {showPassword ? <HiddenToggle/> :<ShowToggle/>}
        </button>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="px-5 bg-green-600 text-white py-3 rounded-md hover:bg-green-700"
        >
          Sign Up
        </button>
      </div>
    </form>
    <div className="text-center mt-6">
      <a
        href="/registr/login"
        className="text-blue-600 text-lg font-medium hover:underline"
      >
        Already have an account?
      </a>
    </div>
  </div>
  );
}