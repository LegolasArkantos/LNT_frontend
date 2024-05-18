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
          <div className="flex flex-col">
          {
            profile?.subjectsTaught.map((subject, index) => (
              <small>
              <p key={index} className="ml-20 font-semibold">{subject}</p>
              </small>
            ))
          }
          </div>
          <p className="ml-10 font-semibold">Rating: {profile?.rating}</p>
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
