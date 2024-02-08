import React, { useState } from 'react';
import { api } from "../services/api";

const AICareerGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [story, setStory] = useState('');

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await api.post('/ai/generate-story', { prompt });
      
      if (response.status !== 200) {
        throw new Error('Failed to generate story');
      }
      
      setStory(response.data.story);
    } catch (error) {
      console.error('Error generating story:', error);
      // Handle error
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">AICareerGenerator</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="prompt" className="block text-lg mb-2">Enter your prompt:</label>
            <textarea
              id="prompt"
              className="w-full border border-gray-300 rounded-lg py-2 px-4 resize-none"
              rows="4"
              value={prompt}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full">Generate Story</button>
        </form>
        {story && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Generated Story:</h2>
            <p className="border border-gray-300 rounded-lg p-4">{story}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AICareerGenerator;
