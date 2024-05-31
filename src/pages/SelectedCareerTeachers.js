import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAPIPrivate from '../hooks/useAPIPrivate';
import Lottie from 'react-lottie';
import loadingPurple from '../assets/loadingPurple.json';

const SelectedCareerTeachers = () => {
  const navigate = useNavigate();
  const [careerTeachers, setCareerTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiPrivate = useAPIPrivate();

  useEffect(() => {
    const fetchSelectedCareerTeachers = async () => {
      try {
        const response = await apiPrivate.get('/career/getStudentCareerTeachers');
        setCareerTeachers(response.data.careerTeachers);
      } catch (error) {
        console.error('Error fetching selected career teachers:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchSelectedCareerTeachers();
  }, []);

  const handleJoinVideoCall = (roomID) => {
    navigate('/student-home-page/sessions/live-session', { state: {roomID, userType: "Student", purpose: "Counselling"}});
  }

  return (
    <div className="w-full h-screen/2 max-w-screen-xl bg-white rounded-lg shadow-lg p-6">
      {/* Navigation buttons */}
      <div className="mb-5 text-center mx-auto rounded-md shadow-sm" role="group">
        <Link to="/student-career-page/ai-career" className="bg-purple-500 text-white py-2 px-4 rounded-l-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">AI Career</Link>
        <Link to="/student-career-page/available-counsellors" className="bg-purple-500 text-white py-2 px-4 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">Available Counsellors</Link>
        <Link to="/student-career-page/my-counsellors" className="bg-purple-500 text-white py-2 px-4 rounded-r-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
        <span className='border-b-2 border-purple-200'>My Counsellors</span>
        </Link>
      </div>
      <h1 className="text-3xl text-[#7179C6] mb-5 font-bold text-center">My Counsellors</h1>

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
          {careerTeachers?.map((teacher, index) => (
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
                <p className="mb-2 text-m font-bold text-gray-900">
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
                {teacher.teacher.rating && (
                  <p className="mb-3 text-sm font-medium text-gray-900 dark:text-gray-400">
                    Rating: {teacher?.teacher?.rating}
                  </p>
                )}
                {
                  teacher.counsellingSessionStarted 
                  && (
                    <button onClick={() => handleJoinVideoCall(teacher?._id)} 
                    type="button" 
                    class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Join Video
                    </button>
                  )
                }
                
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectedCareerTeachers;
