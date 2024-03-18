import React, { useState } from 'react';
import { api } from "../services/api";

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
      console.log(educationalBackground+workExperience+strengthsWeaknesses+futureJobs)
      if (response.status !== 200) {
        throw new Error('Failed to generate');
      }

      const storyPartsArray = response.data.story.split('&');
      setStoryParts(storyPartsArray);
      console.log("story parts :   "+ storyParts)


      console.log(response.data.story)
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
    
    <div className="min-h-auto  flex items-top justify-center bg-white-100">
      <div className="w-full h-screen/2 max-w-screen-xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-center ">AI Career Generator</h1>
        {!story && (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="educationalBackground" className="block text-lg mb-2">1. Tell us about your educational background:</label>
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
              <label htmlFor="workExperience" className="block text-lg mb-2">2. Work experience:</label>
              <textarea
                id="workExperience"
                className="w-full h-40 border border-gray-300 rounded-lg py-2 px-4 resize-none"
                value={workExperience}
                onChange={(event) => handleInputChange(event, setWorkExperience)}
                placeholder={"Have you held any previous positions? what were they? \nIf employed, what is your current job role?"}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="strengthsWeaknesses" className="block text-lg mb-2">3. Tell us a bit about what you perceive are your strengths and weaknesses:</label>
              <textarea
                id="strengthsWeaknesses"
                className="w-full h-40 border border-gray-300 rounded-lg py-2 px-4 resize-none"
                value={strengthsWeaknesses}
                onChange={(event) => handleInputChange(event, setStrengthsWeaknesses)}
                placeholder={"Are there any specific areas in which you excel? \nWhat soft skills do you possess (e.g., communication, leadership)?"}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="futureJobs" className="block text-lg mb-2">4. What jobs do you wish to do in the future?</label>
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
              className={`bg-blue-500 text-white py-2 px-4 rounded-lg w-full ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'}`}
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate'}
            </button>
          </form>
        )}
        {story && !loading && (
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
          
        )}
        {loading && (
          <div className="mt-6 flex justify-center">
            <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.004 8.004 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12c0-3.042-1.135-5.824-3-7.938l-3 2.647A8.004 8.004 0 0120 12h4zm-6 7.938A7.963 7.963 0 0112 20c-2.184 0-4.184-.877-5.657-2.292l-3 2.647C7.468 22.867 9.722 24 12 24v-4zm-7.938-5.291l3-2.647A8.004 8.004 0 014 12H0c0 3.042 1.135 5.824 3 7.938z"></path>
            </svg>
          </div>
        )}
        {story && (
          <div className="mt-6">
            <button
              onClick={handleReset}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg w-full hover:bg-gray-400"
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
