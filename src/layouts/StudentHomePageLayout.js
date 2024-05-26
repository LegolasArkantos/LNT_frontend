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
import ProfileDropDown from "../components/ProfileDropDown";

const StudentHomePageLayout = () => {

  const [dropDown, setDropDown] = useState(false);

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
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white">
      <div className="flex-col">
        <StudentHomePageNavBar profile={profile} career={false} setDropDown={setDropDown} dropDown={dropDown}/>
        {dropDown && (
        <div className="absolute flex w-[150px] justify-end top-16 right-0 z-50">
          <ProfileDropDown handleLogOut={handleLogOut} profile={profile} setDropDown={setDropDown} role="Student"/>
        </div>
      )}
        <StudentHomePageNavBar2 />
      </div>

      <div className="ml-20 mr-20 mb-20 mt-20">
        <Outlet />
      </div>

      
      <div className="bg-[#7179C6]">
      <Footer/>
      </div>
    </div>
  );
};

export default StudentHomePageLayout;
