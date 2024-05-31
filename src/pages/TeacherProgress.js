import React, { useState, useEffect } from 'react';
import ApexCharts from 'apexcharts';
import { apiPrivate } from '../services/api';
import {  useNavigate } from "react-router-dom";



const AssignmentProgress = () => {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchAssignmentProgress = async () => {
      try {
        const response = await apiPrivate.get('/progress/getAssignmentData');
        setSessions(response.data.sessions);
      } catch (error) {
        console.error('Error fetching assignment progress:', error);
      }
    };

    fetchAssignmentProgress();
  }, []);

  const calculateAverageScore = (total, grades) => {
    if (grades.length === 0) return 0;
    const totalGrades = grades.reduce((acc, grade) => acc + grade, 0);
    return (totalGrades / (grades.length * total)) * 100;
  };

  const handleSessionChange = (event) => {
    const sessionId = event.target.value;
    setSelectedSession(sessionId);
  };

  useEffect(() => {
    if (selectedSession) {
      const selectedSessionData = sessions.find(session => session._id === selectedSession);
      if (selectedSessionData) {
        const chartData = {
          series: [{
            data: selectedSessionData.assignments.map(assignment => {
              return {
                x: assignment.title, 
                y: calculateAverageScore(assignment.total, assignment.grades) 
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
            categories: selectedSessionData.assignments.map(assignment => assignment.title),
            labels: {
              rotate: -45, 
              style: {
                fontSize: '12px'
              }
            }
          },
          yaxis: {
            min: 0,
            max: 100,
            tickAmount: 10,
            labels: {
              formatter: function (value) {
                return value.toFixed(0) + '%'; 
              }
            }
          }
        };

        const chart = new ApexCharts(document.querySelector("#session-chart"), chartData);
        chart.render();

        // Clean up function to destroy the chart on component unmount or session change
        return () => {
          chart.destroy();
        };
      }
    }
  }, [selectedSession, sessions]); 

  useEffect(() => {
    const avgChartData = {
      series: [{
        data: sessions.map(session => {
          const sessionAvg = session.assignments.reduce((acc, assignment) => {
            return acc + calculateAverageScore(assignment.total, assignment.grades);
          }, 0) / session.assignments.length;
          return {
            x: session.subject,
            y: sessionAvg
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
        max: 100,
        tickAmount: 10,
        labels: {
          formatter: function (value) {
            return value.toFixed(0) + '%'; 
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


useEffect(() => {
  // Set the default selected session to the first session
  if (sessions.length > 0) {
    setSelectedSession(sessions[0]._id);
  }
}, [sessions]);




return (
        
  <div className="p-8 flex flex-col h-full">
    <div className="flex-1 flex flex-row h-[700px] max-w-screen mt-[-50px] mb-[125px] ml-[-50px] p-6">
      <div className="card" style={{ width: '50%', height: '100%' }}>
        <div className="card-body">
          <div className="mb-4 flex flex-col">
          <div class="inline-flex rounded-md shadow-sm" role="group">
              <button type="button" class="px-4 py-2 text-sm font-medium text-white bg-purple-700  hover:bg-purple-800 rounded-s-lg hover:bg-blue-800 hover:text-white-700 focus:z-10 focus:ring-2 focus:ring-purple-400 focus:text-white-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white" onClick={() =>navigate('/teacher-home-page/progress/assignments')}><span className='border-b-2 border-purple-200'>Assignment</span></button>
              <button type="button" class="px-4 py-2 text-sm font-medium text-white bg-purple-700  hover:bg-purple-800 hover:text-white-700 focus:z-10 focus:ring-2 focus:ring-purple-400 focus:text-white-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white" onClick={() =>navigate('/teacher-home-page/progress/quiz')}>Quizes</button>
              <button type="button" class="px-4 py-2 text-sm font-medium text-white bg-purple-700  hover:bg-purple-800 hover:text-white-700 focus:z-10 focus:ring-2 focus:ring-purple-400 focus:text-white-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white" onClick={() =>navigate('/teacher-home-page/progress/Individual')}>Individual</button>
              <button type="button" class="px-4 py-2 text-sm font-medium text-white bg-purple-700  hover:bg-purple-800 rounded-e-lg hover:bg-blue-100 hover:text-white-700 focus:z-10 focus:ring-2 focus:ring-purple-400 focus:text-white-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white" onClick={() =>navigate('/teacher-home-page/progress/analysis')} >Analysis</button>
            </div>
            
          </div>
          <div className='flex space-x-20'>
              <div className=''>
              <h4 className="ml-5 mt-16 font-bold text-gray-700">Average Progress by Course</h4>
            <div className='w-[500px] h-full' id="avg-chart"></div>
            </div>
            
            <div className=''>
            <div className='flex items-center space-x-5'>
            <h className="font-bold text-lg mb-4 text-gray-700">
                Select Course:
              </h>
              <select className="mb-4 w-2/5" onChange={handleSessionChange} value={selectedSession}>
              {sessions?.map(session => (
                <option key={session?._id} value={session?._id}>{session?.subject}</option>
              ))}
            </select> 
            </div>
            <h4 className="ml-5 mt-4 font-bold text-gray-700">Average Progress by Assignments</h4>
            <div className='w-[500px] h-full' id="session-chart"></div>
            </div>
            </div>
        </div>
      </div>
      <div className="card" style={{ width: '50%', height: '100%' }}>
        <div className="card-body">
        </div>
      </div>
    </div>
  </div>
);




};

export default AssignmentProgress;