import React, { useState, useEffect } from 'react';
import { apiPrivate } from '../services/api';
import { useNavigate } from 'react-router-dom';
import ReviewsPopupStudent from '../components/ReviewsPopupStudent';
import Lottie from 'react-lottie';
import loadingPurple from '../assets/loadingPurple.json';

const StudentSessionsHistoryPage = ({  }) => {
  const [sessions, setSessions] = useState([]);
  const [reviewPopUp, setReviewPopUp] = useState(false);
  const [reviewPopUpData, setReviewPopUpData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await apiPrivate.get('/history/completedSessionsStudent');
        setSessions(response.data.sessions);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSessions();
  }, []);

  const handleSessionClick = (sessionId) => {
    navigate('/student-home-page/studentassignments', { state: { sessionId } });
  };

  const handleTeacherClick = (teacherId) => {
    navigate('/student-home-page/StudentProfileSecondary', { state: { teacherId, otherRole: "Teacher" } });
  };

  const handleReviewClick = (session) => {
    const data = {
      teacherId: session?.teacher,
      sessionId: session?._id,
      sessionName: session?.subject
    };
    setReviewPopUpData(data);
    setReviewPopUp(true);
  };

  return (
    <div className="h-screen">
      <div className="p-3 flex flex-col h-full">
        
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl text-[#7179C6] font-bold">Past Sessions</h2>
          </div>
          <div className="flex w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-10 gap-3">
            {sessions?.length !== 0 ? (
              sessions?.map((session) => (
                <div key={session?._id} className="w-full h-4.5/5 bg-purple-100 pt-3 pb-3 pl-4 pr-4 rounded-lg justify-center flex flex-col shadow-lg mr-4 mb-4">
              <div className="flex justify-between">
                <button
                  className="text-4/5 text-purple-800 font-bold mb-2 hover:underline"
                  onClick={() => handleSessionClick(session?._id)}
                >
                  {session?.subject}
                </button>
              </div>
              <div className='flex w-full flex-col space-y-2 justify-start'>
              <div className='flex'>
              <div className='flex flex-col space-y-2'>
              <div className="flex">
                <p className="text-gray-700 text-sm font-bold">
                  Teacher:
                </p>
              </div>
                  <div className='flex'>
                  <p className="text-gray-700 text-sm font-bold">Timings:</p>
                  </div>
                  <div className='flex'>
                  <p className="text-gray-700 text-sm font-bold">Days:</p>
                  </div>
                  <div className='flex'>
                  <p className="text-gray-700 text-sm font-bold">Total Sessions:</p>
                  </div>
                  <div className='flex'>
                  <p className="text-gray-700 text-sm font-bold">Sessions Finished:</p>
                  </div>
                  </div>
                  <div className='flex flex-col space-y-2 ml-7'>
                  <p
                  className="text-sm text-purple-800 hover:underline cursor-pointer font-semibold"
                  onClick={() => handleTeacherClick(session?.teacher)}
                >
                  {session?.teacherName}
                </p>
                <p className='font-semibold text-sm'>{session?.startTime} - {session?.endTime}</p>
                  <p className='font-semibold text-sm'>{session?.day}</p>
                  <p className='font-semibold text-sm'>{session?.sessionCounter?.sessionCount}</p>
                  <p className='font-semibold text-sm'>{session?.sessionCounter?.currentCount}</p>
                  </div>
                  </div>
              </div>
              <button
                type="button"
                className="text-white mt-3 w-2/5 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-xs px-2 py-2.5 text-center me-2 mb-2"
                onClick={() => {
                  navigate('/student-home-page/session-overview', { state: { session, enrolled: true } });
                }}
              >
                Overview
              </button>
            </div>
              ))
            ) : (
              <div className="flex w-full h-full items-center justify-center">
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
              </div>
            )}
          </div>
      </div>
      {reviewPopUp && (
        <ReviewsPopupStudent setReviewPopUp={setReviewPopUp} reviewPopUpData={reviewPopUpData} />
      )}
    </div>
  );
};

export default StudentSessionsHistoryPage;
