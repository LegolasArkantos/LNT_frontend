import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAPIPrivate from '../hooks/useAPIPrivate';
import Lottie from 'react-lottie';
import loadingPurple from '../assets/loadingPurple.json';
import emptyDataImgCourses from '../assets/no data.png'

const TeacherCareerPage = () => {
  const navigate = useNavigate();
  const [isCareerCounseling, setIsCareerCounseling] = useState(false);
  const [teacherCareerData, setTeacherCareerData] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true)
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
      finally {
        setLoading(false);
      }
    };

    fetchCareerCounselingStatus();
  }, []);

  const handleJoinVideoCall = async () => {
    try {
      const roomID = teacherCareerData._id;
      await apiPrivate.post(`career/launch-counselling/${roomID}`).then((res) => {
        if (res.status === 200) {
          navigate('/teacher-home-page/sessions/live-session', { state: {roomID, userType: "Teacher", purpose: "Counselling"}});
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
        <div className="p-10 mb-6 bg-white rounded-lg shadow-md">
          <div className="flex flex-col">
            <img src={teacherCareerData?.profilePic} alt="Profile Pic" className="w-24 h-24 mb-4 rounded-full mr-4 border-4 border-purple-200 object-cover" />
        
            <div>
              {/* Teacher name */}
              <h2 className="text-gray-700 font-bold mb-2 text-xl">{teacherCareerData?.name}</h2>
              
              {/* Timing */}
              <h className="text-gray-700 text-sm mb-2 font-bold">Counseling Timings:</h>
              <p className='font-semibold text-sm mb-4'>{teacherCareerData?.timing}</p>
        
              {/* Description */}
              <p className="text-gray-700 text-sm font-bold mb-2 underline">Description</p>
              <p className="font-semibold text-sm">{teacherCareerData?.description}</p>
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
        <div className='flex mb-6'>
        <h2 className="text-2xl text-[#7179C6] font-bold">Students Enrolled</h2>
        </div>
        <div className="flex w-full h-full overflow-y-scroll scrollbar-hide grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {
            loading && (<div className="flex items-center justify-center">
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: loadingPurple,
                rendererSettings: {
                  preserveAspectRatio: 'xMidYMid slice',
                },
              }}
              height={200}
              width={200}
            />
          </div>)
          }
          {!loading && students.length === 0
          ? (<div className="flex w-full h-[300px] items-center justify-center">
          <img className="w-1.5/5 h-full" src={emptyDataImgCourses}/>
          </div>)
          : (students?.map((student, index) => (
            <div key={index} className="bg-white border border-gray-200 flex flex-col justify-between rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center justify-center">
                <img
                  className="w-40 h-40 mt-4 rounded-full border-4 border-white"
                  src={student?.profilePicture}
                  alt=""
                />
              </div>
              <div className="p-3 flex text-wrap">
                <h2 className=" text-xl font-semibold text-gray-900 dark:text-white">
                  {`${student?.firstName} ${student?.lastName}`}
                </h2>
                
              </div>
              <div className='p-3'>
              <h className="text-gray-700 underline text-sm font-bold">
                  Education Level:
              </h>
              <p className='text-gray-700 text-sm font-bold'>
              {student?.educationalLevel}
              </p>
                </div>
              <div className='p-3'>
              <button onClick={() => handleJoinVideoCall()} type="button" class="text-white w-3/5 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-xs px-2 py-2.5 text-center me-2 mb-2">Launch Counselling</button>
              </div>
            </div>
          )))}
        </div>
      </div>
    </div>
  );
};

export default TeacherCareerPage;
