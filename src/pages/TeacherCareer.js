import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiPrivate } from '../services/api';

const TeacherCareerPage = () => {
  const navigate = useNavigate();
  const [isCareerCounseling, setIsCareerCounseling] = useState(false);
  
  useEffect(() => {
    const fetchCareerCounselingStatus = async () => {
      try {
        const response = await apiPrivate.get('/career/getCareer');
        const data = response.data; 
        const isCareerCounseling = Boolean(data.careerCounselling);
        if (isCareerCounseling) {
          setIsCareerCounseling(true);
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
      {isCareerCounseling ? (
        <div>
          {/* Main career page content */}
          <h1>Welcome to the Career Counseling Page</h1>
          <p>Here you can access career counseling services.</p>
        </div>
      ) : (
        <div>
          {/* Loading or redirection message */}
          <p>Redirecting to career signup page...</p>
        </div>
      )}
    </div>
  );
};

export default TeacherCareerPage;
