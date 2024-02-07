import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import logoutIcon from "../assets/logout.png"; // Make sure to provide the correct path to your logout icon
import useAPIPrivate from "../hooks/useAPIPrivaate";

const StudentHomePageNavBar2 = (props) => {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const apiPrivate = useAPIPrivate();

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  useEffect(() => {
    const navHeight = document.querySelector("nav").offsetHeight;
    document.body.style.paddingTop = `${navHeight}px`;

    apiPrivate.get("notification/").then((res) => {
      if (res.status === 200) {
        setNotifications(res.data);
      }
    });

    return () => {
      document.body.style.paddingTop = 0;
    };
  }, []);

  return (
    <nav className="fixed top-0 w-screen z-10">
      <div className="bg-teal-100 flex items-center justify-between dark:bg-gray-800">
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
        <svg
  onClick={toggleNotification}
  width="30px"
  height="30px"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  className="cursor-pointer"
>
  {/* Your notification icon */}
  <path
    d="M15 19.25C15 20.0456 14.6839 20.8087 14.1213 21.3713C13.5587 21.9339 12.7956 22.25 12 22.25C11.2044 22.25 10.4413 21.9339 9.87869 21.3713C9.31608 20.8087 9 20.0456 9 19.25"
    stroke="#000000"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  ></path>
  <path
    d="M5.58096 18.25C5.09151 18.1461 4.65878 17.8626 4.36813 17.4553C4.07748 17.048 3.95005 16.5466 4.01098 16.05L5.01098 7.93998C5.2663 6.27263 6.11508 4.75352 7.40121 3.66215C8.68734 2.57077 10.3243 1.98054 12.011 1.99998V1.99998C13.6977 1.98054 15.3346 2.57077 16.6207 3.66215C17.9069 4.75352 18.7557 6.27263 19.011 7.93998L20.011 16.05C20.0723 16.5452 19.9462 17.0454 19.6576 17.4525C19.369 17.8595 18.9386 18.144 18.451 18.25C14.2186 19.2445 9.81332 19.2445 5.58096 18.25V18.25Z"
    stroke="#000000"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  ></path>
  {/* Add notification count */}
  {notifications.length > 0 && (
    <circle
      cx="18"
      cy="6"
      r="8"
      fill="#ff0000"
      stroke="#ffffff"
      strokeWidth="2"
    />
  )}
  {/* Show notification count */}
  {notifications.length > 0 && (
    <text
      x="17"
      y="10"
      fontSize="10"
      fill="#ffffff"
      textAnchor="middle"
    >
      {notifications.length}
    </text>
  )}
</svg>
        <button
          onClick={props.handleLogOut}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="scale-50 text-gray-900 mr-3 rounded-lg dark:text-white dark:hover:bg-gray-700 group">
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
      <NotificationBox isNotificationOpen={isNotificationOpen} notifications={notifications} />
    </nav>
  );
};

const NotificationBox = ({ isNotificationOpen, notifications }) => {
  return (
    <div
      className={`fixed top-30 right-4 ${isNotificationOpen ? "block" : "hidden"}`}
    >
      <ul className="bg-teal-200 p-4  w-[200px] rounded-lg shadow-lg">
        {
          notifications.map((notification, index) => (
            <li key={index} className="outline rounded mb-3">
              <h1 className="font-semibold">
                {notification.title}
              </h1>
              <p1 className="">
                {notification.time}
              </p1>
            </li>
          ))
        }
      </ul>
      
    </div>
  );
};

export default StudentHomePageNavBar2;
