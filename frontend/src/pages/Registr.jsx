import React  from "react";
import { Outlet } from "react-router-dom"; // Import Outlet from react-router-dom

export default function Registr() {
  

  return (
    <>
      <div className="flex flex-col  items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-blue-600">facebook</h1>
          <p className="text-lg text-gray-700">
          Connect with friends and the world around you.
        </p>
        </div>
        <Outlet/>  
      </div>
    </>
    
  );
}
