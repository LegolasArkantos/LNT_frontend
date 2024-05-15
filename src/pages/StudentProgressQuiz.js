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
        setSessions(response.data);
      } catch (error) {
        console.error('Error fetching quiz progress:', error);
      }
    };

    fetchQuizProgress();
  }, []);

  useEffect(() => {
    if (sessions.length > 0) {
      setSelectedSession(sessions[0].sessionId);
    }
  }, [sessions]);

  const handleSessionChange = (event) => {
    setSelectedSession(event.target.value);
  };

  useEffect(() => {
    if (selectedSession) {
      const selectedSessionData = sessions.find(session => session.sessionId === selectedSession);
      if (selectedSessionData) {
        // Chart for overall quiz grades in each session
        const overallChartData = {
          series: [{
            data: selectedSessionData.quizzes.map(quiz => ({
              x: quiz.title,
              y: quiz.submissions.reduce((acc, submission) => acc + submission.grade, 0) / quiz.submissions.length
            }))
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
            labels: {
              formatter: function (value) {
                return value.toFixed(2);
              }
            }
          }
        };

        const overallChart = new ApexCharts(document.querySelector("#overall-chart"), overallChartData);
        overallChart.render();

        // Chart for individual quiz grades in each session
        const individualChartData = {
          series: selectedSessionData.quizzes.map(quiz => ({
            name: quiz.title,
            data: quiz.submissions.map(submission => submission.grade)
          })),
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
            labels: {
              formatter: function (value) {
                return value.toFixed(2);
              }
            }
          }
        };

        const individualChart = new ApexCharts(document.querySelector("#individual-chart"), individualChartData);
        individualChart.render();
      }
    }
  }, [selectedSession, sessions]);

  return (
    <div className="p-8 flex flex-col h-full">
      <div className="bg-teal-100 rounded-lg outline outline-teal-500 flex-1 flex flex-row h-[700px] max-w-screen mt-[-50px] mb-[125px] ml-[-50px] p-6">
        <div className="card" style={{ width: '50%', height: '100%' }}>
          <div className="card-body">
            <select className="mb-4" onChange={handleSessionChange} value={selectedSession}>
              {sessions.map(session => (
                <option key={session.sessionId} value={session.sessionId}>{session.subject}</option>
              ))}
            </select>
            <h4 className="ml-5">Overall Quiz Grades in Session</h4>
            <div id="overall-chart"></div>
          </div>
        </div>
        <div className="card" style={{ width: '50%', height: '100%' }}>
          <div className="card-body">
            <h4 className="ml-5">Individual Quiz Grades in Session</h4>
            <div id="individual-chart"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentQuizProgress;
