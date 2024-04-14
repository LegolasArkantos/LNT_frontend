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
          src={profile.profilePicture}
          alt="Jese Leos"
        />
        <div>
          <p class="text-4xl ml-10 font-bold leading-none text-gray-900 dark:text-white">
            {profile.firstName} {profile.lastName}
          </p>
          <p className="ml-10 font-semibold">Teacher</p>
          <p className="ml-10 font-semibold">
            {profile.educationalCredentials}
          </p>
          <p className="ml-10 font-semibold">{profile.subjectsTaught}</p>
          <p className="ml-10 font-semibold">{profile.availableTimeSlots}</p>
          <p className="ml-10 font-semibold">{profile.rating} star</p>
          <p className="ml-10 font-semibold">{profile.personality}</p>
          <p 
            onClick={() => {
              const data = {
                teacherId: profile.profileID,
                profilePage: true
              }
              setReviewPopUpData(data);
              setReviewPopUp(true)
            }}
            className="ml-10 text-blue-700 cursor-pointer hover:underline font-semibold">Reviews</p>
        </div>
      </div>
      <p class="mb-4 text-m font-semibold text-teal-900 w-[1000px]">
        {profile.aboutMe}
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
