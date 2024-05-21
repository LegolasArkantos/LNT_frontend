import React, { useState, useEffect } from 'react';
import useApiPrivate from '../hooks/useAPIPrivate';
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import loadingPurple from '../assets/loadingPurple.json';
import ReviewsPopupTeacher from '../components/ReviewsPopupTeacher';

const TeacherSessionHistoryPage = () => {
  const [completedSessions, setCompletedSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [reviewPopUp, setReviewPopUp] = useState(false);
  const [reviewPopUpData, setReviewPopUpData] = useState(null);
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
      <div className="p-8 flex max-h-screen max-w-screen">
        <div className="bg-teal-100 rounded-lg outline outline-teal-500 flex-1 flex flex-col h-[500px] mb-20 max-w-screen mx-auto mt-[-50px] mb-[125px] ml-[-50px] mr-[-50px] p-6" style={{ overflow: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Teacher Session History</h2>
          </div>
          <div className="flex flex-wrap" style={{ paddingRight: "17px" }}>
            {completedSessions.length !== 0 ? (
              completedSessions.map((session) => (
                <div key={session._id} className="w-1/5 h-4/5 bg-gray-100 pt-3 pb-3 pl-4 pr-4 rounded-lg justify-center flex flex-col shadow-lg mr-4 mb-4">
                  <div className="flex justify-start">
                    <button
                      className="text-blue-500 hover:underline focus:outline-none"
                      onClick={() => handleSessionClick(session._id, session.subject)}
                    >
                      <h3 className="text-4/5 font-semibold mb-2">{session.subject}</h3>
                    </button>
                  </div>
                  <div className="flex w-full flex-col justify-start">
                    <p className="text-gray-700">Start Time: {session.startTime}</p>
                    <p className="text-gray-700">End Time: {session.endTime}</p>
                    <p className="text-gray-700">Days: {session.day}</p>
                    <p className="text-gray-700">No. of Students: {session.students.length}</p>
                    <div className="flex items-center mb-2">
                      <button
                        className="text-sm text-blue-500 hover:underline focus:outline-none"
                        onClick={() => handleShowStudents(session)}
                      >
                        Show Students
                      </button>
                      <button
                        className="ml-2 text-sm text-blue-500 hover:underline focus:outline-none"
                        onClick={() => handleReviewPopup(session)}
                      >
                        Reviews
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
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
            )}
          </div>
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
