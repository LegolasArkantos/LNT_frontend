import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useApiPrivate from '../hooks/useAPIPrivate';

const CreateSessionPage = () => {
  const [formData, setFormData] = useState({
    startTime: '',
    endTime: '',
    day: '',
    subject: '',
    sessionPrice: '',
    sessionDescription: '',
  });
  const navigate = useNavigate();
  const apiPrivate = useApiPrivate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiPrivate.post('/sessions/create', formData);
      navigate('/teacher-home-page/sessions'); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Create Session</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-900">
              Start Time
            </label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={formData?.startTime}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="endTime" className="block text-sm font-medium text-gray-900">
              End Time
            </label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={formData?.endTime}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="day" className="block text-sm font-medium text-gray-900">
              Day
            </label>
            <input
              type="text"
              id="day"
              name="day"
              value={formData?.day}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-900">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData?.subject}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="sessionPrice" className="block text-sm font-medium text-gray-900">
              Session Price
            </label>
            <input
              type="text"
              id="sessionPrice"
              name="sessionPrice"
              value={formData?.sessionPrice}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4 col-span-2">
            <label htmlFor="sessionDescription" className="block text-sm font-medium text-gray-900">
              Session Description
            </label>
            <textarea
              id="sessionDescription"
              name="sessionDescription"
              value={formData?.sessionDescription}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Create Session
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSessionPage;
