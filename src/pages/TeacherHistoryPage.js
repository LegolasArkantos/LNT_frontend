import React, { useState, useEffect } from 'react';
import useApiPrivate from '../hooks/useAPIPrivate';
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import loadingPurple from '../assets/loadingPurple.json';
import ReviewsPopupTeacher from '../components/ReviewsPopupTeacher';
import emptyDataImgCourses from '../assets/no data.png';

const TeacherSessionHistoryPage = () => {
  const [completedSessions, setCompletedSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [reviewPopUp, setReviewPopUp] = useState(false);
  const [reviewPopUpData, setReviewPopUpData] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const apiPrivate = useApiPrivate();

  useEffect(() => {
    const fetchCompletedSessions = async () => {
      try {
        const response = await apiPrivate.get('/history/completedSessions');
        setCompletedSessions(response.data.sessions);
      } catch (error) {
        console.error(error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchCompletedSessions();
  }, [apiPrivate]);

  const handleShowStudents = (session) => {
    setSelectedSession(session);
  };

  const handleClosePopup = () => {
    setSelectedSession(null);
  };

  const handleTeacherClick = (studentId) => {
    navigate('/teacher-home-page/StudentProfileSecondary', { state: { studentId, otherRole: "Student" } });
  };

  const handleReviewPopup = (session) => {
    const data = {
      teacherId: session.teacher,
      sessionName: session.subject,
      profilePage: false
    }
    setReviewPopUpData(data);
    setReviewPopUp(true);
  };

  const handleSessionClick = (sessionId, subject) => {
    navigate('/teacher-home-page/assignments', { state: { sessionId, subject } });
  };

  return (
    <div className="max-h-screen max-w-screen">
      <div className="flex flex-col max-h-screen max-w-screen">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl text-[#7179C6] font-bold">Past Sessions</h2>
          </div>
          <div className="flex w-full items-center justify-center h-full overflow-y-scroll scroll scrollbar-hide grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mb-10 gap-3">
            {
              loading && (
                <div className="flex w-full h-[500px] items-center justify-center">
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
              )
            }
            {!loading && completedSessions.length === 0 
            ? (<div className="flex w-full h-[300px] items-center justify-center">
            {/* <p className="text-xl font-normal">No Sessions Available</p> */}
            <img className="w-1.5/5 h-full" src={emptyDataImgCourses}/>
            </div>
            )
            : (
              completedSessions.map((session) => (
                <div key={session?._id} className="w-full h-4.5/5 bg-purple-100 pt-3 pb-3 pl-4 pr-4 rounded-lg justify-center flex flex-col shadow-lg mr-4 mb-4">
                <div className='flex justify-start'>
                  <button
                    className="text-purple-800 hover:underline"
                    onClick={() => handleSessionClick(session?._id, session?.subject)}
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
                  <p className="text-gray-700 text-sm font-bold">Sessions Finished:</p>
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
                </div>
              </div>
              ))
            )}
          </div>
      </div>
      {selectedSession && (
        <div className="fixed top-0 left-0 h-screen w-screen bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded">
            <h2 className="text-2xl font-bold mb-4">Students in Session {selectedSession.subject}</h2>
            {selectedSession.students.map((student) => (
              <div key={student._id} className="mb-2">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => handleTeacherClick(student._id)}
                >
                  {`${student.firstName} ${student.lastName}`}
                </button>
              </div>
            ))}
            <button onClick={handleClosePopup} className="text-blue-500 mt-4 underline">
              Close
            </button>
          </div>
        </div>
      )}
      {reviewPopUp && (
        <ReviewsPopupTeacher setReviewPopUp={setReviewPopUp} reviewPopUpData={reviewPopUpData} />
      )}
    </div>
  );
};

export default TeacherSessionHistoryPage;
