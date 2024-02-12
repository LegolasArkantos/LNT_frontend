import { Link } from 'react-router-dom';
import logo from '../assets/l-t-high-resolution-logo-transparent.png'
import image from '../assets/Rectangle 49.png'
const LandingPage = () => {
  return (
    <div>
      <nav class="bg-[#38E1CD] border-gray-200 dark:bg-gray-900">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <div class="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src={logo}
              class="h-8"
            />
          </div>
          <div class="flex items-center space-x-6 rtl:space-x-reverse">
          <a
              href="login"
              class="text-2xl text-white hover:underline"
            >
              Faqs
            </a>
          <a
              href="login"
              class="text-2xl text-white hover:underline"
            >
              Contact Us
            </a>
            <a
              href="login"
              class="text-2xl text-white hover:underline"
            >
              Login
            </a>
          </div>
        </div>
      </nav>
      <div className='bg-[#38E1CD] w-full h-screen flex items-center justify-center'>
          <div className="text-black font-bold text-5xl pt-30 w-1/2 ml-20 mb-20">
            <p className="text-white ">Online </p>
            <p className="text-[#5589C7] ">Tutoring </p>
            <p className="text-white ">and </p>
            <p className="text-[#5589C7] ">Counseling </p>
            <p className="text-white ">Services</p>
            <div>
            <p className='font-normal text-[30px] text-white mt-10'>Our aim is to provide a personalized space for your learning and growth!</p>
            <Link to="signup" type="button" class="text-white mt-10 bg-[#0ea5e9] hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Get Started
            </Link>
            </div>
          </div>
        <img className='w-1/2 h-auto mb-20' src={image}/>
      </div>
    </div>
  );
};

export default LandingPage;
