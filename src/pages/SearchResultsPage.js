import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import useApiPrivate from '../hooks/useAPIPrivate';
import SearchBar from '../components/SearchBar';

const SearchResultsPage = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);

  const location = useLocation();
  const { searchValue } = location.state;
  const apiPrivate = useApiPrivate();

  useEffect(() => {
    const getResults = async () => {
      await apiPrivate.get("sessions/search", { params: { value: searchValue } }).then((res) => {
        if (res.status === 200) {
          setSessions(res.data);
        }
      });
    };

    getResults();
  }, [searchValue, apiPrivate]);

  const handleTeacherClick = (teacherId) => {
    navigate('/student-home-page/StudentProfileSecondary', { state: { teacherId, otherRole: "Teacher" } });
  };

  const handleSearch = async (searchValue) => {
    await apiPrivate.get("sessions/search", { params: { value: searchValue } }).then((res) => {
      if (res.status === 200) {
        setSessions(res.data);
      }
    });
  };

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />
      <h1 className="mb-4 mt-10 text-2xl font-bold dark:text-white">Search Results</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {sessions?.length === 0 ? (
          <p>No Sessions Found</p>
        ) : (
          sessions.map((session, index) => (
            <div
              key={index}
              className="flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <div>
                <div className="p-5 flex flex-col h-full">
                  <div className="flex-1">
                    <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                      {session?.session?.subject}
                    </h2>
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
                        className="text-sm text-purple-500 hover:underline focus:outline-none"
                        onClick={() => handleTeacherClick(session?.session?.teacher._id)}
                      >
                        <span className="font-semibold">Teacher:</span> {session?.session?.teacherName}
                      </button>
                    </div>
                    <p className="mb-2 text-sm text-gray-700 dark:text-gray-400">
                      <span className="font-semibold">Start:</span> {session?.session?.startTime}
                    </p>
                    <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">
                      <span className="font-semibold">End:</span> {session?.session?.endTime}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="text-white w-2/5 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-xs px-2 py-2.5 text-center mb-2"
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
