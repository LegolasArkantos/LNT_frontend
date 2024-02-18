import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const AdminSidebar = () => {
    const location = useLocation();

  return (
    <div className="fixed top-0 left-0 z-40 flex">
      <aside
        id="default-sidebar"
        className="transition-transform -translate-x-0 sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="bg-blue-100 dark:bg-gray-800 w-40">
          <ul className="h-screen relative flex flex-col space-y-5 font-medium">
            <li>
              <Link
                to="/admin-home-page"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group ${
                  location.pathname === "/admin-home-page" ? "bg-teal-200" : ""
                }`}
              >
                <svg
                  width="20px"
                  height="20px"
                  viewBox="-2 0 21 21"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <title>home [#1392]</title>{" "}
                    <desc>Created with Sketch.</desc> <defs> </defs>{" "}
                    <g
                      id="Page-1"
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g
                        id="Dribbble-Light-Preview"
                        transform="translate(-381.000000, -720.000000)"
                        fill="#000000"
                      >
                        <g
                          id="icons"
                          transform="translate(56.000000, 160.000000)"
                        >
                          <path
                            d="M339.875,578.013 L336.6875,578.013 L336.6875,574.013 L330.3125,574.013 L330.3125,578.013 L327.125,578.013 L327.125,568.799 L333.489375,562.809 L339.875,568.819 L339.875,578.013 Z M341.94475,568.013 L333.47025,560 L325,567.999 L325,580.013 L332.4375,580.013 L332.4375,576.013 L334.5625,576.013 L334.5625,580.013 L342,580.013 L342,579.983 L342,568.013 L341.94475,568.013 Z"
                            id="home-[#1392]"
                          >
                            {" "}
                          </path>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>
                </svg>
                <span class="ms-3 text-xl font-semibold">Teachers</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
  
}

export default AdminSidebar