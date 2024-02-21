import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/l-t-high-resolution-logo-transparent.png";
import { useNavigate } from "react-router-dom";

const StudentHomePageNavBar = (props) => {
  // const [careerClicked, setCareerClicked] = useState(false);

  // const handleCareerClick = () => {
  //   setCareerClicked(true);
  //   navigate("/student-home-page/ai-career"); // Using navigate to go to the career page
  // };

  const location = useLocation();

  return (
    <nav className="top-0 z-20 fixed w-full bg-teal-300 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-8" alt="Logo" />
        </Link>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col text-xl font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-teal-300 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-teal-300 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/teacher-home-page"
                className={`block py-2 px-3   rounded md:bg-transparent  md:p-0  ${location.pathname.startsWith("/student-home-page") && !location.pathname.endsWith("/ai-career")  ? 'text-blue-700' : 'text-gray-900'}`}
                aria-current="page"
              >
                Learn
              </Link>
            </li>
            <li>
              <Link
                className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname == "/student-home-page/ai-career" ? 'text-blue-700' : 'text-gray-900'}`}
                to="/student-home-page/ai-career"
              >
                Career
              </Link>
            </li>
            <li className="">
              <Link
                to="my-profile"
                className="flex py-2 px-3 text-gray-900 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src={props.profile.profilePicture}
                  alt="Profile"
                />
                <div className="ml-2">
                {props.profile.firstName} {props.profile.lastName}
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default StudentHomePageNavBar;
