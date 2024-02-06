import { Link, useLocation } from "react-router-dom";
import logoutIcon from "../assets/logout.png";
import { useState } from "react";

const StudentHomePageNavBar2 = (props) => {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <nav className="">
      <div className="bg-teal-100 flex  justify-between dark:bg-gray-800">
        <ul className="relative flex font-medium w-screen">
          <li>
            <Link
              to="/student-home-page"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white group ${
                location.pathname === "/student-home-page"
                  ? "text-teal-500 underline"
                  : "hover:text-teal-500"
              }`}
            >
              <span className="ml-3 text-xl font-bold">Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/#"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white group ${
                location.pathname === "/"
                  ? "text-teal-500 underline"
                  : "hover:text-teal-500"
              }`}
            >
              <span className="ml-3 text-xl font-bold">Sessions</span>
            </Link>
          </li>
          <li>
            <Link
              to="chats"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white group ${
                location.pathname === "/student-home-page/chats"
                  ? "text-teal-500 underline"
                  : "hover:text-teal-500"
              }`}
            >
              <span className="ml-3 text-xl font-bold">Chats</span>
            </Link>
          </li>
          <li>
            <Link
              to="/#"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white group ${
                location.pathname === "/"
                  ? "text-teal-500 underline"
                  : "hover:text-teal-500"
              }`}
            >
              <span className="ml-3 text-xl font-bold">Statistics</span>
            </Link>
          </li>
        </ul>
        <button
          onClick={props.handleLogOut}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="scale-50 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group">
            <svg
              fill={isHovered ? "#4fd1c5" : "#000000"}
              width="50px"
              height="50px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M4,12a1,1,0,0,0,1,1h7.59l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l4-4a1,1,0,0,0,.21-.33,1,1,0,0,0,0-.76,1,1,0,0,0-.21-.33l-4-4a1,1,0,1,0-1.42,1.42L12.59,11H5A1,1,0,0,0,4,12ZM17,2H7A3,3,0,0,0,4,5V8A1,1,0,0,0,6,8V5A1,1,0,0,1,7,4H17a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V16a1,1,0,0,0-2,0v3a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V5A3,3,0,0,0,17,2Z"></path>
              </g>
            </svg>
          </div>
        </button>
      </div>
    </nav>
  );
};

export default StudentHomePageNavBar2;
