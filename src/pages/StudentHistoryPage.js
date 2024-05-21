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
      <div className="p-8 flex flex-col h-full">
        <div className="bg-teal-100 rounded-lg outline outline-teal-500 flex-1 flex flex-col h-[500px] mb-20 max-w-screen mx-auto mt-[-50px] mb-[125px] ml-[-50px] mr-[-50px] p-6" style={{ overflow: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">My Sessions History</h2>
          </div>
          <div className="flex w-full" style={{ paddingRight: "17px" }}>
            {sessions?.length !== 0 ? (
              sessions?.map((session) => (
                <div key={session?._id} className="w-1.5/5 h-4.5/5 bg-gray-100 pt-3 pb-3 pl-4 pr-4 rounded-lg justify-center flex flex-col shadow-lg mr-4 mb-4">
                  <div className="flex justify-between">
                    <button
                      className="text-4/5 font-semibold mb-2 hover:underline"
                      onClick={() => handleSessionClick(session?._id)}
                    >
                      {session?.subject}
                    </button>
                  </div>
                  <div className='flex w-full flex-col space-y-3 mb-3 justify-start'>
                    <div className="flex w-full">
                      <p className="text-gray-700 mr-1">
                        Teacher:
                      </p>
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => handleTeacherClick(session?.teacher)}
                      >
                        {`${session?.teacherName} `}
                      </button>
                    </div>
                    <p className="text-gray-700">
                      Timings: {session?.startTime} - {session?.endTime}
                    </p>
                    <p className="text-gray-700">
                      Days: {session?.day}
                    </p>
                    <p className="text-gray-700">Total Sessions: {session?.sessionCounter?.sessionCount}</p>
                    <p className="text-gray-700">Sessions Completed: {session?.sessionCounter?.currentCount}</p>
                    <div className="flex items-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1 text-gray-600 dark:text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                      <button
                        className="text-sm text-blue-500 hover:underline focus:outline-none"
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
                        <span className="font-semibold">Reviews</span>
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="text-white w-2/5 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-xs px-2 py-2.5 text-center me-2 mb-2"
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
      </div>
      {reviewPopUp && (
        <ReviewsPopupStudent setReviewPopUp={setReviewPopUp} reviewPopUpData={reviewPopUpData} />
      )}
    </div>
  );
};

export default StudentSessionsHistoryPage;
