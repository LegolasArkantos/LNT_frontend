import React, { useState, useEffect } from 'react';
import { apiPrivate } from '../services/api';

const TeacherProgressAnalysis = () => {
  const [analysisText, setAnalysisText] = useState('');

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await apiPrivate.get('/ai/generate-analysis');
        setAnalysisText(response.data.text);
      } catch (error) {
        console.error('Error fetching analysis:', error);
      }
    };

    fetchAnalysis();
  }, []);

  return (
    <div className="p-8 flex flex-col h-full">
      <div className="bg-teal-100 rounded-lg outline outline-teal-500 flex-1 flex flex-row h-[700px] max-w-screen mt-[-50px] mb-[125px] ml-[-50px] p-6">
        <div className="card" style={{ width: '100%', height: '100%' }}>
          <div className="card-body">
            <div className="mb-4">
            <div class="inline-flex rounded-md shadow-sm" role="group">
              <button type="button" class="px-4 py-2 text-sm font-medium text-white bg-blue-700  hover:bg-blue-800 rounded-s-lg hover:bg-blue-800 hover:text-white-700 focus:z-10 focus:ring-2 focus:ring-teal-400 focus:text-white-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">Assignment</button>
              <button type="button" class="px-4 py-2 text-sm font-medium text-white bg-blue-700  hover:bg-blue-800 hover:text-white-700 focus:z-10 focus:ring-2 focus:ring-teal-400 focus:text-white-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">Quizzes</button>
              <button type="button" class="px-4 py-2 text-sm font-medium text-white bg-blue-700  hover:bg-blue-800 rounded-e-lg hover:bg-blue-100 hover:text-white-700 focus:z-10 focus:ring-2 focus:ring-teal-400 focus:text-white-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"  >Analysis</button>
            </div>
              <h4 className="mt-4">Analysis</h4>
            </div>
            {/* Display the analysis text */}
            <p>{analysisText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProgressAnalysis;
