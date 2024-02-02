import React from "react";
import HomePageNavBar from "../components/HomePageNavBar";
import Sidebar from "../components/StudentSidebar";

const TeacherSessionPage = () => {
  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="p-8 flex space-x-8 h-full">
        {/* Sessions Container */}
        <div className="rounded bg-white p-8 flex-1">
          <h2 className="text-2xl font-bold mb-4">Teacher Sessions</h2>

          {/* Session Cards (Dummy Data) */}
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded mb-4">
              <h3 className="text-lg font-semibold mb-2">
                Session {index + 1}
              </h3>
              <p>Subject: Math</p>
              <p>Price: $20</p>
              <p>No. of Students: 10</p>
            </div>
          ))}

          {/* Button to Create Session */}
          <button className="bg-teal-400 text-white px-4 py-2 rounded mt-4">
            Create Session
          </button>
        </div>

        {/* Assignments Container */}
        <div className="rounded bg-white p-8 flex-1">
          <h2 className="text-2xl font-bold mb-4">Assignments</h2>

          {/* Assignment Cards (Dummy Data) */}
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded mb-4">
              <h3 className="text-lg font-semibold mb-2">
                Assignment {index + 1}
              </h3>
              <p>Subject: Science</p>
              <p>Time: Due in 3 days</p>
            </div>
          ))}

          {/* Button to Create Assignment */}
          <button className="bg-teal-400 text-white px-4 py-2 rounded mt-4">
            Create Assignment
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherSessionPage;
