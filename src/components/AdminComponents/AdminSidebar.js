import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const AdminSidebar = () => {
    const location = useLocation();

  return (
    <div className="fixed left-0  flex">
      <aside
        id="default-sidebar"
        className="transition-transform -translate-x-0 sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="bg-blue-100 dark:bg-gray-800 w-40">
          <ul className="h-screen relative flex flex-col space-y-1 font-medium">
            <li>
              <Link
                to="/admin-home-page"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group ${
                  location.pathname === "/admin-home-page" ? "bg-teal-200" : ""
                }`}
              >
                <span class="ms-3 text-xl font-semibold">Teachers</span>
              </Link>
            </li>
            <li>
              <Link
                to="sessions"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group ${
                  location.pathname === "/admin-home-page/sessions" ? "bg-teal-200" : ""
                }`}
              >
                <span class="ms-3 text-xl font-semibold">Sessions</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
  
}

export default AdminSidebar