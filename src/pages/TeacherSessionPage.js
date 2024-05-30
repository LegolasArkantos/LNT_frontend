import React, { useState, useEffect } from 'react';
import useApiPrivate from '../hooks/useAPIPrivate';
import { useNavigate } from 'react-router-dom';
import ReviewsPopupTeacher from '../components/ReviewsPopupTeacher';
import Lottie from 'react-lottie';
import loadingPurple from '../assets/loadingPurple.json';

const TeacherSessionsPage = () => {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [reviewPopUp, setReviewPopUp] = useState(false);
  const [reviewPopUpData, setReviewPopUpData] = useState(null);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const navigate = useNavigate();
  const apiPrivate = useApiPrivate();

  useEffect(() => {
    const getSessions = async () => {
      try {
        const response = await apiPrivate.get('teacher/my-sessions');
        setSessions(response.data.sessions);
      } catch (error) {
        console.error(error);
      }
    };

    getSessions();
  }, []);

  const handleShowStudents = (session) => {
    setSelectedSession(session);
  };

  const handleClosePopup = () => {
    setSelectedSession(null);
  };

  const handleTeacherClick = (studentId) => {
    navigate('/teacher-home-page/StudentProfileSecondary', { state: { studentId, otherRole: "Student" } });
  };

  const handleAssignmentClick = (sessionId, subject) => {
    navigate('/teacher-home-page/assignments', { state: { sessionId, subject } });
  };

  const handleUpdateClick = (session) => {
    navigate('/teacher-home-page/update', { state: { session } });
  };

  const handleJoinVideoCall = async (roomID) => {
    try {
      await apiPrivate.post(`sessions/launch-session/${roomID}`).then((res) => {
        console.log("HELLO Frontend")
        console.log(res.status)
        if (res.status === 200) {
          navigate('/teacher-home-page/live-session', { state: { roomID, userType: "Teacher", purpose: "Session" } });
        }
      })
    }
    catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        console.error("An error occurred:", error);
      }
    }
  }

  const handleFinishSession = async (sessionID) => {
    try {
      await apiPrivate.patch(`sessions/session-completed/${sessionID}`).then((res) => {
        if (res.status === 200) {
          setSessions((sessions) => sessions.filter((session) => session?._id != sessionID))
        }
      })
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-h-screen max-w-screen">
      {/* Main Content */}
      <div className="flex max-h-screen max-w-screen">
        {/* Sessions Container */}
        <div className="bg-white rounded-lg flex-1 flex flex-col w-4/5 ">
          {/* Teacher Sessions */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl text-[#7179C6] font-bold">My Sessions</h2>
            <button onClick={() => navigate('/teacher-home-page/create')} className="items-center px-4 py-2 mt-2 text-sm font-medium text-white bg-[#7179C6] rounded-lg hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
              Create Session
            </button>
          </div>
          <div className="flex w-full items-center justify-center h-full overflow-y-scroll scroll scrollbar-hide grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* Session Cards (Fetched Data) */}
            {sessions.length !== 0 ? (
              sessions?.map((session) => (
                <div key={session?._id} className="w-1.5/5 h-4.5/5 bg-purple-100 pt-3 pb-3 pl-4 pr-4 rounded-lg justify-center flex flex-col shadow-lg mr-4 mb-4">
                  <div className='flex justify-start'>
                    <button
                      className="text-purple-800 hover:underline"
                      onClick={() => handleAssignmentClick(session?._id, session?.subject)}
                    >
                      <h3 className="text-4/5 font-bold mb-2">
                        {session?.subject}
                      </h3>
                    </button>
                  </div>
                  <div className='flex w-full flex-col space-y-2 justify-start'>
                    <div className='flex'>
                      <div className='flex flex-col space-y-2'>
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
                          <p className="text-gray-700 text-sm font-bold">Sessions finished:</p>
                        </div>
                        <div className='flex'>
                          <p className="text-gray-700 text-sm font-bold">No. of Students:</p>
                        </div>
                      </div>
                      <div className='flex flex-col space-y-2 ml-8'>
                        <p className='font-semibold text-sm'>{session?.startTime} - {session?.endTime}</p>
                        <p className='font-semibold text-sm'>{session?.day}</p>
                        <p className='font-semibold text-sm'>{session?.sessionCounter?.sessionCount}</p>
                        <p className='font-semibold text-sm'>{session?.sessionCounter?.currentCount}</p>
                        <p className='font-semibold text-sm'>{session?.students?.length}</p>
                      </div>
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
                        className="text-sm focus:outline-none"
                        onClick={() => {
                          const data = {
                            teacherId: session?.teacher,
                            sessionName: session?.subject,
                            profilePage: false
                          }
                          setReviewPopUpData(data);
                          setReviewPopUp(true)
                        }}
                      >
                        <span className="font-semibold hover:border-b-2 hover:border-[#7179C6] text-[#7179C6]">Reviews</span>
                      </button>
                    </div>
                    {
                      session?.sessionCounter?.currentCount < session?.sessionCounter?.sessionCount
                        ? (<button onClick={() => handleJoinVideoCall(session?._id)} type="button" className="text-white w-2/5 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-xs px-2 py-2.5 text-center me-2 mb-2">Launch Session</button>)
                        : (<button onClick={() => handleFinishSession(session?._id)} type="button" className="text-white w-2/5 bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-xs px-2 py-2.5 text-center me-2 mb-2">Finish</button>)
                    }
                  </div>
                  <div className="inline-flex items-center justify-center rounded-md shadow-sm" role="group">
                    <button onClick={() => handleShowStudents(session)} className="inline-flex items-center px-4 py-2 mt-4 text-sm font-medium text-white bg-[#7179C6] rounded-s-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
                      Show Students
                    </button>
                    <button onClick={() => handleUpdateClick(session)} className="inline-flex items-center px-4 py-2 mt-4 text-sm font-medium text-white bg-[#7179C6] rounded-e-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
                      Update Session
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center">
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
      {
        reviewPopUp && (
          <ReviewsPopupTeacher setReviewPopUp={setReviewPopUp} reviewPopUpData={reviewPopUpData} />
        )
      }
      {/* Students Popup */}
      {selectedSession && (
        <div className="fixed top-0 left-0 h-screen w-screen z-40 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded h-2.5/5 w-1.5/5">
            <h2 className="text-2xl font-bold mb-4">Enrolled Students</h2>
            <div className='flex flex-col h-2/5 space-y-4 mb-3 overflow-y-scroll scroll scrollbar-hide'>
            {selectedSession?.students?.map((student) => (
              <div key={student?._id} className="">
                <button
                  className="font-bold text-sm text-gray-700 hover:underline"
                  onClick={() => handleTeacherClick(student?._id)}
                >
                  {`${student?.firstName} ${student?.lastName}`}
                </button>
              </div>
            ))}
            </div>
            <button onClick={handleClosePopup} className="bg-gray-500 hover:bg-gray-600 items-center px-4 py-2 mt-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherSessionsPage;
