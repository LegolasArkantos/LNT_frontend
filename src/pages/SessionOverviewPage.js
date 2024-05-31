import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import useApiPrivate from '../hooks/useAPIPrivate';
import Popup from '../components/Popup';

const SessionOverviewPage = () => {

    const [popup, setPopup] = useState(false);
    
    const location = useLocation();
    const session = location.state.session;
    const enrolled = location.state.enrolled;
    console.log(session)
    const navigate = useNavigate();
    const apiPrivate = useApiPrivate();

    const handleTeacherClick = (teacherId) => {
        navigate('/student-home-page/StudentProfileSecondary', { state: { teacherId, otherRole: "Teacher" } });
    };

    const joinSession = async (sessionId) => {
  try {
      await apiPrivate.post(`/sessions/joinSession/${sessionId}`).then((res) => {
        if (res.status === 200) {
            setPopup(true)
        }
      });
  } catch (error) {
      console.log(error);
  }
};

  return (
    <div>
        <div className='flex space-x-20 justify-between'>
        <h1 className='mb-2 text-3xl font text-[#7179C6]'>
            {session?.subject}
        </h1>
        {
            !enrolled && (
                <button type="button" class="text-white w-1/5 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-xs px-2 py-2.5 text-center me-2 mb-2"
                onClick={() => joinSession(session?._id)}>
                    Enroll
                </button>
            )
        }
        </div>
        
        <p className="text-sm text-teal-500 hover:underline cursor-pointer font-semibold"
        onClick={() => handleTeacherClick(session?.teacher._id)}>
            Instructor: {session?.teacherName}
        </p>
        <p className="mb-2 text-sm text-gray-700 dark:text-gray-400">
            <span className="font-semibold">Start:</span> {session?.startTime}
        </p>
        <p className="mb-2 text-sm text-gray-700 dark:text-gray-400">
            <span className="font-semibold">End:</span> {session?.endTime}
        </p>
        <p className="mb-2 text-sm text-gray-700 dark:text-gray-400">
        <span className="font-semibold">Day:</span> {session?.day}
        </p>
        <p className="mb-6 text-sm text-gray-700 dark:text-gray-400">
        <span className="font-semibold">Students Enrolled:</span> {session?.students.length}
        </p>
        <div className='flex-col'>
        <p className="mb-3 text-xl underline font-semibold text-gray-700 dark:text-gray-400">
            Course Description
        </p>
        <div className='flex w-full h-[370px] bg-gray-100 rounded p-3 overflow-y-scroll'>
        <p className='mb-4 text-m font-semibold text-teal-900' style={{ whiteSpace: 'pre-wrap' }}>
            {session?.sessionDescription}
        </p>
        </div>
        </div>

        {
            popup
            &&
            (<Popup setPopup={setPopup} message="Course Enrolled Successfully!"/>)
        }
    </div>
  )
}

export default SessionOverviewPage