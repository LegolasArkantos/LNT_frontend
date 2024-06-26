import React, { useState } from 'react';
import { apiPrivate } from '../services/api';
import Lottie from 'react-lottie';
import loadingPurple from '../assets/loadingPurple.json';
import { useNavigate } from "react-router-dom";
import ReactPlayer from 'react-player';

const StudentProgressAnalysis = () => {
  const [analysisText, setAnalysisText] = useState('');
  const [youtubeVideos, setYoutubeVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const navigate = useNavigate();

  const fetchAnalysis = async () => {
    setLoading(true);
    try {
      const response = await apiPrivate.get('/ai/generate-analysis-student');
      setAnalysisText(response?.data?.text);
      setYoutubeVideos(response?.data?.youtubeVideos || []);
      setFetched(true);
    } catch (error) {
      console.error('Error fetching analysis:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            {part}
          </a>
        );
      }
      return part;
    });
  };

  const sanitizeText = (text) => {
    return text.replace(/\*/g, '');
  };

  return (
    <div className="p-8 flex flex-col h-full">
      <div className="flex-1 flex flex-row h-[700px] max-w-screen mt-[-50px] mb-[125px] ml-[-50px] p-6">
        <div className="card" style={{ width: '100%', height: '100%' }}>
          <div className="card-body">
            <div className="mb-4">
              {/* Navigation buttons */}
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button type="button" className="px-4 py-2 text-sm font-medium text-white bg-purple-700 hover:bg-purple-800 cursor-pointer rounded-s-lg focus:z-10 focus:ring-2 focus:ring-purple-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500" onClick={() => navigate('/student-home-page/progress/assignments')}>Assignment</button>
                <button type="button" className="px-4 py-2 text-sm font-medium text-white bg-purple-700 hover:bg-purple-800 cursor-pointer focus:z-10 focus:ring-2 focus:ring-purple-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500" onClick={() => navigate('/student-home-page/progress/quiz')}>Quizzes</button>
                <button type="button" className="px-4 py-2 text-sm font-medium text-white bg-purple-700 hover:bg-purple-800 cursor-pointer rounded-e-lg focus:z-10 focus:ring-2 focus:ring-purple-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500" onClick={() => navigate('/student-home-page/progress/analysis')}><span className='border-b-2 border-purple-200'>Analysis</span></button>
              </div>
            </div>
            <h4 className="text-2xl text-[#7179C6] font-bold">Analysis</h4>
            {!loading && !fetched && (
              <div className="mt-6 flex justify-start">
                <button
                  type="button"
                  className="px-6 w-50 py-3 mb-10 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                  onClick={fetchAnalysis}
                >
                  Generate Analysis
                </button>
              </div>
            )}
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
            ) : fetched && (
              <>
                <div className="font-bold text-gray-700 mt-4" style={{ whiteSpace: 'pre-wrap' }}>
                  {renderContent(sanitizeText(analysisText))}
                </div>
                <h4 className="font-bold text-lg text-gray-700 mt-4">Recommended Videos</h4>
                <div className="flex overflow-x-auto gap-4 py-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#4A5568 #CBD5E0' }}>
                  {youtubeVideos.length > 0 ? (
                    youtubeVideos.map((video, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div style={{ width: '200px', height: '150px', marginBottom: '8px' }}>
                          <ReactPlayer
                            url={video.url}
                            width="100%"
                            height="100%"
                          />
                        </div>
                        <h5 className="font-bold text-center text-gray-700 mt-1">{video.title}</h5>
                      </div>
                    ))
                  ) : (
                    <p>No recommended videos available.</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProgressAnalysis;
