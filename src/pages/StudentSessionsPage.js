import React, { useState, useEffect } from 'react';
import { apiPrivate } from '../services/api';
import { useNavigate } from 'react-router-dom';
import ReviewsPopupStudent from '../components/ReviewsPopupStudent';
import Lottie from 'react-lottie';
import loadingPurple from '../assets/loadingPurple.json';

const StudentSessionsPage = ({socket}) => {
  const [sessions, setSessions] = useState([]);
  const [reviewPopUp, setReviewPopUp] = useState(false);
  const [reviewPopUpData, setReviewPopUpData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await apiPrivate.get('/student/my-sessions');
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

  const handleJoinVideoCall = (roomID) => {
    socket.emit("join:video-call", {roomID});
    navigate('/student-home-page/live-session', { state: {roomID, userType: "Student", purpose: "Session"}});
  }

  return (
    <div className="h-screen">
  <div className="p-8 flex flex-col h-full">
    <div className="bg-white rounded-lg flex-1 flex flex-col h-[500px] mb-20 max-w-screen mx-auto mt-[-50px] mb-[125px] ml-[-50px] mr-[-50px] p-6" >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl text-[#7179C6] font-bold">My Sessions</h2>
      </div>
      <div className="flex w-full" style={{ paddingRight: "17px" }}>
        {sessions?.length !== 0 ? (
          sessions?.map((session) => (
            <div key={session?._id} className="w-[280px] h-4.5/5 bg-gray-100 pt-3 pb-3 pl-4 pr-4 rounded-lg justify-center flex flex-col shadow-lg mr-4 mb-4">
              <div className="flex justify-between">
                <button
                  className="text-4/5 text-purple-800 font-semibold mb-2 hover:underline"
                  onClick={() => handleSessionClick(session?._id)}
                >
                  {session?.subject}
                </button>
              </div>
              <div className='flex w-full flex-col space-y-2 justify-start'>
              <div className="flex justify-between">
                <p className="text-gray-700 text-sm font-bold">
                  Teacher:
                </p>
                <button
                  className="text-blue-500 font-semibold"
                  onClick={() => handleTeacherClick(session?.teacher)}
                >
                  <small className='text-purple-500 hover:border-b-2 hover:border-purple-500'>
                  {session?.teacherName}
                  </small>
                </button>
              </div>
                  <div className='flex justify-between'>
                  <p className="text-gray-700 text-sm font-bold">Timings:</p>
                  <small>
                  <p className='font-semibold'>{session?.startTime} - {session?.endTime}</p>
                  </small>
                  </div>
                  <div className='flex justify-between'>
                  <p className="text-gray-700 text-sm font-bold">Days:</p>
                  <small>
                  <p className='font-semibold'>{session?.day}</p>
                  </small>
                  </div>
                  <div className='flex justify-between'>
                  <p className="text-gray-700 text-sm font-bold">Total Sessions:</p>
                  <small>
                  <p className='font-semibold'>{session?.sessionCounter?.sessionCount}</p>
                  </small>
                  </div>
                  <div className='flex justify-between'>
                  <p className="text-gray-700 text-sm font-bold">Sessions Completed:</p>
                  <small>
                  <p className='font-semibold'>{session?.sessionCounter?.currentCount}</p>
                  </small>
                  </div>
              <div className="flex items-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1 text-gray-600 dark:text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#7179C6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <button
                  className="text-sm text-blue-500 focus:outline-none"
                  onClick={() => {
                    const data = {
                      teacherId: session?.teacher,
                      sessionId: session?._id,
                      sessionName: session?.subject
                    };
                    setReviewPopUpData(data);
                    setReviewPopUp(true);
                  }}
                >
                  <span className="font-semibold hover:border-b-2 hover:border-[#7179C6] text-[#7179C6]">Reviews</span>
                </button>
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
              {session.sessionStarted && (
                <button
                  onClick={() => handleJoinVideoCall(session?._id)}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Join Video
                </button>
              )}
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
  </div>
  {reviewPopUp && (
    <ReviewsPopupStudent setReviewPopUp={setReviewPopUp} reviewPopUpData={reviewPopUpData} />
  )}
</div>


  );
};

export default StudentSessionsPage;
