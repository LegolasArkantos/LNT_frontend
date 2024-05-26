import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAPIPrivate from '../hooks/useAPIPrivate';

const TeacherCareerPage = () => {
  const navigate = useNavigate();
  const [isCareerCounseling, setIsCareerCounseling] = useState(false);
  const [teacherCareerData, setTeacherCareerData] = useState(null);
  const [students, setStudents] = useState([]);
  const apiPrivate = useAPIPrivate();

  useEffect(() => {
    const fetchCareerCounselingStatus = async () => {
      try {
        const response = await apiPrivate.get('/career/getCareer');
        const data = response.data; 
        const isCareerCounseling = Boolean(data.careerCounselling);
        if (isCareerCounseling) {
          setIsCareerCounseling(true);
          const careerDataResponse = await apiPrivate.get('/career/getCareerProfile');
          setTeacherCareerData(careerDataResponse.data);
          // Fetch students associated with the career teacher
          const studentsResponse = await apiPrivate.get(`/career/getCareerTeacherStudents/${careerDataResponse.data._id}`);
          setStudents(studentsResponse.data.students);
        } else {
          navigate('/teacher-career-page/careerSignup');
        }
      } catch (error) {
        console.error('Error fetching career counseling status:', error);
      }
    };

    fetchCareerCounselingStatus();
  }, []);

  const handleJoinVideoCall = async () => {
    try {
      const roomID = teacherCareerData._id;
      await apiPrivate.post(`career/launch-counselling/${roomID}`).then((res) => {
        console.log("HELLO Frontend")
        console.log(res.status)
        if (res.status === 200) {
          navigate('/teacher-home-page/live-session', { state: {roomID, userType: "Teacher", purpose: "Counselling"}});
        }
      })
    }
    catch(error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        console.error("An error occurred:", error);
      }
    }
  }

  return (
    <div>
      {isCareerCounseling && teacherCareerData ? (
        <div className="p-10 mb-1 bg-white rounded-lg shadow-md">
          <div className="flex items-center">
            {/* Cloudinary profile pic */}
            <img src={teacherCareerData?.profilePic} alt="Profile Pic" className="w-24 h-24 rounded-full mr-4 border-4 border-teal-200 object-cover" />
        
            <div>
              {/* Teacher name */}
              <h2 className="text-xl font-semibold mb-2">{teacherCareerData?.name}</h2>
              
              {/* Timing */}
              <p className="text-gray-600">Counseling Timings: {teacherCareerData?.timing}</p>
        
              {/* Description */}
              <p className="text-gray-700">{teacherCareerData?.description}</p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* Loading or redirection message */}
          <p>Validating Credentials...</p>
        </div>
      )}

      {/* Display Students */}
      <div>
        <h2 className="text-3xl font-bold mb-4 text-center">Students Enrolled</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {students?.map((student, index) => (
            <div key={index} className="bg-white border border-gray-200 flex flex-col justify-between rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center justify-center">
                <img
                  className="w-40 h-40 mt-4 rounded-full border-4 border-white"
                  src={student?.profilePicture}
                  alt=""
                />
              </div>
              <div className="p-3 flex text-wrap">
                <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  {`${student?.firstName} ${student?.lastName}`}
                </h2>
                
              </div>
              <div className='p-3'>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-400">
                  Education Level: {student?.educationalLevel}
              </p>
                </div>
              <div className='p-3'>
              <button onClick={() => handleJoinVideoCall()} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Launch Counselling</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherCareerPage;
