import React, { useState, useEffect } from 'react';
import ApexCharts from 'apexcharts';
import { apiPrivate } from '../services/api';
import { useNavigate } from "react-router-dom";

const QuizProgress = () => {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizProgress = async () => {
      try {
        const response = await apiPrivate.get('/progress/getQuizData');
        setSessions(response?.data?.quizData);
      } catch (error) {
        console.error('Error fetching quiz progress:', error);
      }
    };

    fetchQuizProgress();
  }, []);

  const calculateAverageScore = (grades) => {
    if (grades.length === 0) return 0;
    const totalGrades = grades.reduce((acc, grade) => acc + grade, 0);
    return (totalGrades / grades.length);
  };

  const handleSessionChange = (event) => {
    const sessionId = event.target.value;
    setSelectedSession(sessionId);
  };

  useEffect(() => {
    if (selectedSession) {
      const selectedSessionData = sessions.find(session => session?.session === selectedSession);
      if (selectedSessionData) {
        const chartData = {
          series: [{
            data: selectedSessionData?.quizzes.map(quiz => {
              return {
                x: quiz?.title,
                y: calculateAverageScore(quiz?.submissions)
              };
            })
          }],
          chart: {
            type: 'bar',
            height: 350
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: false
            }
          },
          dataLabels: {
            enabled: false
          },
          xaxis: {
            type: 'category',
            categories: selectedSessionData?.quizzes.map(quiz => quiz?.title),
            labels: {
              rotate: -45,
              style: {
                fontSize: '12px'
              }
            }
          },
          yaxis: {
            labels: {
              formatter: function (value) {
                return value.toFixed(2); // Assuming grades are numeric values
              }
            }
          }
        };

        const chart = new ApexCharts(document.querySelector("#quiz-chart"), chartData);
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
    if (sessions?.length > 0) {
      setSelectedSession(sessions[0]?.session);
    }
  }, [sessions]);

  const handleAnalysisClick = () => {
    navigate('/teacher-home-page/analysis');
  };

  // Inside QuizProgress component
useEffect(() => {
    const avgChartData = {
      series: [{
        data: sessions?.map(session => {
          const averageGrade = session?.quizzes.reduce((acc, quiz) => {
            const totalGrades = quiz?.submissions?.reduce((total, submission) => total + submission, 0);
            return acc + (totalGrades / quiz?.submissions?.length);
          }, 0) / session?.quizzes?.length;
          return {
            x: session?.subject,
            y: averageGrade || 0 // Default to 0 if no quizzes or submissions
          };
        })
      }],
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false 
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        type: 'category',
        categories: sessions?.map(session => session?.subject),
        labels: {
          rotate: -45, 
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        min: 0,
        labels: {
          formatter: function (value) {
            return value.toFixed(2); // Assuming grades are numeric values
          }
        }
      }
    };
  
    const avgChart = new ApexCharts(document.querySelector("#avg-chart"), avgChartData);
    avgChart.render();
  
    // Clean up function to destroy the chart on component unmount
    return () => {
      avgChart.destroy();
    };
  }, [sessions]);
  

  return (
    <div className="p-8 flex flex-col h-full">
      <div className="bg-teal-100 rounded-lg outline outline-teal-500 flex-1 flex flex-row h-[700px] max-w-screen mt-[-50px] mb-[125px] ml-[-50px] p-6">
        <div className="card" style={{ width: '50%', height: '100%' }}>
          <div className="card-body">
            <div className="mb-4">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button type="button" className="px-4 py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-s-lg hover:bg-blue-800 hover:text-white-700 focus:z-10 focus:ring-2 focus:ring-teal-400 focus:text-white-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white" onClick={() =>navigate('/teacher-home-page/progress')}>Assignment</button>
                <button type="button" className="px-4 py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 hover:text-white-700 focus:z-10 focus:ring-2 focus:ring-teal-400 focus:text-white-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white" onClick={() =>navigate('/teacher-home-page/Quiz')}>Quizzes</button>
                <button type="button" className="px-4 py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-e-lg hover:bg-blue-100 hover:text-white-700 focus:z-10 focus:ring-2 focus:ring-teal-400 focus:text-white-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white" onClick={() =>navigate('/teacher-home-page/analysis')} >Analysis</button>
              </div>
              <h4 className="ml-5 mt-4">Average Progress by Session</h4>
            </div>
            <div id="avg-chart"></div>
          </div>
        </div>
        <div className="card" style={{ width: '50%', height: '100%' }}>
          <div className="card-body">
            <select className="mb-4" onChange={handleSessionChange} value={selectedSession}>
              {sessions?.map(session => (
                <option key={session?.session} value={session?.session}>{session?.subject}</option>
              ))}
            </select>
            <h4 className="ml-5">Quiz Progress</h4>
            <div id="quiz-chart"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizProgress;
