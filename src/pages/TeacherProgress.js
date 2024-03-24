import React, { useState, useEffect } from 'react';
import ApexCharts from 'apexcharts';
import { apiPrivate } from '../services/api';

const AssignmentProgress = () => {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);

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
    <div>
      
      <select onChange={handleSessionChange} value={selectedSession}>
  {sessions.map(session => (
    <option key={session._id} value={session._id}>{session.subject}</option>
  ))}
</select>
      <div className="card mt-10" style={{ width: '50%', height: '50vh', float: 'left' }}>
        <div className="card-body">
        <h4>Average Progress by Session</h4>
          <div id="avg-chart"></div>
        </div>
      </div>
      <div className="card" style={{ width: '50%', height: '50vh', float: 'right' }}>
        <div className="card-body">
        <h4 className=" ml-5">Assignment Progress</h4>
          <div id="session-chart"></div>
        </div>
      </div>
      
      <div className="card" style={{ width: '50%', height: '50vh' }}>
        <div className="card-body">
          <div id="chart"></div>
        </div>
      </div>
      
    </div>
  );
};

export default AssignmentProgress;
