import React, { useState } from 'react';
import { api } from "../services/api";
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import loadingAnimation from '../assets/loading.json';
const AICareerGenerator = () => {
  const [educationalBackground, setEducationalBackground] = useState('');
  const [workExperience, setWorkExperience] = useState('');
  const [strengthsWeaknesses, setStrengthsWeaknesses] = useState('');
  const [futureJobs, setFutureJobs] = useState('');
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState('');
  const [storyParts, setStoryParts] = useState([]);

  const handleInputChange = (event, setter) => {
    setter(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await api.post('/ai/generate-story', {
        prompts: {
          educationalBackground,
          workExperience,
          strengthsWeaknesses,
          futureJobs
        }
      });
      if (response.status !== 200) {
        throw new Error('Failed to generate');
      }

      const storyPartsArray = response.data.story?.split('&');
      setStoryParts(storyPartsArray);
      setStory(response.data.story);
    } catch (error) {
      console.error('Error generating:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setEducationalBackground('');
    setWorkExperience('');
    setStrengthsWeaknesses('');
    setFutureJobs('');
    setStory('');
  };

  const sanitizeText = (text) => {
    // Replace all '*' characters with an empty string
    return text.replace(/\*/g, '');
  };

  return (
    <div className="min-h-auto flex items-top justify-center bg-white-100">
      <div className="w-full h-screen/2 max-w-screen-xl bg-white rounded-lg shadow-lg p-6">
        {/* Navigation buttons */}
        <div class="mb-8 text-center mx-auto rounded-md shadow-sm" role="group">
          <Link to="/student-career-page/ai-career" className="bg-purple-500 text-white py-2 px-4 rounded-l-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
           <span className='border-b-2 border-purple-200'>AI Career</span>
          </Link>
          <Link to="/student-career-page/available-counsellors" className="bg-purple-500 text-white py-2 px-4 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">Available Counsellors</Link>
          <Link to="/student-career-page/my-counsellors" className="bg-purple-500 text-white py-2 px-4 rounded-r-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">My Counsellors</Link>
        </div>

        <h1 className="text-3xl text-[#7179C6] mb-5 font-bold text-center">AI Career Generator</h1>
        {loading ? (
  <div className="mt-6 flex justify-center">
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData: loadingAnimation,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      }}
      height={200}
      width={200}
    />
  </div>
) : story ? (
  <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Generated :</h2>
            <div className="border border-gray-300 rounded-lg p-4 mt-6">
              <p className="text-2xl font-bold mb-2 text-blue-800">Skills and Experience recommendations</p>
              <p className="font-thin" style={{ whiteSpace: 'pre-wrap' }}>{sanitizeText(storyParts[0])}</p>
              <p className="text-2xl font-bold mb-2 text-blue-800 mt-6">Viability Report</p>
              <p className="font-thin" style={{ whiteSpace: 'pre-wrap' }}>{sanitizeText(storyParts[1])}</p>
              <p className="text-2xl font-bold mb-2 text-blue-800 mt-6">Recommended Jobs</p>
              <p className="font-thin" style={{ whiteSpace: 'pre-wrap' }}>{sanitizeText(storyParts[2])}</p>
            </div>
          </div>
          ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="educationalBackground" className="font-bold text-m text-gray-700 mx-2">1. Tell us about your educational background:</label>
              <textarea
                id="educationalBackground"
                className="w-full h-40 border border-gray-300 rounded-lg py-2 px-4 resize-none"
                value={educationalBackground}
                onChange={(event) => handleInputChange(event, setEducationalBackground)}
                required
                placeholder={`What is your highest level of education?\nWhat did you study, and where did you study it?`}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="workExperience" className="font-bold text-m text-gray-700 mx-2">2. Work experience:</label>
              <textarea
                id="workExperience"
                className="w-full h-40 border border-gray-300 rounded-lg py-2 px-4 resize-none"
                value={workExperience}
                onChange={(event) => handleInputChange(event, setWorkExperience)}
                placeholder={"Have you held any previous positions? what were they? \nIf employed, what is your current job role?"}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="strengthsWeaknesses" className="font-bold text-m text-gray-700 mx-2">3. Tell us a bit about what you perceive are your strengths and weaknesses:</label>
              <textarea
                id="strengthsWeaknesses"
                className="w-full h-40 border border-gray-300 rounded-lg py-2 px-4 resize-none"
                value={strengthsWeaknesses}
                onChange={(event) => handleInputChange(event, setStrengthsWeaknesses)}
                placeholder={"Are there any specific areas in which you excel? \nWhat soft skills do you possess (e.g., communication, leadership)?"}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="futureJobs" className="font-bold text-m text-gray-700 mx-2">4. What jobs do you wish to do in the future?</label>
              <textarea
                id="futureJobs"
                className="w-full h-40 border border-gray-300 rounded-lg py-2 px-4 resize-none"
                value={futureJobs}
                onChange={(event) => handleInputChange(event, setFutureJobs)}
                placeholder="Describe the jobs or roles you aspire to in the future."
              />
            </div>
            <button
              type="submit"
              className={`bg-[#7179C6] text-white py-2 px-4 rounded-lg w-full ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'}`}
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate'}
            </button>
          </form>
        )}
        {story && (
          <div className="mt-6">
            <button
              onClick={handleReset}
              className="bg-[#7179C6] text-gray-800 py-2 px-4 rounded-lg w-full hover:bg-purple-400"
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AICareerGenerator;
