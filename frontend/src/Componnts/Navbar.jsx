import React from "react";
import NotFicationToggle from "./NotficationToggle";
import UserToggle from "./UserToggle";
import { useState,useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar({profilePic ,handleLogout}) {
    const [fullName, setFullName] = useState(null);
    
    
    useEffect(() => {
      
      const storedUser = JSON.parse(localStorage.getItem("user"));
      
        if (storedUser && storedUser.first_name) {
            setFullName(storedUser.first_name +" "+ storedUser.last_name); // تعيين اسم المستخدم
        }
    }, []);
  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      {/* القسم الأيسر */}
      <NavLink to={"/"} className="navbar-start">
      <div className="navbar-start text-2xl font-bold text-blue-600">
        Facebook
      </div>
      </NavLink>
      <div className="navbar-end">
        <div className="flex space-x-4 m-3">
          <button className="btn btn-ghost btn-circle">
           <NotFicationToggle />
          </button>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <UserToggle profel={profilePic}  size={35} isOnline={1}/>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <NavLink to={"/userprofile"} className="font-bold text-blue-600 ">{fullName ? fullName:"profile"}</NavLink>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
            <button className="btn btn-ghost" onClick={handleLogout}>Logout</button>
              
            </li>
          </ul>
        </div>
      </div>
      {/* <div className="indicator">
  <span className="indicator-item status status-success"></span>
  <div className="bg-base-300 grid h-32 w-32 place-items-center">content</div>
</div> green point
<div className="indicator">
  <span className="indicator-item badge badge-secondary">12</span>
  <button className="btn">inbox</button>
</div> notification
*/}
    </div>
  );
}
