import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import ReviewsPopupTeacher from '../components/ReviewsPopupTeacher';

const TeacherProfilePage = () => {
  const profile = useSelector((state) => state.teacherProfile.value);
  const [reviewPopUp, setReviewPopUp] = useState(false);
  const [reviewPopUpData, setReviewPopUpData] = useState(null);

  return (
    <div class="">
      <div class="flex items-center  mb-8">
        <img
          class="bg-teal-200 rounded-full outline outline-teal-700 w-[350px] h-[350px]"
          src={profile?.profilePicture}
          alt="Jese Leos"
        />
        <div className="flex flex-col justify-between space-y-0.5">
          <p class="text-4xl ml-10 mb-5 font-bold leading-none text-gray-900 dark:text-white">
            {profile?.firstName} {profile?.lastName}
          </p>
          <p className="ml-10 font-semibold">Role: Teacher</p>
          <p className="ml-10 font-semibold">
            {profile?.educationalCredentials}
          </p>
          <p className="ml-10 font-bold underline">
            Subjects:
          </p>
          <div className="flex flex-col mb-3">
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
                teacherId: profile?.profileID,
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
  );
};

export default TeacherProfilePage;
