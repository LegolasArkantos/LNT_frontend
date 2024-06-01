import React, { useState, useEffect } from 'react';
import { apiPrivate } from '../services/api';
import Lottie from 'react-lottie';
import loadingPurple from '../assets/loadingPurple.json';
import { useNavigate } from "react-router-dom";
import ApexCharts from 'apexcharts';

const TeacherProgressAnalysis = () => {
  const [analysisText, setAnalysisText] = useState('');
  const [loading, setLoading] = useState(false); 
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState('');
  const [analyticsData, setAnalyticsData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of sessions for the teacher on component mount
    const fetchSessions = async () => {
      try {
        const response = await apiPrivate.get('/ai/sessions');
        setSessions(response.data.sessions);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };
    fetchSessions();
  }, []);

  const fetchAnalysis = async () => {
    if (!selectedSession) {
      alert('Please select a session.');
      return;
    }
    setLoading(true);
    try {
      const response = await apiPrivate.get(`/ai/generate-analysis`);
      setAnalysisText(response.data.text);
      const analyticsResponse = await apiPrivate.get(`/ai/analytics/${selectedSession}`);
      setAnalyticsData(analyticsResponse.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching analysis or analytics:', error);
      setLoading(false);
    }
  };

  const sanitizeText = (text) => {
    // Replace all '*' characters with an empty string
    return text.replace(/\*/g, '');
  };

  useEffect(() => {
    if (analyticsData) {
      // Pass/Fail Ratio Pie Chart
      const passFailRatioOptions = {
        series: [
          analyticsData.passFailRatio.totalPassed,
          analyticsData.passFailRatio.totalFailed
        ],
        chart: {
          width: 380,
          type: 'pie'
        },
        labels: ['Passed', 'Failed'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      };
      const passFailRatioChart = new ApexCharts(document.querySelector("#passFailRatioChart"), passFailRatioOptions);
      passFailRatioChart.render();

      // Passed and Failed Students in Assignments Bar Chart
      const assignmentPassedFailedOptions = {
        series: [
          {
            name: 'Passed Students',
            data: analyticsData.assignments.map(a => a.totalSubmissions - a.failedSubmissions)
          },
          {
            name: 'Failed Students',
            data: analyticsData.assignments.map(a => a.failedSubmissions)
          }
        ],
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
            borderRadiusApplication: 'end',
            borderRadiusWhenStacked: 'last',
            dataLabels: {
              total: {
                enabled: true,
                style: {
                  fontSize: '13px',
                  fontWeight: 900
                }
              }
            }
          },
        },
        xaxis: {
          categories: analyticsData.assignments.map(a => a.assignmentTitle),
        },
        legend: {
          show: false
        },
        fill: {
          opacity: 1
        }
      };
      const assignmentPassedFailedChart = new ApexCharts(document.querySelector("#assignmentPassedFailedChart"), assignmentPassedFailedOptions);
      assignmentPassedFailedChart.render();

      // Passed and Failed Students in Quizzes Bar Chart
      const quizPassedFailedOptions = {
        series: [
          {
            name: 'Passed Students',
            data: analyticsData.quizzes.map(q => q.totalSubmissions - q.failedSubmissions)
          },
          {
            name: 'Failed Students',
            data: analyticsData.quizzes.map(q => q.failedSubmissions)
          }
        ],
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
            borderRadiusApplication: 'end',
            borderRadiusWhenStacked: 'last',
            dataLabels: {
              total: {
                enabled: true,
                style: {
                  fontSize: '13px',
                  fontWeight: 900
                }
              }
            }
          },
        },
        xaxis: {
          categories: analyticsData.quizzes.map(q => q.quizTitle),
        },
        legend: {
          show:false
        },
        fill: {
          opacity: 1
        }
      };
      const quizPassedFailedChart = new ApexCharts(document.querySelector("#quizPassedFailedChart"), quizPassedFailedOptions);
      quizPassedFailedChart.render();
    }
  }, [analyticsData]);

  return (
    <div className="p-8 flex flex-col h-full">
      <div className="flex-1 flex flex-row h-[700px] max-w-screen mt-[-50px] mb-[125px] ml-[-50px] p-6">
        <div className="card" style={{ width: '100%', height: '100%' }}>
          <div className="card-body">
            <div className="mb-4">
              {/* Navigation buttons */}
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button type="button" className="px-4 py-2 text-sm font-medium text-white bg-purple-700 hover:bg-purple-800 rounded-s-lg hover:text-white-700 focus:z-10 focus:ring-2 focus:ring-purple-400 focus:text-white-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white" onClick={() =>navigate('/teacher-home-page/progress/assignments')}>Assignment</button>
                <button type="button" className="px-4 py-2 text-sm font-medium text-white bg-purple-700 hover:bg-purple-800 hover:text-white-700 focus:z-10 focus:ring-2 focus:ring-purple-400 focus:text-white-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white" onClick={() =>navigate('/teacher-home-page/progress/quiz')}>Quizes</button>
                <button type="button" class="px-4 py-2 text-sm font-medium text-white bg-purple-700  hover:bg-purple-800 hover:text-white-700 focus:z-10 focus:ring-2 focus:ring-purple-400 focus:text-white-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white" onClick={() =>navigate('/teacher-home-page/progress/Individual')}>Individual</button>
                <button type="button" className="px-4 py-2 text-sm font-medium text-white bg-purple-700 hover:bg-purple-800 rounded-e-lg hover:text-white-700 focus:z-10 focus:ring-2 focus:ring-purple-400 focus:text-white-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white" onClick={() =>navigate('/teacher-home-page/progress/analysis')} ><span className='border-b-2 border-purple-200'>Analysis</span></button>
              </div>
            </div>
            <h4 className="font-bold mt-4 mb-4">Analysis</h4>
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
                onClick={fetchAnalysis}
              >
                Generate Analysis
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
              <>
                <div className="flex flex-row justify-between">
                  <div id="assignmentPassedFailedChart" style={{ flex: 1, minWidth: '300px', margin: '0 10px' }}></div>
                  <div id="quizPassedFailedChart" style={{ flex: 1, minWidth: '300px', margin: '0 10px' }}></div>
                  <div id="passFailRatioChart" style={{ flex: 1, minWidth: '300px', margin: '0 10px' }}></div>
                </div>
                <p className="font-bold text-gray-700 mt-4" style={{ whiteSpace: 'pre-wrap' }}>
                  {sanitizeText(analysisText)}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default TeacherProgressAnalysis;
