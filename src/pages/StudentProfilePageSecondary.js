import React, { useEffect, useState } from "react";
import useAPIPrivte from "../hooks/useAPIPrivate";
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import ReviewsPopupTeacher from '../components/ReviewsPopupTeacher';

const StudentProfilePageSecondary = () => {
  const [profile, setProfile] = useState(null);
  const [reviewPopUp, setReviewPopUp] = useState(false);
  const [reviewPopUpData, setReviewPopUpData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  const apiPrivate = useAPIPrivte();

  
  
  const auth = useSelector((state) => state.auth.value);
  const otherRole = location.state.otherRole;
  const teacherId = location.state.teacherId; 
  const studentId = location.state.studentId;

  const myProfile = useSelector((state) => {
    if (otherRole === "Teacher"){
        return state.studentProfile.value;
    } 
    else {
        return state.teacherProfile.value;
    }
}
);

  useEffect(() => {
    const getProfile = async () => {
      try {

      if (auth.role === "Student") {
        if (otherRole === "Teacher") {
          if (teacherId) {
            const response = await apiPrivate.get(`/student/getTeacher/${teacherId}`);
            if (response.status === 200) {
              setProfile(response.data);
            }
          }
        }
      }
      else {
        if (otherRole === "Student") {
          if (studentId) {
            const response = await apiPrivate.get(`/teacher/getStudent/${studentId}`);
            if (response.status === 200) {
              setProfile(response.data);
            }
          }
        }
      }
      } catch (error) {
        console.error(error);
      }
    };

    getProfile();
  }, [location.state]); 

  const handleCreateChat = async () => {
    try {
      await apiPrivate.post("chat/create", {
        participants: [{participant: myProfile.profileID, role: auth.role,
      name: myProfile.firstName + " " + myProfile.lastName, profilePicture: myProfile.profilePicture}, 
      {participant: profile._id, role: otherRole,
      name: profile.firstName + " " + profile.lastName, profilePicture: profile.profilePicture}]
      }).then((res) => {
        if (auth.role === "Student") {
          navigate('/student-home-page/chats');
        }
        else{
          navigate('/teacher-home-page/chats')
        }
        
      })
    }
    catch (error) {
      console.log(error);
    }
  }

  // If profile is null, render nothing
  if (!profile) {
    return null;
  }

  return (
    <div className="">
      {
        otherRole === "Student" 
        ? (
          <div>
      <div className="flex items-center  mb-8">
        <img
          className="bg-teal-200 rounded-full outline outline-teal-700 w-[350px] h-[350px]"
          src={profile?.profilePicture}
          alt="Jese Leos"
        />
        <div>
          <div className="flex items-center">
            <p className="text-4xl ml-10 mr-10 font-bold leading-none text-gray-900 dark:text-white">
              {profile?.firstName} {profile?.lastName}
            </p>
            <div onClick={() => {handleCreateChat()}} className="hover:bg-gray-200 cursor-pointer rounded">
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
          <p className="ml-10 font-semibold">{profile?.educationalLevel}</p>
        </div>
      </div>
      <p className="mb-4 text-m font-semibold text-teal-900 w-[1000px]">
        {profile?.aboutMe}
      </p>
      </div>
        )
        : (
          <div>
          <div class="flex items-center  mb-8">
        <img
          class="bg-teal-200 rounded-full outline outline-teal-700 w-[350px] h-[350px]"
          src={profile?.profilePicture}
          alt="Jese Leos"
        />
        <div className="flex flex-col justify-between space-y-0.5">
          <div className="flex space-x-20">
          <p class="text-4xl ml-10 mb-5 font-bold leading-none text-gray-900 dark:text-white">
            {profile?.firstName} {profile?.lastName}
          </p>
          <div onClick={() => {handleCreateChat()}} className="hover:bg-gray-200 cursor-pointer rounded">
          <svg className="mt-2" width="50px" height="50px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M896 192H128c-35.3 0-64 28.7-64 64v512c0 35.3 28.7 64 64 64h576.6l191.6 127.7L896 832c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64z" fill="#3D5AFE"></path><path d="M640 512c0-125.4-51.5-238.7-134.5-320H128c-35.3 0-64 28.7-64 64v512c0 35.3 28.7 64 64 64h377.5c83-81.3 134.5-194.6 134.5-320z" fill="#536DFE"></path><path d="M256 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#00ffd5"></path><path d="M512 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#00ffd5"></path><path d="M768 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#00ffd5"></path></g></svg>
          </div>
          </div>
          <p className="ml-10 font-semibold">Role: Teacher</p>
          <p className="ml-10 font-semibold">
            {profile?.educationalCredentials}
          </p>
          <p className="ml-10 font-bold underline">
            Subjects:
          </p>
          <div className="flex flex-col">
          {
            profile?.subjectsTaught.map((subject, index) => (
              <small>
              <p key={index} className="ml-20 font-semibold">{subject}</p>
              </small>
            ))
          }
          </div>
          <div className="flex space-x-3 mt-3 items-center">
          <p className="ml-10 font-semibold">
            Rating:
          </p>
          <div class="flex items-center ml-8 space-x-1 rtl:space-x-reverse">
        <svg class={`w-4 h-4 ${parseInt(profile?.rating) >= 1 ? 'text-yellow-300' : 'text-gray-300'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
        <svg class={`w-4 h-4 ${parseInt(profile?.rating) >= 2 ? 'text-yellow-300' : 'text-gray-300'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
        <svg class={`w-4 h-4 ${parseInt(profile?.rating) >= 3 ? 'text-yellow-300' : 'text-gray-300'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
        <svg class={`w-4 h-4 ${parseInt(profile?.rating) >= 4 ? 'text-yellow-300' : 'text-gray-300'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
        <svg class={`w-4 h-4 ${parseInt(profile.rating) >= 5 ? 'text-yellow-300' : 'text-gray-300'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
        
    </div>
    </div>
          <p 
            onClick={() => {
              const data = {
                teacherId: teacherId,
                profilePage: true
              }
              setReviewPopUpData(data);
              setReviewPopUp(true)
            }}
            className="ml-10 text-blue-700 cursor-pointer hover:underline font-semibold">Reviews</p>
        </div>
      </div>
          <p class="mb-4 text-m font-semibold text-teal-900 w-[1000px]">
            {profile?.aboutMe}
          </p>

          {
           reviewPopUp && (
            <ReviewsPopupTeacher setReviewPopUp={setReviewPopUp} reviewPopUpData={reviewPopUpData}/>
           )
          }
        </div>
        ) 
      }
      
    </div>
  );
};

export default StudentProfilePageSecondary;
