import React from "react";
import { Outlet } from "react-router-dom";
import StudentHomePageNavBar from "../components/StudentHomePageNavBar";
import useApiPrivate from "../hooks/useAPIPrivate";
import { useDispatch, useSelector } from "react-redux";
import { removeAuthValues } from "../features/auth";
import { useState } from "react";
import { removeStudentProfile } from "../features/studentProfile";
import StudentHomePageNavBar2 from "../components/StudentHomePageNavBar2";
import Footer from "../components/Footer";

const StudentHomePageLayout = () => {

  const apiPrivate = useApiPrivate();
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.studentProfile.value);

  const handleLogOut = async () => {
    try {
      const response = await apiPrivate.get("/auth/logout", {
        withCredentials: true,
      });
      if (response.status === 200) {
        dispatch(removeAuthValues());
        dispatch(removeStudentProfile());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white">
      <div className="flex-col">
        <StudentHomePageNavBar profile={profile} handleLogOut={handleLogOut} career={false}/>
        <StudentHomePageNavBar2 />
      </div>

      <div className="ml-20 mr-20 mb-10 mt-20">
        <Outlet />
      </div>

      
      <div className="bg-[#7179C6]">
      <Footer/>
      </div>
    </div>
  );
};

export default StudentHomePageLayout;
