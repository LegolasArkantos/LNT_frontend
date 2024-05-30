import { Link ,useLocation} from "react-router-dom";
import { useState } from "react";
import logo from '../assets/lntlogo-removebg-preview.png';
import ProfileDropDown from "./ProfileDropDown";

const TeacherHomePageNavBar = (props) => {

  const [isHovered, setIsHovered] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  // const [dropDown, setDropDown] = useState(false);

  const location = useLocation();

  return (
    <div>
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
            <li onClick={() => {
              setDropDown(!dropDown)
              }}>
            <img
                  className="w-8 h-8 cursor-pointer rounded-full"
                  src={props.profile.profilePicture}
                />
            </li>
          </ul>
        </div>
        
      </div>
      
    </nav>
    {dropDown && (
      <div className="fixed z-30 flex w-full justify-end top-16 right-0">
      <ProfileDropDown handleLogOut={props.handleLogOut} profile={props.profile} setDropDown={setDropDown} role="Teacher"/>
    </div>
  )}
  </div>
  );
};

export default TeacherHomePageNavBar;
