import React from "react";
import { Outlet } from "react-router-dom";
import HomePageNavBar from "../components/HomePageNavBar";
import TeacherSidebar from "../components/TeacherSidebar";
import useApiPrivate from "../hooks/useAPIPrivaate";
import { useDispatch, useSelector } from "react-redux";
import { removeAuthValues } from "../features/auth";
import { removeTeacherProfile } from "../features/teacherProfile"

const TeacherHomePageLayout = () => {
  const apiPrivate = useApiPrivate();
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.teacherProfile.value);
  const handleLogOut = async () => {
    try {
      const response = await apiPrivate.get("/auth/logout", {
        withCredentials: true,
      });
      if (response.status === 200) {
        dispatch(removeAuthValues());
        dispatch(removeTeacherProfile());
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white">
      <div className="flex-col space-y-16">
        <HomePageNavBar profile={profile} />
        <TeacherSidebar handleLogOut={handleLogOut} />
      </div>

      <div className="ml-40 mr-40 mb-10 mt-32">
        <Outlet />
      </div>
    </div>
  );
};

export default TeacherHomePageLayout;
