import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const StudentProfilePage = () => {
  const profile = useSelector((state) => state.studentProfile.value);

  return (
    <div class="">
      <div class="flex items-center  mb-8">
        <img
          class="bg-teal-200 rounded-full outline outline-teal-700 w-[350px] h-[350px]"
          src={profile?.profilePicture}
          alt="Jese Leos"
        />
        <div>
          <p class="text-4xl ml-10 font-bold leading-none text-gray-900 dark:text-white">
            {profile?.firstName} {profile?.lastName}
          </p>
          <p className="ml-10 font-semibold">Student</p>
          <p className="ml-10 font-semibold">{profile?.educationalLevel}</p>
        </div>
      </div>
      <p class="mb-4 text-m font-semibold text-teal-900 w-[1000px]">
        {profile?.aboutMe}
      </p>
    </div>
  );
};

export default StudentProfilePage;
