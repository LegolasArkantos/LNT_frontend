import React, { useEffect, useState } from "react";
import { apiPrivate } from '../services/api';
import { useLocation } from 'react-router-dom';

const StudentProfilePageSecondary = () => {
  const [profile, setProfile] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const teacherId = location.state.teacherId; 
        const studentId= location.state.studentId;
        console.log(teacherId)
        if (teacherId) {
          const response = await apiPrivate.get(`/student/getTeacher/${teacherId}`);
          if (response.status === 200) {
            setProfile(response.data);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    getProfile();
  }, [location.state]); // Add location.state to the dependencies array

  // If profile is null, render nothing
  if (!profile) {
    return null;
  }

  return (
    <div className="">
      <div className="flex items-center  mb-8">
        <img
          className="bg-teal-200 rounded-full outline outline-teal-700 w-[350px] h-[350px]"
          src={profile.profilePicture}
          alt="Jese Leos"
        />
        <div>
          <div className="flex items-center">
            <p className="text-4xl ml-10 mr-10 font-bold leading-none text-gray-900 dark:text-white">
              {profile.firstName} {profile.lastName}
            </p>
            <div className="hover:bg-gray-200 cursor-pointer rounded">
              <svg
                className="mt-2"
                width="50px"
                height="50px"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M896 192H128c-35.3 0-64 28.7-64 64v512c0 35.3 28.7 64 64 64h576.6l191.6 127.7L896 832c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64z" fill="#3D5AFE"></path>
                  <path d="M640 512c0-125.4-51.5-238.7-134.5-320H128c-35.3 0-64 28.7-64 64v512c0 35.3 28.7 64 64 64h377.5c83-81.3 134.5-194.6 134.5-320z" fill="#536DFE"></path>
                  <path d="M256 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#00ffd5"></path>
                  <path d="M512 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#00ffd5"></path>
                  <path d="M768 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#00ffd5"></path>
                </g>
              </svg>
            </div>
          </div>
          <p className="ml-10 font-semibold">Student</p>
          <p className="ml-10 font-semibold">{profile.educationalLevel}</p>
          <p className="ml-10 font-semibold">{profile.personality}</p>
        </div>
      </div>
      <p className="mb-4 text-m font-semibold text-teal-900 w-[1000px]">
        {profile.aboutMe}
      </p>
    </div>
  );
};

export default StudentProfilePageSecondary;
