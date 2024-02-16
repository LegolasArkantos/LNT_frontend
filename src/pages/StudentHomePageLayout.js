import React from "react";
import { Outlet } from "react-router-dom";
import StudentHomePageNavBar from "../components/StudentHomePageNavBar";
import useApiPrivate from "../hooks/useAPIPrivaate";
import { useDispatch, useSelector } from "react-redux";
import { removeAuthValues } from "../features/auth";
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
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white">
      <div className="flex-col space-y-16">
        <StudentHomePageNavBar profile={profile} />
        <StudentHomePageNavBar2 profile={profile} handleLogOut={handleLogOut} />
      </div>

      <div className="ml-20 mr-20 mb-10 mt-20">
        <Outlet />
      </div>

      
      <div className="bg-teal-100">
      <Footer/>
      </div>
    </div>
  );
};

export default StudentHomePageLayout;
