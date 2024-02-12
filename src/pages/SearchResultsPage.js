import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import useApiPrivate from '../hooks/useAPIPrivaate';

const SearchResultsPage = () => {

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
            <div key={index} class=" w-[500px] bg-white border border-gray-200 hover:border-gray-500 rounded-lg cursor-pointer shadow dark:bg-gray-800 dark:border-gray-700">
                  <div className="">
                  {/* <a href="#">
                    <img
                      class="rounded-t-lg"
                      src="/docs/images/blog/image-1.jpg"
                      alt=""
                    />
                  </a> */}
                  <div class="p-5">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {session.session.subject}
                    </h5>
                    <p class="mb-3 font-semibold text-green-500 text-xl dark:text-gray-400">
                      {"Price: " + session.session.sessionPrice}
                    </p>
                    <p class="mb-3 text-gray-700 text-xl dark:text-gray-400">
                      {"Teacher: " + session.session.teacherName}
                    </p>
                    <p class="mb-3 text-gray-700 text-xl dark:text-gray-400">
                      {"Start: " + session.session.startTime}
                    </p>
                    <p class="mb-3  text-gray-700 text-xl dark:text-gray-400">
                      {"End: " + session.session.endTime}
                    </p>
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