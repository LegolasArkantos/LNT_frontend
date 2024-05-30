import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useApiPrivate from '../hooks/useAPIPrivate';

const UpdateSessionPage = () => {
  const location = useLocation();
  const sessionData = location.state.session;
  const navigate = useNavigate();
  const apiPrivate = useApiPrivate();

  const [formData, setFormData] = useState({
    startTime: sessionData.startTime,
    endTime: sessionData.endTime,
    day: sessionData.day,
    subject: sessionData.subject,
    sessionPrice: sessionData.sessionPrice,
    sessionDescription: sessionData.sessionDescription,
  });

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
      await apiPrivate.put(`/sessions/updateSession/${sessionData._id}`, formData);
      navigate('/teacher-home-page/sessions'); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl text-[#7179C6] font-bold mb-4">Update Course</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="startTime" className="font-bold text-m text-gray-700">
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
            <label htmlFor="endTime" className="font-bold text-m text-gray-700">
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
            <label htmlFor="day" className="font-bold text-m text-gray-700">
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
            <label htmlFor="subject" className="font-bold text-m text-gray-700">
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
            <label htmlFor="sessionPrice" className="font-bold text-m text-gray-700">
              Price
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
            <label htmlFor="sessionDescription" className="font-bold text-m text-gray-700">
              Description
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
          <button type="submit" className="bg-[#7179C6] hover:bg-purple-500 text-white px-4 py-2 rounded">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSessionPage;
