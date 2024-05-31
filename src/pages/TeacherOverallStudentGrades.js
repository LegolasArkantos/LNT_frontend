import React, { useState, useEffect } from 'react';
import { apiPrivate } from '../services/api';
import Lottie from 'react-lottie';
import loadingPurple from '../assets/loadingPurple.json';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '@ramonak/react-progress-bar';

const StudentGrades = () => {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState('');
  const [gradesData, setGradesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await apiPrivate.get('/progress/getSessionsData');
        setSessions(response.data.sessions);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };

    fetchSessions();
  }, []);

  const fetchGrades = async () => {
    if (!selectedSession) {
      alert('Please select a session.');
      return;
    }
    setLoading(true);
    try {
      const response = await apiPrivate.get(`/progress/getStudentOverallData/${selectedSession}`);
      setGradesData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching grades:', error);
      setLoading(false);
    }
  };

  const AnimatedCounter = ({ targetValue, duration }) => {
    const [currentValue, setCurrentValue] = useState(0);

    useEffect(() => {
      let start = 0;
      const end = parseFloat(targetValue);
      const incrementTime = duration / end;

      const timer = setInterval(() => {
        start += 1;
        setCurrentValue(start);
        if (start >= end) {
          clearInterval(timer);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }, [targetValue, duration]);

    return <span>{currentValue}%</span>;
  };

  const getProgressColor = (percentage) => {
    if (percentage < 50) return '#FF6347'; // Darker red
    if (percentage < 70) return '#FFD700'; // Darker yellow
    return '#32CD32'; // Darker green
  };

  return (
    <div className="p-8 flex flex-col h-full">
      <div className="flex-1 flex flex-row h-[700px] max-w-screen mt-[-50px] mb-[125px] ml-[-50px] p-6">
        <div className="card" style={{ width: '100%', height: '100%' }}>
          <div className="card-body">
            <div className="mb-4">
            <div class="inline-flex rounded-md shadow-sm" role="group">
              <button type="button" class="px-4 py-2 text-sm font-medium text-white bg-purple-700  hover:bg-purple-800 rounded-s-lg hover:bg-blue-800 hover:text-white-700 focus:z-10 focus:ring-2 focus:ring-purple-400 focus:text-white-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white" onClick={() =>navigate('/teacher-home-page/progress/assignments')}>Assignment</button>
              <button type="button" class="px-4 py-2 text-sm font-medium text-white bg-purple-700  hover:bg-purple-800 hover:text-white-700 focus:z-10 focus:ring-2 focus:ring-purple-400 focus:text-white-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white" onClick={() =>navigate('/teacher-home-page/progress/quiz')}>Quizzes</button>
              <button type="button" class="px-4 py-2 text-sm font-medium text-white bg-purple-700  hover:bg-purple-800 hover:text-white-700 focus:z-10 focus:ring-2 focus:ring-purple-400 focus:text-white-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white" onClick={() =>navigate('/teacher-home-page/progress/Individual')}>Individual</button>
              <button type="button" class="px-4 py-2 text-sm font-medium text-white bg-purple-700  hover:bg-purple-800 rounded-e-lg hover:bg-blue-100 hover:text-white-700 focus:z-10 focus:ring-2 focus:ring-purple-400 focus:text-white-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white" onClick={() =>navigate('/teacher-home-page/progress/analysis')} >Analysis</button>
            </div>
            </div>
            <h4 className="font-bold mt-4 mb-4">Student Grades</h4>
            <div className="mb-4">
              <select 
                className="form-select" 
                value={selectedSession} 
                onChange={(e) => setSelectedSession(e.target.value)}
              >
                <option value="">Select a session</option>
                {sessions.map(session => (
                  <option key={session._id} value={session._id}>
                    {session.subject}
                  </option>
                ))}
              </select>
              <button 
                className="ml-4 px-4 py-2 text-sm font-medium text-white bg-purple-700 hover:bg-purple-800 rounded-lg hover:text-white-700 focus:z-10 focus:ring-2 focus:ring-purple-400 focus:text-white-700"
                onClick={fetchGrades}
              >
                Load
              </button>
            </div>
            {loading ? (
              <div className="mt-6 flex justify-center">
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
            ) : (
              <div className="overflow-auto" style={{ maxHeight: '500px' }}>
                {gradesData.map(student => (
                  <details key={student.studentId} className="mb-6 p-4 bg-white rounded shadow">
                    <summary className="font-semibold text-xl flex items-center">
                      {student.studentName}
                      <ProgressBar 
                        completed={student.overallPercentage.toFixed(2)}
                        className="flex-1 ml-4"
                        height="10px" 
                        width="50%"
                        bgColor={getProgressColor(student.overallPercentage)}
                        animateOnRender
                        transitionDuration="2s" 
                        isLabelVisible={false} 
                      />
                      <span className="ml-2">
                        <AnimatedCounter targetValue={student.overallPercentage.toFixed(2)} duration={1800} />
                      </span>
                    </summary>
                    <div className="mt-2">
                      <h4 className="font-semibold">Assignments</h4>
                      <ul className="list-disc pl-5">
                        {student.assignments
                          .filter(assignment => assignment.marksObtained !== -1)
                          .map(assignment => {
                            const percentage = (assignment.marksObtained / assignment.maxMarks) * 100;
                            return (
                              <li key={assignment.assignmentId} className="flex items-center">
                                {assignment.assignmentTitle}:
                                <ProgressBar 
                                  completed={percentage.toFixed(2)}
                                  className="flex-1 ml-4"
                                  height="10px" 
                                  width="50%"
                                  bgColor={getProgressColor(percentage)}
                                  animateOnRender
                                  transitionDuration="2s" 
                                  isLabelVisible={false} 
                                />
                                <span className="ml-2">
                                  <AnimatedCounter targetValue={percentage.toFixed(2)} duration={2000} />
                                </span>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                    <div className="mt-2">
                      <h4 className="font-semibold">Quizzes</h4>
                      <ul className="list-disc pl-5">
                        {student.quizzes
                          .filter(quiz => quiz.marksObtained !== -1)
                          .map(quiz => {
                            const percentage = (quiz.marksObtained / quiz.maxMarks) * 100;
                            return (
                              <li key={quiz.quizId} className="flex items-center">
                                {quiz.quizTitle}:
                                <ProgressBar 
                                  completed={percentage.toFixed(2)}
                                  className="flex-1 ml-4"
                                  height="10px" 
                                  width="50%"
                                  bgColor={getProgressColor(percentage)}
                                  animateOnRender
                                  transitionDuration="2s" 
                                  isLabelVisible={false} 
                                />
                                <span className="ml-2">
                                  <AnimatedCounter targetValue={percentage.toFixed(2)} duration={2000} />
                                </span>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  </details>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentGrades;
