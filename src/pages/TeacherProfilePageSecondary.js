import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TeacherProfilePageSecondary = ({teacherId}) => {
    
    const [profile, setProfile] = useState(null);

    const auth = useSelector((state) => state.auth.value);
  
    useEffect(() => {
      const getProfile = async () => {
        try {
          if (auth.role === "Student") {
            await apiPrivate.get("student/getTeacher/" + teacherId).then((res) => {
              if (res.status === 200) {
                setProfile(res.data)
              }
            })
          }
          else{
            await apiPrivate.get("teacher/getTeacher/" + teacherId).then((res) => {
              if (res.status === 200) {
                setProfile(res.data)
              }
            })
          }
          
        } catch (error) {
          console.error(error);
        }
      };
  
      getProfile();
    }, []);
  
    return (
        <div class="">
          <div class="flex items-center  mb-8">
            <img
              class="bg-teal-200 rounded-full outline outline-teal-700 w-[350px] h-[350px]"
              src={profile?.profilePicture}
              alt="Jese Leos"
            />
            <div>
            <div className="flex items-center">
          <p class="text-4xl ml-10 mr-10 font-bold leading-none text-gray-900 dark:text-white">
            {profile?.firstName} {profile?.lastName}
          </p>
          <div className="hover:bg-gray-200 cursor-pointer rounded">
          <svg className="mt-2" width="50px" height="50px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M896 192H128c-35.3 0-64 28.7-64 64v512c0 35.3 28.7 64 64 64h576.6l191.6 127.7L896 832c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64z" fill="#3D5AFE"></path><path d="M640 512c0-125.4-51.5-238.7-134.5-320H128c-35.3 0-64 28.7-64 64v512c0 35.3 28.7 64 64 64h377.5c83-81.3 134.5-194.6 134.5-320z" fill="#536DFE"></path><path d="M256 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#00ffd5"></path><path d="M512 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#00ffd5"></path><path d="M768 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#00ffd5"></path></g></svg>
          </div>
          </div>
              <p className="ml-10 font-semibold">Teacher</p>
              <p className="ml-10 font-semibold">
                {profile?.educationalCredentials}
              </p>
              <p className="ml-10 font-semibold">{profile?.subjectsTaught}</p>
              <p className="ml-10 font-semibold">{profile?.availableTimeSlots}</p>
              <p className="ml-10 font-semibold">{profile?.rating} star</p>
              <p className="ml-10 font-semibold">{profile?.personality}</p>
            </div>
          </div>
          <p class="mb-4 text-m font-semibold text-teal-900 w-[1000px]">
            {profile?.aboutMe}
          </p>
        </div>
      );
}

export default TeacherProfilePageSecondary