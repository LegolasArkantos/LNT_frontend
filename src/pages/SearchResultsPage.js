import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import useApiPrivate from '../hooks/useAPIPrivaate';

const SearchResultsPage = () => {
  const navigate = useNavigate();
    const [sessions, setSessions] = useState([]);

    const location = useLocation();
    const { searchValue } = location.state
    const apiPrivate = useApiPrivate();

    useEffect(() => {

        const getResults = async () => {
            await apiPrivate.get("sessions/search", { params: {value: searchValue}}).then((res) => {
                if (res.status === 200) {
                    setSessions(res.data);
                }
            })
        };

        getResults();
    }, [])

    const handleTeacherClick = (teacherId) => {
      console.log("id"+teacherId)
      navigate('/student-home-page/StudentProfileSecondary', { state: { teacherId, otherRole: "Teacher" } });
    };

  return (
    <div>
        <h1 className="mb-4  mt-10 text-2xl font-extrabold dark:text-white">search results</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  mb-10 gap-5">
        {sessions.length === 0 
        ? (
        <p>No Sessions Found</p>
        ) 
        : (
          sessions.map((session, index) => (
            <div key={index} className="w-[300px] bg-white border border-gray-200 rounded-lg  shadow dark:bg-gray-800 dark:border-gray-700">
  <div className="">
    <a href="#">
      <img
        className="rounded-t-lg w-full"
        src="/docs/images/blog/image-1.jpg"
        alt=""
      />
    </a>
    <div className="p-5">
      <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
        {session.session.subject}
      </h2>
      <p className="mb-2 text-sm font-medium text-green-500 dark:text-green-400">
        Price: {session.session.sessionPrice}
      </p>
      <div className="flex items-center mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-1 text-gray-600 dark:text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
        <button
          className="text-sm text-blue-500 hover:underline focus:outline-none"
          onClick={() => handleTeacherClick(session.session.teacher)}
        >
          <span className="font-semibold">Teacher:</span> {session.session.teacherName}
        </button>
      </div>
      <p className="mb-2 text-sm text-gray-700 dark:text-gray-400">
        <span className="font-semibold">Start:</span> {session.session.startTime}
      </p>
      <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">
        <span className="font-semibold">End:</span> {session.session.endTime}
      </p>
      <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
        Join
      </button>
    </div>
  </div>
</div>
          ))
          )}
      </div>
    </div>
  )
}

export default SearchResultsPage