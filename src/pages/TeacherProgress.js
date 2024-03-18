import React, { useState, useEffect } from 'react';
import ApexCharts from 'apexcharts';
import { apiPrivate } from '../services/api';

const AssignmentProgress = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignmentProgress = async () => {
      try {
        const response = await apiPrivate.get('/progress/getAssignmentData');
        setAssignments(response.data.assignments);
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

  useEffect(() => {
    const chartData = {
      series: [{
        data: assignments.map(assignment => {
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
        categories: assignments.map(assignment => assignment.title),
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

    const chart = new ApexCharts(document.querySelector("#chart"), chartData);
    chart.render();

    // Clean up function to destroy the chart on component unmount
    return () => {
      chart.destroy();
    };
  }, [assignments]); 

  return (
    <div className="card" style={{ width: '50%', height: '50vh' }}>
      <div className="card-body">
        <div id="chart"></div>
      </div>
    </div>
  );
};

export default AssignmentProgress;
