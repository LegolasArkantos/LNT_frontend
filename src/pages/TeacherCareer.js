import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiPrivate } from '../services/api';

const TeacherCareerPage = () => {
  const navigate = useNavigate();
  const [isCareerCounseling, setIsCareerCounseling] = useState(false);
  const [teacherCareerData, setTeacherCareerData] = useState(null);
  
  useEffect(() => {
    const fetchCareerCounselingStatus = async () => {
      try {
        const response = await apiPrivate.get('/career/getCareer');
        const data = response.data; 
        const isCareerCounseling = Boolean(data.careerCounselling);
        console.log(isCareerCounseling)
        if (isCareerCounseling) {
          setIsCareerCounseling(true);
          const careerDataResponse = await apiPrivate.get('/career/getCareerProfile');
          setTeacherCareerData(careerDataResponse.data);
        } else {
          navigate('/teacher-home-page/careerSighup');
        }
      } catch (error) {
        console.error('Error fetching career counseling status:', error);
      }
    };

    fetchCareerCounselingStatus();
  }, []);

  return (
    <div>
      {isCareerCounseling && teacherCareerData ? (
        <div className="p-10 mb-1 bg-white rounded-lg shadow-md">
        <div className="flex items-center">
          {/* Cloudinary profile pic */}
          <img src={teacherCareerData.profilePic} alt="Profile Pic" className="w-24 h-24 rounded-full mr-4 border-4 border-teal-200 object-cover" />
      
          <div>
            {/* Teacher name */}
            <h2 className="text-xl font-semibold mb-2">{teacherCareerData.name}</h2>
            
            {/* Timing */}
            <p className="text-gray-600">Counseling Timings: {teacherCareerData.timing}</p>
      
            {/* Description */}
            <p className="text-gray-700">{teacherCareerData.description}</p>
          </div>
        </div>
      </div>
      
      ) : (
        <div>
          {/* Loading or redirection message */}
          <p>Validating Credentials...</p>
        </div>
      )}
      <div className="card" style={{ width: '50%', height: '50vh' }}>
        <div className="card-body">
          <div id="chart"></div>
        </div>
      </div>
    </div>
  );
};

export default TeacherCareerPage;
