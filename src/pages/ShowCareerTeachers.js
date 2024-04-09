import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiPrivate } from '../services/api';
import Lottie from 'react-lottie';
import loadingAnimation from '../assets/loading.json';
const ShowCareerTeachers = () => {
  const navigate = useNavigate();
  const [careerTeachers, setCareerTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleTeacherClick = (teacherId) => {
    console.log(`Clicked on teacher with ID: ${teacherId}`);
    // Add logic to join career teacher session
  };

  return (
    <div className="w-full h-screen/2 max-w-screen-xl bg-white rounded-lg shadow-lg p-6">
      {/* Navigation buttons */}
      <div className="mb-5 text-center mx-auto rounded-md shadow-sm" role="group">
        <Link to="/student-home-page/ai-career" className="bg-teal-300 text-white py-2 px-4 rounded-l-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">AI Career</Link>
        <Link to="/student-home-page/teacherCareers" className="bg-teal-300 text-white py-2 px-4 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <span className="border-b-2 border-red-500">Career Teachers</span>
        </Link>
        <Link to="/student-home-page/Counselors" className="bg-teal-300 text-white py-2 px-4 rounded-r-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Career Students</Link>
      </div>
      <h1 className="text-3xl font-bold mb-4 text-center">Top Rated Counselors</h1>

      {/* Loading Animation */}
      {loading && (
        <div className="flex justify-center">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: loadingAnimation,
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
                  className="w-40 h-40 mt-4 rounded-full border-4 border-white"
                  src={teacher.profilePic}
                  alt=""
                />
              </div>
              <div className="p-5 text-wrap">
                <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  {teacher.name}
                </h2>
                <p className="mb-3 text-sm font-medium text-gray-900 dark:text-gray-400">
                  Description: {teacher.description}
                </p>
                <p className="mb-3 text-sm font-medium text-gray-900 dark:text-gray-400">
                  Timing: {teacher.timing}
                </p>
                {/* Assuming rating is available in the teacher object */}
                {teacher.teacher.rating && (
                  <p className="mb-3 text-sm font-medium text-gray-900 dark:text-gray-400">
                    Rating: {teacher.teacher.rating}
                  </p>
                )}
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
                  onClick={() => handleTeacherClick(teacher._id)}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowCareerTeachers;
