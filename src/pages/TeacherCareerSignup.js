import React, { useState } from 'react';
import image from '../assets/we need u.jpg';
import { apiPrivate } from '../services/api';
import { useNavigate } from 'react-router-dom';

const CareerSignupPage = () => {
  const navigate = useNavigate();

  const [description, setDescription] = useState('');
  const [timings, setTimings] = useState('');

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleTimingsChange = (event) => {
    setTimings(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await apiPrivate.post('/career/createCareer', {
        description,
        timings
      });

      
        navigate('/teacher-home-page/career');
      
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="min-h-auto flex items-top justify-center bg-white-100">
      <div className="w-full max-w-screen-xl bg-white rounded-lg shadow-lg p-6">
        {/* Placeholder for Image */}
        <div className="mb-6 text-center">
          <img src={image} alt="Career Counseling" className="w-56 h-auto mx-auto rounded-lg" />
        </div>

        {/* Introductory text */}
        <h1 className="text-3xl font-bold mb-4 text-center">Sign Up for Career Counseling</h1>
        <p className="mb-6 text-lg text-center">
          Are you ready to take the next step in your career journey? Join our career counseling program and unlock
          endless possibilities!
        </p>

        {/* Benefits of Career Counseling */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">How it can help you:</h2>
          <ul className="list-disc pl-6">
            <li>Gain clarity on career goals and aspirations</li>
            <li>Identify strengths and weaknesses to maximize potential</li>
            <li>Receive personalized guidance tailored to your needs</li>
            <li>Explore various career paths and opportunities</li>
            <li>Develop essential skills for academic and professional success</li>
          </ul>
        </div>

        {/* Signup form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="description" className="block text-lg mb-2">
              Description:
            </label>
            <textarea
              id="description"
              className="w-full h-40 border border-gray-300 rounded-lg py-2 px-4 resize-none"
              value={description}
              onChange={handleDescriptionChange}
              rows="4"
              cols="50"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="timings" className="block text-lg mb-2">
              Timings:
            </label>
            <input
              type="text"
              id="timings"
              className="w-full border border-gray-300 rounded-lg py-2 px-4"
              value={timings}
              onChange={handleTimingsChange}
              required
            />
          </div>
          <div className="mb-6 flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-8 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CareerSignupPage;
