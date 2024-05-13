import React from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import useApiPrivate from '../hooks/useAPIPrivate';

const SessionOverviewPage = () => {

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
            alert('Student joined session successfully');
            window.history.back();
        }
      });
  } catch (error) {
      console.log(error);
  }
};

  return (
    <div>
        <div className='flex space-x-20 justify-between'>
        <h1 className='mb-2 text-3xl font-bold tracking-tight text-teal-900'>
            {session.subject}
        </h1>
        {
            !enrolled && (
                <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm w-1/5 px-4 py-2.5 text-center me-2 mb-2"
                onClick={() => joinSession(session._id)}>
                    Enroll
                </button>
            )
        }
        </div>
        
        <p className="text-sm text-teal-500 hover:underline cursor-pointer font-semibold"
        onClick={() => handleTeacherClick(session.teacher._id)}>
            Instructor: {session.teacherName}
        </p>
        <p className="mb-2 text-sm font-medium text-green-500 dark:text-green-400">
            Price: {session.sessionPrice}
        </p>
        <p className="mb-2 text-sm text-gray-700 dark:text-gray-400">
            <span className="font-semibold">Start:</span> {session.startTime}
        </p>
        <p className="mb-2 text-sm text-gray-700 dark:text-gray-400">
            <span className="font-semibold">End:</span> {session.endTime}
        </p>
        <p className="mb-2 text-sm text-gray-700 dark:text-gray-400">
        <span className="font-semibold">Day:</span> {session.day}
        </p>
        <p className="mb-6 text-sm text-gray-700 dark:text-gray-400">
        <span className="font-semibold">Students Enrolled:</span> {session.students.length}
        </p>
        <div className='flex-col'>
        <p className="mb-3 text-xl underline font-semibold text-gray-700 dark:text-gray-400">
            Course Description
        </p>
        <div className='flex w-full h-[370px] bg-gray-100 rounded p-3 overflow-y-scroll'>
        <p className='mb-4 text-m font-semibold text-teal-900'>
            {session.sessionDescription}
        </p>
        </div>
        </div>
    </div>
  )
}

export default SessionOverviewPage