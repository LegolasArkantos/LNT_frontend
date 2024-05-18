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
        const response = await apiPrivate.get('teacher/myStudents');
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


  return (
    <div className=" max-h-screen max-w-screen">
      {/* Main Content */}
      <div className="p-8 flex  max-h-screen max-w-screen ">
        {/* Sessions Container */}
        <div className="bg-teal-100 rounded-lg outline outline-teal-500 flex-1 flex flex-col h-[500px] mb-20 max-w-screen mx-auto mt-[-50px] mb-[125px] ml-[-50px] mr-[-50px] p-6" style={{ overflow: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none" }}  >
          {/* Teacher Sessions */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Teacher Sessions</h2>
            <button onClick={() => navigate('/teacher-home-page/create')} className="inline-flex items-center px-4 py-2 mt-2  text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ">
              Create Session
            </button>
          </div>
          <div className="flex flex-wrap" style={{ paddingRight: "17px" }}>
            {/* Session Cards (Fetched Data) */}
            {sessions.length !== 0 ? (
            sessions?.map((session) => (
              <div key={session?._id} className="w-2/5 h-full bg-gray-100 p-6 rounded-lg flex flex-col justify-between shadow-lg mr-4 mb-4">
                <div className='flex justify-between'>
                  <button
                    className="text-black-500 hover:underline"
                    onClick={() => handleAssignmentClick(session?._id, session?.subject)}
                  >
                    <h3 className="text-xl font-semibold mb-2">
                      {session?.subject}
                    </h3>
                  </button>
                  <div onClick={() => handleJoinVideoCall(session?._id)} className='hover:bg-teal-200 rounded-full'>
                    <svg className='cursor-pointer' width="40px" height="40px" viewBox="0 0 48 48" version="1" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 48 48" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#f01919" d="M8,12h22c2.2,0,4,1.8,4,4v16c0,2.2-1.8,4-4,4H8c-2.2,0-4-1.8-4-4V16C4,13.8,5.8,12,8,12z"></path> <polygon fill="#f52424" points="44,35 34,29 34,19 44,13"></polygon> </g></svg>
                  </div>
                </div>
                <p className="text-gray-700">Start Time: {session?.startTime}</p>
                <p className="text-gray-700">End Time: {session?.endTime}</p>
                <p className="text-gray-700">Days: {session?.day}</p>
                <p className="text-gray-700">Payment Status: {session?.paymentStatus}</p>
                <p className="text-gray-700">Price: ${session?.sessionPrice}</p>
                <p className="text-gray-700">No. of Students: {session?.students?.length}</p>
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
                        sessionName: session?.subject,
                        profilePage: false
                      }
                      setReviewPopUpData(data);
                      setReviewPopUp(true)
                    }}
                  >
                    <span className="font-semibold">Reviews</span>
                  </button>
                </div>
                <div class="inline-flex rounded-md shadow-sm" role="group">
                  <button onClick={() => handleShowStudents(session)} className="inline-flex items-center px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-500 rounded-s-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Show Students
                  </button>
                  <button onClick={() => handleUpdateClick(session)} className="inline-flex items-center px-4 py-2 mt-4 text-sm font-medium text-white bg-green-500 rounded-e-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                    Update Session
                  </button>
                </div>
              </div>
            )))
          :
          (
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
      {
        reviewPopUp && (
          <ReviewsPopupTeacher setReviewPopUp={setReviewPopUp} reviewPopUpData={reviewPopUpData}/>
        )
      }
      {/* Students Popup */}
      {selectedSession && (
        <div className="fixed top-0 left-0 h-screen w-screen bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded">
            <h2 className="text-2xl font-bold mb-4">Students in Session {selectedSession?.subject}</h2>
            {selectedSession?.students?.map((student) => (
              <div key={student?._id} className="mb-2">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => handleTeacherClick(student?._id)}
                >
                  {`${student?.firstName} ${student?.lastName}`}
                </button>
              </div>
            ))}
            <button onClick={handleClosePopup} className="text-blue-500 mt-4 underline">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherSessionsPage;
