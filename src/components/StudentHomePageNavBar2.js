import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import logoutIcon from "../assets/logout.png"; // Make sure to provide the correct path to your logout icon
import useAPIPrivate from "../hooks/useAPIPrivate";
import ScrollToBottom from "react-scroll-to-bottom";

const StudentHomePageNavBar2 = (props) => {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const apiPrivate = useAPIPrivate();

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleNotificationDelete = async (notID) => {
    try {
      await apiPrivate.delete("notification/delete/" + notID).then((res) => {
        if (res.status === 200) {
          setNotifications((notifications) => notifications.filter((notification) => notification._id !== notID));
        }
      });
    }
    catch (error) {
      console.log(error);
    }
  }

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
      <div className="bg-[#7179C6] flex items-center justify-between dark:bg-gray-800">
        <ul className="relative flex font-medium w-screen">
          <li>
            <Link
              to="/student-home-page"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white group ${
                location.pathname === "/student-home-page"
                  ? "text-white underline"
                  : "hover:text-white"
              }`}
            >
              <span className="ml-3 text-xl font-bold">Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="sessions"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white group ${
                location.pathname === "/student-home-page/sessions"
                  ? "text-white underline"
                  : "hover:text-white"
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
                  ? "text-white underline"
                  : "hover:text-white"
              }`}
            >
              <span className="ml-3 text-xl font-bold">Chats</span>
            </Link>
          </li>
          <li>
            <Link
              to="assignment"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white group ${
                location.pathname === "/student-home-page/assignment"
                  ? "text-white underline"
                  : "hover:text-white"
              }`}
            >
              <span className="ml-3 text-xl font-bold">Progress</span>
            </Link>
          </li>
        </ul>
        <svg
  onClick={toggleNotification}
  width="30px"
  height="30px"
  viewBox="3 -1.7 24 24"
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
      cx="17.5"
      cy="7"
      r="8"
      fill="#ff0000"
      stroke="#ffffff"
      strokeWidth="2"
    />
  )}
  {/* Show notification count */}
  {notifications.length > 0 && (
    <text
      x="17.5"
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
              fill={isHovered ? "#FFFFFF" : "#000000"}
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
      <NotificationBox isNotificationOpen={isNotificationOpen} notifications={notifications} handleNotificationDelete={handleNotificationDelete} />
    </nav>
  );
};

const NotificationBox = ({ isNotificationOpen, notifications, handleNotificationDelete }) => {
  return (
    <div
      className={`fixed top-30 right-4 ${isNotificationOpen ? "block" : "hidden"}`}
    >
      <ul className="bg-purple-200 p-4 h-[300px] rounded-lg shadow-lg">
        <ScrollToBottom className="h-full  flex-col">
        {
          notifications.length == 0 
          ? (<div>
            No Notifications
          </div>)
          : (notifications.map((notification, index) => (
            <li key={index} className=" rounded mb-3 mr-3">
              <div id="toast-notification" class="w-full max-w-xs p-4 text-gray-900 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-300" role="alert">
    <div class="flex items-center mb-3">
        <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white justify-center items-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-notification" aria-label="Close">
            <span class="sr-only">Close</span>
            <svg onClick={() => handleNotificationDelete(notification._id)} class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
        </button>
    </div>
    <div class="flex items-center">
        <div class="relative inline-block shrink-0 p-2">
            <span class="absolute bottom-0 right-0 inline-flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full">
                <svg class="w-3 h-3 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 18" fill="currentColor">
                    <path d="M18 4H16V9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13H9L6.846 14.615C7.17993 14.8628 7.58418 14.9977 8 15H11.667L15.4 17.8C15.5731 17.9298 15.7836 18 16 18C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V15H18C18.5304 15 19.0391 14.7893 19.4142 14.4142C19.7893 14.0391 20 13.5304 20 13V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4Z" fill="currentColor"/>
                    <path d="M12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H3V13C3 13.1857 3.05171 13.3678 3.14935 13.5257C3.24698 13.6837 3.38668 13.8114 3.55279 13.8944C3.71889 13.9775 3.90484 14.0126 4.08981 13.996C4.27477 13.9793 4.45143 13.9114 4.6 13.8L8.333 11H12C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0Z" fill="currentColor"/>
                    </svg>
                <span class="sr-only">Message icon</span>
            </span>
        </div>
        <div class="ms-3 text-sm font-normal">
            <div class="text-sm font-semibold text-blue-900 dark:text-white">{notification.title}</div>
            <div class="text-sm font-normal">{notification.timestamp}</div> 
        </div>
    </div>
</div>
            </li>
          ))
          )
        }
        </ScrollToBottom>
      </ul>
      
    </div>
  );
};

export default StudentHomePageNavBar2;
