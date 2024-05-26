import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from '../assets/lntlogo-removebg-preview.png';

const StudentHomePageNavBar = (props) => {
  // const [careerClicked, setCareerClicked] = useState(false);
  // const handleCareerClick = () => {
  //   setCareerClicked(true);
  //   navigate("/student-home-page/ai-career"); // Using navigate to go to the career page
  // };

  const location = useLocation();


  return (
    <nav className="top-0 z-20 fixed w-full bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-8" alt="Logo" />
        </Link>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex  text-xl font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/student-home-page"
                className={`block py-2 px-3 hover:text-[#7179C6] rounded md:bg-transparent md:p-0 ${(location.pathname !== "/student-career-page/ai-career" && location.pathname !== "/student-career-page/teacherCareers" && location.pathname !== "/student-career-page/Counselors") ? 'text-[#7179C6]' : 'text-[#444444]'}`}
                aria-current="page"
              >
                Learn
              </Link>
            </li>
            <li>
              <Link
                className={`block py-2 px-3 hover:text-[#7179C6] rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname === "/student-career-page/ai-career" || location.pathname === "/student-career-page/teacherCareers" || location.pathname === "/student-career-page/Counselors" ? 'text-[#7179C6]' : 'text-[#444444]'}`}
                to="/student-career-page/ai-career"
                // onClick={() => setCareer(true)}
              >
                Career
              </Link>
            </li>
            <li onClick={() => {
              props.setDropDown(!props.dropDown)
              }}>
                <img
                  className="w-8 h-8 cursor-pointer rounded-full"
                  src={props.profile.profilePicture}
                  alt="Profile"
                />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default StudentHomePageNavBar;
