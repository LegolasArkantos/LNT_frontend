import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/lntlogo-removebg-preview.png';
import image1 from "../assets/landingpageImage.png";
import image2 from "../assets/studentStudyingLandingPage-removebg.png";
import image1landing from "../assets/image1landing.png";
import image2landing from "../assets/image2landing.png";
import image3landing from "../assets/image3landing.png";
import image4landing from "../assets/image4landing.png";
import image5landing from "../assets/image5landing.png";
import imageicon1 from "../assets/imageicon1.png";
import imageicon2 from "../assets/imageicon2.png";
import imageicon3 from "../assets/imageicon3.png";
import imageicon4 from "../assets/imageicon4.png";
import imageicon5 from "../assets/imageicon5.png";
import imageicon6 from "../assets/imageicon6.png";
import imageicon7 from "../assets/imageicon7.png";
import imageicon8 from "../assets/imageicon8.png";
import landing1 from "../assets/landing1.png";
import landing2 from "../assets/landing2.png";
import landing3 from "../assets/landing3.png";
import landing4 from "../assets/landing4.png";
import Footer from '../components/Footer';
import { useRef } from 'react';

const LandingPage = () => {

  const location = useLocation();
  const aboutUsRef = useRef(null);
  const ourServicesRef = useRef(null);

  const scrollToAboutUs = () => {
    aboutUsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToOurServices = () => {
    ourServicesRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
    <div className="relative w-full h-screen">
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
              onClick={() => scrollToAboutUs()}
              className="text-xl cursor-pointer text-gray hover:border-b-2 hover:border-b-[#7179C6]"
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
            <button onClick={() => scrollToOurServices()} type="button" className="text-white mt-5 bg-[#7179C6] hover:bg-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Our Services
            </button>
          </div>
        </div>
      </div>
      <div className='w-full flex'>
        <img className="absolute bottom-0 left-0 w-full h-3/4" src={image1} alt="Background" />
        <img className="absolute bottom-0 right-20 w-1/4 h-3/4" src={image2} alt="Background" />
      </div>
      </div>
      
      <div ref={aboutUsRef} className='flex h-screen w-full'>
        <div className='flex flex-col space-y-3 p-14 justify-center w-1/2 h-full'>
          <p className='text-[#7179C6] text-m font-bold'>
            100% SATISFACTION GUARANTEE
          </p>
          <div>
            <h1 className='text-black text-3xl font-bold'>
          Find Your Perfect
          </h1>
            <h1 className='text-black text-3xl font-bold'>
          Match for 
          </h1>
            <h1 className='text-black text-3xl font-bold'>
          Personalized Learning
          </h1>
          <div className='flex justify-end w-full'>
            <img className='w-25 h-5' src={image5landing}/>
          </div>
          </div>
          
          <div className='text-gray-700 text-m font-bold'>
            <h1 >
            At Learn and Track, we believe in the power
            </h1>
            <h1>
            of one-on-one learning. That's why we
            </h1>
            <h1>
            connect you with the perfect tutor for your
            </h1>
            <h1>
            unique needs and goals. Our free matching
            </h1>
            <h1>
            service takes the guesswork out of finding
            </h1>
            <h1>
            the right fit, ensuring a private learning
            </h1>
            <h1>
            environment where you can thrive.
            </h1>
            <h1>
            Here's how it works:
            </h1>
            
            <ul className="list-disc ml-5 mt-2 text-gray-700 text-m font-bold">
            <li>Tell us about yourself</li>
            <li>We match you with an expert</li>
            <li>Start learning, confidently</li>
          </ul>
          </div>
        </div>
        <div className='flex w-1/2'>
          <div className='flex flex-col'>
            <img className='' src={image1landing}/>
            <img className='' src={image3landing}/>
          </div>
          <div className='flex flex-col'>
            <img className='' src={image2landing}/>
            <img className='' src={image4landing}/>
          </div>
        </div>
      </div>

      <div className='flex flex-col h-screen w-full'>
        <div className='flex w-full mt-4 h-2/4 items-center justify-center'>
        <div className='flex w-4/5 space-x-20 p-5 text-white bg-[#7179C6] h-4/5 items-center justify-center rounded-xl'>
          <div className='flex flex-col w-full items-center'>
          <h1 className='text-2xl ml-12 font-bold'>
            5
          </h1>
          <p className='text-m ml-14 text-center font-bold'>
            Expert Tutors
          </p>
          </div>
          <div class="w-px h-3/5 bg-white"></div>
          <div className='flex flex-col w-full items-center'>
            <h1 className='text-2xl font-bold'>
              24
            </h1>
            <p className='text-l text-center font-bold'>
              Hours
            </p>
            <p className='text-l text-center font-bold'>
              Tutored
            </p>
          </div>
          <div class="w-px h-3/5 bg-white"></div>
          <div className='flex flex-col w-full items-center'>
          <h1 className='text-2xl font-bold'>
            10
          </h1>
          <p className='text-l text-center font-bold'>
            Subject
          </p>
          <p className='text-l text-center font-bold'>
            and Courses
          </p>
          </div>
          <div class="w-px h-3/5 bg-white"></div>
          <div className='flex flex-col w-full items-center'>
            <h1 className='text-2xl mr-12 font-bold'>
              5
            </h1>
            <p className='text-l text-center mr-12 font-bold'>
              Active
            </p>
            <p className='text-l text-center mr-12 font-bold'>
              Students
            </p>
          </div>
        </div>
        </div>

        <div className='flex flex-col p-5 items-center'>
          <div>
            <div className='flex w-full justify-center'>
          <p className='text-[#7179C6] text-center text-m font-bold'>
            OUR TUTOR SUBJECTS
          </p>
          </div>
          <div className='flex w-full justify-center'>
          <h1 className='text-black text-2xl font-bold' >
          Find Online Tutor in Any Subject            
          </h1>
          </div>
          </div>

          <div className='flex flex-col space-y-5 mt-5 w-full h-3/5'>
            <div className='flex justify-center w-full space-x-5'>
              <div className='flex w-1/5 h-[70px] pl-3 items-center outline outline-gray-500 rounded'>
                <img className='w-14 h-12' src={imageicon1}/>
                <p className='text-gray-700 text-sm font-bold'>
                  Computer Science
                </p>
              </div>
              <div className='flex w-1/5 h-[70px] pl-3 items-center outline outline-gray-500 rounded'>
                <img className='w-14 h-12' src={imageicon2}/>
                <p className='text-gray-700 text-sm font-bold'>
                  Mathematics
                </p>
              </div>
              <div className='flex w-1/5 h-[70px] pl-3 items-center outline outline-gray-500 rounded'>
                <img className='w-14 h-12' src={imageicon3}/>
                <p className='text-gray-700 text-sm font-bold'>
                  Sciences
                </p>
              </div>
              <div className='flex w-1/5 h-[70px] pl-3 items-center outline outline-gray-500 rounded'>
                <img className='w-14 h-12' src={imageicon4}/>
                <p className='text-gray-700 text-sm font-bold'>
                  Economics
                </p>
              </div>
            </div>

            <div className='flex justify-center w-full space-x-5'>
            <div className='flex w-1/5 h-[70px] pl-3 items-center outline outline-gray-500 rounded'>
                <img className='w-14 h-12' src={imageicon5}/>
                <p className='text-gray-700 text-sm font-bold'>
                  Social Studies
                </p>
              </div>
              <div className='flex w-1/5 h-[70px] pl-3 items-center outline outline-gray-500 rounded'>
                <img className='w-14 h-12' src={imageicon6}/>
                <p className='text-gray-700 text-sm font-bold'>
                  Language Arts
                </p>
              </div>
              <div className='flex w-1/5 h-[70px] pl-3 items-center outline outline-gray-500 rounded'>
                <img className='w-14 h-12' src={imageicon7}/>
                <p className='text-gray-700 text-sm font-bold'>
                  History
                </p>
              </div>
              <div className='flex w-1/5 h-[70px] pl-3 items-center outline outline-gray-500 rounded'>
                <img className='w-14 h-12' src={imageicon8}/>
                <p className='text-gray-700 text-sm font-bold'>
                  Music and Arts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div ref={ourServicesRef} className='flex flex-col justify-center h-screen w-full'>
        <div className='flex flex-col w-full mt-20 justify-center items-center'>
          <p className='text-[#7179C6] text-center text-m font-bold'>
            WHY CHOOSE US
          </p>
          <h1 className='text-black text-center text-2xl font-bold' >
          Benefits of online tutoring          
          </h1>
          <h1 className='text-black text-center text-2xl font-bold' >
          services with us             
          </h1>
          </div>

          <div className='flex space-x-10 p-8 mt-8 w-full h-3/5'>
            <div className='flex flex-col p-5 space-y-5 w-1/4 h-3/4 rounded-lg border-dashed border-2 border-yellow-300 shadow'>
              <div className='flex w-full justify-start'>
                <img className='w-14 h-12' src={landing1}/>
              </div>
            <div className='ml-2'>
            <h1 className='text-black text-sm mb-2 font-bold' >
            Tailored Learning Experience         
            </h1>
              <p className='text-gray-700 text-xs font-bold'>
              Benefit from personalized courses
              </p>
              <p className='text-gray-700 text-xs font-bold'>
              that adapt to your learning style
              </p>
              <p className='text-gray-700 text-xs font-bold'>
              and preferences, ensuring a
              </p>
              <p className='text-gray-700 text-xs font-bold'>
              customized educational journey.
              </p>
              </div>
            </div>

            <div className='flex flex-col p-5 space-y-5 w-1/4 h-3/4 rounded-lg border-dashed border-2 border-blue-300 shadow'>
              <div className='flex w-full justify-start'>
                <img className='w-14 h-12' src={landing2}/>
              </div>
            <div className='ml-2'>
            <h1 className='text-black text-sm mb-2 font-bold' >
            AI-Based Career Counseling     
            </h1>
              <p className='text-gray-700 text-xs font-bold'>
              Benefit from personalized courses
              </p>
              <p className='text-gray-700 text-xs font-bold'>
              that adapt to your learning style
              </p>
              <p className='text-gray-700 text-xs font-bold'>
              and preferences, ensuring a
              </p>
              <p className='text-gray-700 text-xs font-bold'>
              customized educational journey.
              </p>
              </div>
            </div>

            <div className='flex flex-col p-5 space-y-5 w-1/4 h-3/4 rounded-lg border-dashed border-2 border-purple-300 shadow'>
              <div className='flex w-full justify-start'>
                <img className='w-14 h-12' src={landing3}/>
              </div>
            <div className='ml-2'>
            <h1 className='text-black text-sm mb-2 font-bold' >
            Personality Based Matching         
            </h1>
              <p className='text-gray-700 text-xs font-bold'>
              Benefit from personalized courses
              </p>
              <p className='text-gray-700 text-xs font-bold'>
              that adapt to your learning style
              </p>
              <p className='text-gray-700 text-xs font-bold'>
              and preferences, ensuring a
              </p>
              <p className='text-gray-700 text-xs font-bold'>
              customized educational journey.
              </p>
              </div>
            </div>

            <div className='flex flex-col p-5 space-y-5 w-1/4 h-3/4 rounded-lg border-dashed border-2 border-orange-300 shadow'>
              <div className='flex w-full justify-start'>
                <img className='w-14 h-12' src={landing4}/>
              </div>
            <div className='ml-2'>
            <h1 className='text-black text-sm mb-2 font-bold' >
            Simple and Intuitive UI       
            </h1>
              <p className='text-gray-700 text-xs font-bold'>
              Benefit from personalized courses
              </p>
              <p className='text-gray-700 text-xs font-bold'>
              that adapt to your learning style
              </p>
              <p className='text-gray-700 text-xs font-bold'>
              and preferences, ensuring a
              </p>
              <p className='text-gray-700 text-xs font-bold'>
              customized educational journey.
              </p>
              </div>
            </div>
            

            
          </div>
      </div>
      <div className="bg-[#7179C6]">
      <Footer/>
      </div>
    </div>
  );
};

export default LandingPage;
