import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import TeacherHomePageNavBar from "../components/TeacherHomePageNavBar";
import useApiPrivate from "../hooks/useAPIPrivate";
import { useDispatch, useSelector } from "react-redux";
import { removeAuthValues } from "../features/auth";
import { removeTeacherProfile } from "../features/teacherProfile";
import TeacherHomePageNavBar2 from "../components/TeacherHomePageNavBar2";
import Footer from "../components/Footer";

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
      <div className="flex-col">
      <TeacherHomePageNavBar profile={profile} handleLogOut={handleLogOut} career={false} />
      
      <TeacherHomePageNavBar2/>
      </div>

      <div className="ml-20 mr-20 mb-10 mt-40">
        <Outlet />
      </div>

      <div className="bg-[#7179C6]">
        <Footer />
      </div>
    </div>
  );
};

export default TeacherHomePageLayout;
