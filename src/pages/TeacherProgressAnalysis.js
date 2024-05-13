import React, { useState, useEffect } from 'react';
import { apiPrivate } from '../services/api';
import Lottie from 'react-lottie';
import loadingAnimation from '../assets/loading.json';
import { useNavigate } from "react-router-dom";


const TeacherProgressAnalysis = () => {
  const [analysisText, setAnalysisText] = useState('');
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  const fetchAnalysis = async () => {
    try {
      const response = await apiPrivate.get('/ai/generate-analysis');
      setAnalysisText(response.data.text);
      setLoading(false); 
    } catch (error) {
      console.error('Error fetching analysis:', error);
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchAnalysis();
  }, []);

  const sanitizeText = (text) => {
    // Replace all '*' characters with an empty string
    return text.replace(/\*/g, '');
  };

  return (
    <div className="p-8 flex flex-col h-full">
      <div className="bg-teal-100 rounded-lg outline outline-teal-500 flex-1 flex flex-row h-[700px] max-w-screen mt-[-50px] mb-[125px] ml-[-50px] p-6">
        <div className="card" style={{ width: '100%', height: '100%' }}>
          <div className="card-body">
            <div className="mb-4">
              {/* Navigation buttons */}
              <div class="inline-flex rounded-md shadow-sm" role="group">
              <button type="button" class="px-4 py-2 text-sm font-medium text-white bg-blue-700  hover:bg-blue-800 rounded-s-lg hover:bg-blue-800 hover:text-white-700 focus:z-10 focus:ring-2 focus:ring-teal-400 focus:text-white-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white" onClick={() =>navigate('/teacher-home-page/progress')}>Assignment</button>
              <button type="button" class="px-4 py-2 text-sm font-medium text-white bg-blue-700  hover:bg-blue-800 hover:text-white-700 focus:z-10 focus:ring-2 focus:ring-teal-400 focus:text-white-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white" onClick={() =>navigate('/teacher-home-page/Quiz')}>Quizzes</button>
              <button type="button" class="px-4 py-2 text-sm font-medium text-white bg-blue-700  hover:bg-blue-800 rounded-e-lg hover:bg-blue-100 hover:text-white-700 focus:z-10 focus:ring-2 focus:ring-teal-400 focus:text-white-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white" onClick={() =>navigate('/teacher-home-page/analysis')} >Analysis</button>
            </div>
            </div>
            <h4 className="font-bold mt-4">Analysis</h4>
            {loading? (
              <div className="mt-6 flex justify-center">
                <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: loadingAnimation,
                    rendererSettings: {
                      preserveAspectRatio: 'xMidYMid slice',
                    },
                  }}
                  height={200}
                  width={200}
                />
              </div>
            ) : (
              <p className="font-thin" style={{ whiteSpace: 'pre-wrap' }}>
                {sanitizeText(analysisText)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProgressAnalysis;
