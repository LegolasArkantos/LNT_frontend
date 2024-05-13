import React from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import useApiPrivate from '../hooks/useAPIPrivate';

const SessionOverviewPage = () => {

    const location = useLocation();
    const session = location.state.session;
    console.log(session)
    const navigate = useNavigate();
    const apiPrivate = useApiPrivate();

    const handleTeacherClick = (teacherId) => {
        navigate('/student-home-page/StudentProfileSecondary', { state: { teacherId, otherRole: "Teacher" } });
    };

    const joinSession = async (sessionId) => {
  try {
      const response = await apiPrivate.post(`/sessions/joinSession/${sessionId}`);
      alert('Student joined session successfully');
  } catch (error) {
      console.log(error);
  }
};

  return (
    <div>
        <div className='flex space-x-20'>
        <h1 className='mb-2 text-3xl font-bold tracking-tight text-teal-900'>
            {session.subject}
        </h1>
        <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2"
        onClick={() => joinSession(session.teacher._id)}>
            Enroll
            </button>
        </div>
        
        <p className="text-sm text-teal-500 hover:underline cursor-pointer font-semibold"
        onClick={() => handleTeacherClick(session.teacher._id)}>
            {session.teacherName}
        </p>
        <p className="mb-2 text-sm font-medium text-green-500 dark:text-green-400">
            Price: {session.sessionPrice}
        </p>
        <p className="mb-2 text-sm text-gray-700 dark:text-gray-400">
            <span className="font-semibold">Start:</span> {session.startTime}
        </p>
        <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">
            <span className="font-semibold">End:</span> {session.endTime}
        </p>
        <p>
            {session.sessionDescription}
        </p>
    </div>
  )
}

export default SessionOverviewPage