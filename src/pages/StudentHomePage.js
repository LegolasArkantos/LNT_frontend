import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import useAPIPrivte from "../hooks/useAPIPrivaate";

const StudentHomePage = () => {
  const apiPrivte = useAPIPrivte();

  const [availableSessions, setAvailableSessions] = useState([]);
  const [topRatedTeachers, setTopRatedTeachers] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getSessions = async () => {
      try {
        await apiPrivte.get("sessions/availableSessions").then((res) => {
          if (isMounted && res.status === 200) {
            setAvailableSessions(res.data.sessions);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    const getTopRatedTeachers = async () => {
      try {
        await apiPrivte.get("student/top-rated-teachers").then((res) => {
          if (isMounted && res.status === 200) {
            setTopRatedTeachers(res.data);
            console.log(topRatedTeachers)
          }
        });
      }
      catch (error) {
        console.log(error);
      }
    }

    getSessions();
    getTopRatedTeachers();

    return () => {
      isMounted = false;
      controller.abort();
    };

  }, []);

  return (
    <div>
      <form class="flex items-center">
        <label for="simple-search" class="sr-only">
          Search
        </label>
        <div class="w-full">
          <input
            type="text"
            id="simple-search"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for topics/courses..."
            required
          />
        </div>
        <button
          type="submit"
          class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            class="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span class="sr-only">Search</span>
        </button>
      </form>

      <div className="mt-10">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-teal-900 dark:text-white">
          New Sessions:
        </h1>
        <ul className="flex mt-10 space-x-8">
          {availableSessions.length === 0 ? (
            <p className="text-xl font-semibold">No Sessions Available</p>
          ) : (
            availableSessions.map((session, index) => (
              <li key={index}>
                <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <a href="#">
                    <img
                      class="rounded-t-lg"
                      src="/docs/images/blog/image-1.jpg"
                      alt=""
                    />
                  </a>
                  <div class="p-5">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {session.subject}
                    </h5>
                    <p class="mb-3 font-semibold text-green-500 text-xl dark:text-gray-400">
                      {"Price: " + session.sessionPrice}
                    </p>
                    <p class="mb-3 text-gray-700 text-xl dark:text-gray-400">
                      {"Teacher: " + session.teacherName}
                    </p>
                    <p class="mb-3 text-gray-700 text-xl dark:text-gray-400">
                      {"Start: " + session.startTime}
                    </p>
                    <p class="mb-3  text-gray-700 text-xl dark:text-gray-400">
                      {"End: " + session.endTime}
                    </p>
                    {/* <a
                      href="#"
                      class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Read more
                      <svg
                        class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </a> */}
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="mt-10">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-teal-900 dark:text-white">
          Top Rated Teachers:
        </h1>
        <ul className="flex mt-10 space-x-8">
          {topRatedTeachers.length === 0 ? (
            <p className="text-xl font-semibold">No Sessions Available</p>
          ) : (
            topRatedTeachers.map((teacher, index) => (
              <li key={index}>
                <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <a href="#">
                    <img
                      class="rounded-t-lg"
                      src="/docs/images/blog/image-1.jpg"
                      alt=""
                    />
                  </a>
                  <div class="p-5">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {teacher.firstName } {teacher.lastName}
                    </h5>
                    <p class="mb-3 font-semibold text-gray-900 text-xl dark:text-gray-400">
                      {"Subjects: " + teacher.subjectsTaught  }
                    </p>
                    <a
                      href="#"
                      class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-teal-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      View
                    </a>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default StudentHomePage;
