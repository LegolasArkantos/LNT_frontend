import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAPIPrivate from '../hooks/useAPIPrivate';
import Lottie from 'react-lottie';
import loadingPurple from '../assets/loadingPurple.json';

const ShowCareerTeachers = () => {
  const navigate = useNavigate();
  const [careerTeachers, setCareerTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joinStatus, setJoinStatus] = useState(null);
  const apiPrivate = useAPIPrivate();

  useEffect(() => {
    const fetchCareerTeachers = async () => {
      try {
        const response = await apiPrivate.get('/career/getCareerTeachers');
        setCareerTeachers(response.data);
      } catch (error) {
        console.error('Error fetching career teachers:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchCareerTeachers();
  }, []);

  const handleTeacherClick = async (teacherId) => {
    try {
      // Call the addCareerTeacher API
      await apiPrivate.post('/career/addCareerTeacher', { careerTeacherId: teacherId });
      // Set join status to 'success'
      setJoinStatus('success');
      // Optionally, you can navigate to a different page or perform any other action upon successful joining
    } catch (error) {
      // If teacher is already joined, set join status to 'alreadyJoined'
      if (error.response && error.response.status === 400) {
        setJoinStatus('alreadyJoined');
      } else {
        console.error('Error joining career teacher:', error);
      }
    }
  };
  

  return (
    <div className="w-full h-screen/2 max-w-screen-xl bg-white rounded-lg shadow-lg p-6">
      {/* Navigation buttons */}
      <div className="mb-5 text-center mx-auto rounded-md shadow-sm" role="group">
        <Link to="/student-career-page/ai-career" className="bg-purple-500 text-white py-2 px-4 rounded-l-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">AI Career</Link>
        <Link to="/student-career-page/available-counsellors" className="bg-purple-500 text-white py-2 px-4 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
          <span className='border-b-2 border-purple-200'>Available Counsellors</span>
        </Link>
        <Link to="/student-career-page/my-counsellors" className="bg-purple-500 text-white py-2 px-4 rounded-r-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">My Counsellors</Link>
      </div>
      <h1 className="text-3xl text-[#7179C6] mb-5 font-bold text-center">Counsellors</h1>

      {/* Loading Animation */}
      {loading && (
        <div className="flex justify-center">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: loadingPurple,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
              }
            }}
            height={200}
            width={200}
          />
        </div>
      )}

      {/* Display Career Teachers */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {careerTeachers.map((teacher, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center justify-center">
                <img
                  className="w-2/4 h-2/4 mt-4 rounded-full border-4 border-white"
                  src={teacher?.profilePic}
                  alt=""
                />
              </div>
              <div className="p-5 text-wrap">
                <h2 className="mb-2 text-xl font-bold text-gray-900">
                  {teacher?.name}
                </h2>
                <div class="flex items-center mb-2 space-x-1 rtl:space-x-reverse">
        <svg class={`w-4 h-4 ${parseInt(teacher?.teacher?.rating) >= 1 ? 'text-yellow-300' : 'text-gray-300'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
        <svg class={`w-4 h-4 ${parseInt(teacher?.teacher?.rating) >= 2 ? 'text-yellow-300' : 'text-gray-300'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
        <svg class={`w-4 h-4 ${parseInt(teacher?.teacher?.rating) >= 3 ? 'text-yellow-300' : 'text-gray-300'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
        <svg class={`w-4 h-4 ${parseInt(teacher?.teacher?.rating) >= 4 ? 'text-yellow-300' : 'text-gray-300'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
        <svg class={`w-4 h-4 ${parseInt(teacher?.teacher?.rating) >= 5 ? 'text-yellow-300' : 'text-gray-300'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
    </div>
                <p className="mb-2 text-m font-bold text-gray-900 dark:text-gray-400">
                  Description: 
                </p>
                <div className='w-full h-[120px] bg-gray-200 font-semibold text-gray-900 mb-4 p-2 rounded-md overflow-y-scroll scroll'>
                {teacher?.description}
                </div>
                <p className="text-sm font-bold text-gray-900 dark:text-gray-400">
                  Timing: 
                </p>
                <div className='mb-3 text-sm font-semibold text-gray-900'>
                {teacher?.timing}
                </div>
                {/* Assuming rating is available in the teacher object */}
                
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-purple-700 to-purple-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
                  onClick={() => handleTeacherClick(teacher?._id)}
                >
                  Join
                </button>
                {/* Render join status message */}
                {joinStatus === 'success' && (
                  <p className="text-green-500">Joined successfully!</p>
                )}
                {joinStatus === 'alreadyJoined' && (
                  <p className="text-red-500">You have already joined this teacher!</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowCareerTeachers;
