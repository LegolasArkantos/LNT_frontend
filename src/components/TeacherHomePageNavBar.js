import { Link ,useLocation} from "react-router-dom";
import { useState } from "react";
import logo from '../assets/lntlogo-removebg-preview.png';

const TeacherHomePageNavBar = (props) => {

  const [isHovered, setIsHovered] = useState(false);
  const [career, setCareer] = useState(props.career);

  const location = useLocation();

  return (
    <nav class="top-0 z-20 fixed w-full bg-white border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <a class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} class="h-8" />
        </a>

        <div
          class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul class="flex flex-col bg-white text-xl font-medium p-2 border border-gray-100 rounded-full md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
            <Link
                to="/teacher-home-page"
                className={`block py-2 px-3 hover:text-[#7179C6] rounded md:bg-transparent  md:p-0 ${(location.pathname !== "/teacher-career-page/career" && location.pathname !== "/teacher-career-page/careerSignup") ? 'text-[#7179C6]' : 'text-[#444444]'}`}
                aria-current="page"
              >
                Learn
              </Link>
            </li>
            <li>
            <Link
                className={`block py-2 px-3 hover:text-[#7179C6] rounded md:hover:bg-transparent md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname == "/teacher-career-page/career" || location.pathname == "/teacher-career-page/careerSignup" ? 'text-[#7179C6]' : 'text-[#444444]'}`}
                to="/teacher-career-page/career"
              >
                Career
              </Link>
            </li>
            <li className="">
              <Link
                to="/teacher-home-page/my-profile"
                class="flex py-2 px-3 text-[#7179C6] underline items-center md:p-0"
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src={props.profile.profilePicture}
                />
                <div className="ml-2">
                {props.profile.firstName} {props.profile.lastName}
                </div>
              </Link>
            </li>
            {
              career
              && (
                <li>
            <button
          onClick={props.handleLogOut}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="rounded-lg">
            <svg
              fill={isHovered ? "#115e59" : "#000000"}
              width="25px"
              height="25px"
              viewBox="0 0 20 24"
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
            </li>
              )
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TeacherHomePageNavBar;
