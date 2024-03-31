import React, { useState, useEffect } from 'react';
import { apiPrivate } from '../services/api';
import { useNavigate } from 'react-router-dom';

const StudentSessionsPage = ({socket}) => {
  const [sessions, setSessions] = useState([]);
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
    navigate('/student-home-page/live-session', { state: {roomID, userType: "Student"}});
  }

  return (
    <div className="h-screen">
      <div className="p-8 flex flex-col h-full">
        {/* Sessions Container */}
        <div className="bg-teal-100 rounded-lg outline outline-teal-500 flex-1 flex flex-col  h-[700px] max-w-screen mt-[-50px] mb-[125px] ml-[-50px] p-6" >
          {/* Student Sessions */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">My Sessions</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3   mb-10 overflow-y-scroll scroll scrollbar-hide" style={{ paddingRight: '17px' }}>
            {/* Session Rectangles (Fetched Data) */}
            {sessions.map((session) => (
              <div key={session._id} className="max-w-md bg-gray-100 p-6 rounded-lg shadow-lg mr-4 mb-4">
                <div className='flex justify-between'>
                <button
                  className="text-xl font-semibold mb-2 hover:underline"
                  onClick={() => handleSessionClick(session._id)}
                >
                  {session.subject}
                </button>
                <button onClick={() => handleJoinVideoCall(session._id)} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Join Video</button>
                
                </div>
                <p className="text-gray-700">
                  Teacher: 
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleTeacherClick(session.teacher)}
                  >
                    {session.teacherName}
                  </button>
                </p>
                <p className="text-gray-700">
                  Timings: {session.startTime} - {session.endTime}
                </p>
                <p className="text-gray-700">Status: {session.status}</p>
                <p className="text-gray-700">Number of Assignments: {}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSessionsPage;
