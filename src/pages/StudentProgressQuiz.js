import React, { useState, useEffect } from 'react';
import ApexCharts from 'apexcharts';
import { apiPrivate } from '../services/api';
import { useNavigate } from 'react-router-dom';

const StudentQuizProgress = () => {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizProgress = async () => {
      try {
        const response = await apiPrivate.get('/progress/getQuizDataStudent');
        setSessions(response.data.overallQuizData);
      } catch (error) {
        console.error('Error fetching quiz progress:', error);
      }
    };

    fetchQuizProgress();
  }, []);

  const handleSessionChange = (event) => {
    const sessionId = event.target.value;
    setSelectedSession(sessionId);
  };

  useEffect(() => {
    if (selectedSession) {
      const selectedSessionData = sessions.find((session) => session.session === selectedSession);
      if (selectedSessionData) {
        const chartData = {
          series: [
            {
              name: 'Average Grade',
              data: selectedSessionData.quizzes.map((quiz) => ({
                x: quiz.title,
                y: quiz.averageGrade,
              })),
            },
          ],
          chart: {
            type: 'bar',
            height: 350,
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            type: 'category',
            categories: selectedSessionData.quizzes.map((quiz) => quiz.title),
            labels: {
              rotate: -45,
              style: {
                fontSize: '12px',
              },
            },
          },
          yaxis: {
            min: 0,
            max: 100,
            tickAmount: 10,
            labels: {
              formatter: function (value) {
                return value.toFixed(0) + '%';
              },
            },
          },
        };

        const chart = new ApexCharts(document.querySelector('#session-chart'), chartData);
        chart.render();

        // Clean up function to destroy the chart on component unmount or session change
        return () => {
          chart.destroy();
        };
      }
    }
  }, [selectedSession, sessions]);

  useEffect(() => {
    // Set the default selected session to the first session
    if (sessions.length > 0) {
      setSelectedSession(sessions[0].session);
    }
  }, [sessions]);

  return (
    <div className="p-8 flex flex-col h-full">
      <div className="bg-teal-100 rounded-lg outline outline-teal-500 flex-1 flex flex-row h-[700px] max-w-screen mt-[-50px] mb-[125px] ml-[-50px] p-6">
        <div className="card" style={{ width: '50%', height: '100%' }}>
          <div className="card-body">
            <div className="mb-4">
              <div class="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  class="px-4 py-2 text-sm font-medium text-white bg-blue-700  hover:bg-blue-800 rounded-s-lg hover:bg-blue-800 hover:text-white-700 focus:z-10 focus:ring-2 focus:ring-teal-400 focus:text-white-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                  onClick={() => navigate('/student-home-page/assignment')}
                >
                  Assignment
                </button>
                <button
                  type="button"
                  class="px-4 py-2 text-sm font-medium text-white bg-blue-700  hover:bg-blue-800 hover:text-white-700 focus:z-10 focus:ring-2 focus:ring-teal-400 focus:text-white-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                  onClick={() => navigate('/student-home-page/ProgressQuiz')}
                >
                  Quizzes
                </button>
                <button
                  type="button"
                  class="px-4 py-2 text-sm font-medium text-white bg-blue-700  hover:bg-blue-800 rounded-e-lg hover:bg-blue-100 hover:text-white-700 focus:z-10 focus:ring-2 focus:ring-teal-400 focus:text-white-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                  onClick={() => navigate('/student-home-page/analysis')}
                >
                  Analysis
                </button>
              </div>
              <h4 className="ml-5 mt-4">Average Progress by Session</h4>
            </div>
            <div id="session-chart"></div>
          </div>
        </div>
        <div className="card" style={{ width: '50%', height: '100%' }}>
          <div className="card-body">
            <select className="mb-4" onChange={handleSessionChange} value={selectedSession}>
              {sessions.map((session) => (
                <option key={session.session} value={session.session}>
                  {session.subject}
                </option>
              ))}
            </select>
            <h4 className="ml-5">Quiz Progress</h4>
            <div id="session-chart"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentQuizProgress;
