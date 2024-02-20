import React, { useState } from 'react';
import { api } from "../services/api";

const AICareerGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const  customMessage="As a career counselor, I will need your educational details, strengths, and weaknesses to recommend three jobs that best fit you. Please provide this information. If you have any unrelated questions, please refrain from asking them, and focus on career-related inquiries. If you don't provide or miss any data required, I won't make any assumptions and will ask you for the necessary information.I will focus on giving detailed and long info on the jobs i am sugessting like description ,work expected,avg pay,avg experience needed according to pakistan.i will give as much info as i can about the strenghts, weaknesses and jobs .i will not use * and will make heading bolder .Student :";
    try {
      setLoading(true);
      const response = await api.post('/ai/generate-story', { "prompt": customMessage + " " + prompt });
  
      if (response.status !== 200) {
        throw new Error('Failed to generate story');
      }
       console.log(response.data.story)
      setStory(response.data.story);
    } catch (error) {
      console.error('Error generating story:', error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleReset = () => {
    setPrompt('');
    setStory('');
  };

  return (
    <div className="min-h-auto  flex items-top justify-center bg-white-100">
      <div className="w-full h-screen/2 max-w-screen-xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">AICareerGenerator</h1>
        {!story && (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="prompt" className="block text-lg mb-2">Enter your prompt:</label>
              <textarea
                id="prompt"
                className="w-full h-48 border border-gray-300 rounded-lg py-2 px-4 resize-none"
                value={prompt}
                onChange={handleInputChange}
                required
              />
            </div>
            <button 
              type="submit" 
              className={`bg-blue-500 text-white py-2 px-4 rounded-lg w-full ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'}`}
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate Story'}
            </button>
          </form>
        )}
        {story && !loading && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Generated Story:</h2>
            <p className="border border-gray-300 rounded-lg p-4" style={{ whiteSpace: 'pre-wrap' }}>{story}</p>
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
