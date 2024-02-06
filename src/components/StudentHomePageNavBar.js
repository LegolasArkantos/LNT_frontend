import { Link } from "react-router-dom";
import logo from "../assets/l-t-high-resolution-logo-transparent.png";

const StudentHomePageNavBar = (props) => {
  return (
    <nav class="top-0  fixed w-full bg-teal-300 border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} class="h-8" />
        </a>

        <div
          class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul class="flex flex-col text-xl font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-teal-300 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-teal-300 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="#"
                class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page"
              >
                Learn
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Career
              </a>
            </li>
            <li className="">
              <Link
                to="my-profile"
                class="flex py-2 px-3 text-gray-900 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src={props.profile.profilePicture}
                />
                {props.profile.firstName} {props.profile.lastName}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default StudentHomePageNavBar;
