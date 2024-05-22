import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/lntlogo-removebg-preview.png';
import image1 from "../assets/landingpageImage.png";
import image2 from "../assets/studentStudyingLandingPage-removebg.png";

const LandingPage = () => {

  const location = useLocation();

  return (
    <div className="relative w-screen h-screen">
      <nav className="bg-white z-50 dark:bg-gray-900"> {/* Increased z-index value */}
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-3">
          <div className="flex w-1/5 items-center space-x-3 rtl:space-x-reverse">
            <img
              src={logo}
              className="h-15 w-full"
              alt="Logo"
            />
          </div>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <a
              href=""
              className={`text-xl text-gray ${location.pathname === "/" ? "border-b-2 border-[#7179C6]" : "hover:border-b-2 hover:border-b-[#7179C6]"} `}
            >
              Home
            </a>
            <a
              href=""
              className="text-xl text-gray hover:border-b-2 hover:border-b-[#7179C6]"
            >
              About
            </a>
            <a
              href=""
              className="text-xl text-gray hover:border-b-2 hover:border-b-[#7179C6]"
            >
              Contact Us
            </a>
            <a
              href="login"
              className="text-xl text-[#7179C6] hover:border-b-2 hover:border-b-[#7179C6]"
            >
              Login
            </a>
            <a href="signup" type="button" className="text-white bg-[#7179C6] hover:bg-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500 font-medium rounded text-sm px-4 py-1.5 text-center">
              Register
            </a>
          </div>
        </div>
      </nav>
      <div className='flex left-0 right-0 top-0 items-center justify-center'>
        <div className='flex-col z-10 mt-[44px]'>
          <div className='flex items-center justify-center'>
            <h className='text-3xl font-bold' >
              Online Tutoring and
            </h>
          </div>
          <div className='flex items-center mb-5 justify-center'>
            <h className='text-3xl font-bold' >
              Counseling Services
            </h>
          </div>
          <div className='flex items-center justify-center'>
            <p className='text-sm font-semibold' >
              Our aim is to provide a personalized space for your learning and
            </p>
          </div>
          <div className='flex items-center justify-center'>
            <p className='text-sm font-semibold' >
              growth!
            </p>
          </div>
          <div className='flex items-center justify-center'>
            <Link to="signup" type="button" className="text-white mt-5 bg-[#7179C6] hover:bg-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <div className='w-full flex'>
        <img className="absolute bottom-0 left-0 w-full h-3/4" src={image1} alt="Background" />
        <img className="absolute bottom-0 right-20 w-1/4 h-3/4" src={image2} alt="Background" />
      </div>
    </div>
  );
};

export default LandingPage;
