import React from "react";
import { Outlet } from "react-router-dom";
import HomePageNavBar from "../components/HomePageNavBar";
import StudentSidebar from "../components/StudentSidebar";
import useApiPrivate from "../hooks/useAPIPrivaate";
import { useDispatch, useSelector } from "react-redux";
import { removeAuthValues } from "../features/auth";

const StudentHomePageLayout = () => {
  const apiPrivate = useApiPrivate();
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.userProfile.value);

  const handleLogOut = async () => {
    try {
      const response = await apiPrivate.get("/auth/logout", {
        withCredentials: true,
      });
      if (response.status === 200) {
        dispatch(removeAuthValues());
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
        <StudentSidebar handleLogOut={handleLogOut} />
      </div>

      <div className="ml-40 mr-40 mb-10 mt-32">
        <Outlet />
      </div>
    </div>
  );
};

export default StudentHomePageLayout;
