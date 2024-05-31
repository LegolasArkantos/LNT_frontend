import React, { useState, useEffect } from 'react';
import ApexCharts from 'apexcharts';
import { apiPrivate } from '../services/api';
import { useNavigate } from "react-router-dom";

const StudentQuizProgress = () => {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizProgress = async () => {
      try {
        const response = await apiPrivate.get('/progress/getQuizDataStudent');
        const filteredSessions = response.data.quizData.filter(session => session.quizzes.length > 0);
        setSessions(filteredSessions);
        if (filteredSessions.length > 0) {
          setSelectedSession(filteredSessions[0].sessionId); // Default to first session
        }
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

      const selectedSessionData = sessions.find(session => session.sessionId === selectedSession);

      if (selectedSessionData) {
        const quizData = selectedSessionData.quizzes.map(quiz => ({
          x: quiz.title,
          y: (quiz.submissions.length > 0 ? quiz.submissions.reduce((acc, grade) => acc + grade, 0) / quiz.submissions.length : 0),
          totalMarks: quiz.totalMarks
        }));

        const maxMarks = Math.max(...quizData.map(data => data.totalMarks), 10); // Ensures the y-axis is scaled according to the highest possible marks

        const chartData = {
          series: [{
            data: quizData.map(data => ({ x: data.x, y: data.y }))
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
            categories: selectedSessionData.quizzes.map(quiz => quiz.title),
            labels: {
              rotate: -45,
              style: {
                fontSize: '12px'
              }
            }
          },
          yaxis: {
            min: 0,
            max: maxMarks,
            tickAmount: 10,
            labels: {
              formatter: function (value) {
                return value.toFixed(0);
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
    if (sessions.length > 0) {

      const overallData = sessions.map(session => ({
        x: session.subject,
        y: session.sessionAverage
      }));

      const maxMarks = Math.max(...sessions.flatMap(session => session.quizzes.map(quiz => quiz.totalMarks)), 10); // Ensures the y-axis is scaled according to the highest possible marks

      const overallChartData = {
        series: [{
          data: overallData
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
          categories: sessions.map(session => session.subject),
          labels: {
            rotate: -45,
            style: {
              fontSize: '12px'
            }
          }
        },
        yaxis: {
          min: 0,
          max: maxMarks,
          tickAmount: 10,
          labels: {
            formatter: function (value) {
              return value.toFixed(0);
            }
          }
        }
      };

      const overallChart = new ApexCharts(document.querySelector("#overall-quiz-chart"), overallChartData);
      overallChart.render();

      // Clean up function to destroy the chart on component unmount
      return () => {
        overallChart.destroy();
      };

    }
  }, [sessions]);

  return (
    <div className="p-8 flex flex-col h-full">
      <div className="inline-flex rounded-md shadow-sm" role="group">
                <button type="button" className="px-4 py-2 text-sm font-medium text-white bg-purple-700 hover:bg-purple-800 rounded-s-lg focus:z-10 focus:ring-2 focus:ring-purple-400" onClick={() => navigate('/student-home-page/progress/assignments')}>Assignment</button>
                <button type="button" className="px-4 py-2 text-sm font-medium text-white bg-purple-700 hover:bg-purple-800 focus:z-10 focus:ring-2 focus:ring-purple-400" onClick={() => navigate('/student-home-page/progress/quiz')}>Quizzes</button>
                <button type="button" className="px-4 py-2 text-sm font-medium text-white bg-purple-700 hover:bg-purple-800 rounded-e-lg focus:z-10 focus:ring-2 focus:ring-purple-400" onClick={() => navigate('/student-home-page/progress/analysis')}>Analysis</button>
              </div>
      <div className="flex-1 flex flex-row h-[700px] max-w-screen p-3">
        <div className="card" style={{ width: '50%', height: '100%' }}>
          <div className="card-body">
            <div className="mb-4">
              <h4 className="ml-5 mt-16">Average Quiz Grade by Session</h4>  
            </div>
            <div id="overall-quiz-chart"></div>
          </div>
        </div>
        <div className="card" style={{ width: '50%', height: '100%' }}>
          <div className="card-body">
            {sessions.length > 0 && (
              <>
                <select className="mb-4" onChange={handleSessionChange} value={selectedSession}>
                {sessions.map(session => (
                    <option key={session.sessionId} value={session.sessionId}>{session.subject}</option>
                  ))}
                </select>
                <h4 className="ml-5">Individual Quiz Grades</h4>
                <div id="quiz-chart"></div>
              </>
            )}
            {sessions.length === 0 && (
              <p>No quiz data available.</p>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentQuizProgress;
