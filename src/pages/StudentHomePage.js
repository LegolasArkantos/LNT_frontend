import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import useAPIPrivte from "../hooks/useAPIPrivaate";

const StudentHomePage = () => {

  const [availableSessions, setAvailableSessions] = useState([]);
  const [topRatedTeachers, setTopRatedTeachers] = useState([]);
  const [polls, setPolls] = useState([]);

  const apiPrivate = useAPIPrivte();

  const profile = useSelector((state) => state.studentProfile.value);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getSessions = async () => {
      try {
        await apiPrivate.get("sessions/availableSessions").then((res) => {
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
        await apiPrivate.get("student/top-rated-teachers").then((res) => {
          if (isMounted && res.status === 200) {
            setTopRatedTeachers(res.data);
            console.log(topRatedTeachers)
          }
        });
      }
      catch (error) {
        console.log(error);
      }
    };

    const getPolls = async () => {
      await apiPrivate.get("poll/").then((res) => {
        if (isMounted && res.status === 200) {
          setPolls(res.data);
        }
      });
    };

    getSessions();
    getTopRatedTeachers();
    getPolls();

    return () => {
      isMounted = false;
      controller.abort();
    };

  }, []);

  useEffect(() => {

    const getPolls = async () => {
      await apiPrivate.get("poll/").then((res) => {
        if (res.status === 200) {
          setPolls(res.data);
        }
      });
    };
    const interval = setInterval(() => {
        getPolls();
    }, 2000); 

    return () => clearInterval(interval);
}, []); 


  const handleOptionClicked = async (pollID, optionID) => {
    await apiPrivate.put("poll/update-count/" + pollID, {optionID}).then((res) => {
      if (res.status === 200) {
        console.log(res.data);
      }
    })
  }

  const slideLeft = (id) => {
    var slider = document.getElementById(id);
    slider.scrollLeft -= 300; 
  };
  
  const slideRight = (id) => {
    var slider = document.getElementById(id);
    slider.scrollLeft += 300; 
  };
  

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
        <div className="flex items-center">
          <button className="hover:bg-teal-200 rounded-full" style={{ marginLeft: "-40px" }} onClick={() => slideLeft('slider1')}>
        <svg width="40px" height="40px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 22.4199C17.5228 22.4199 22 17.9428 22 12.4199C22 6.89707 17.5228 2.41992 12 2.41992C6.47715 2.41992 2 6.89707 2 12.4199C2 17.9428 6.47715 22.4199 12 22.4199Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M13.4102 16.4199L10.3502 13.55C10.1944 13.4059 10.0702 13.2311 9.98526 13.0366C9.9003 12.8422 9.85645 12.6321 9.85645 12.4199C9.85645 12.2077 9.9003 11.9979 9.98526 11.8035C10.0702 11.609 10.1944 11.4342 10.3502 11.29L13.4102 8.41992" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </button>
        <div id="slider1" className="flex w-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide mt-10 space-x-8">
          {availableSessions.length === 0 ? (
            <p className="text-xl font-semibold">No Sessions Available</p>
          ) : (
            availableSessions.map((session, index) => (
                <div key={index} class=" w-[500px] bg-white border border-gray-200 rounded-lg cursor-pointer shadow dark:bg-gray-800 dark:border-gray-700">
                  <div className="hover:scale-105 ease-in-out">
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
                </div>
            ))
          )}
        </div>
        <button className="hover:bg-teal-200 rounded-full" style={{ marginRight: "-40px" }} onClick={() => slideRight('slider1')}>
        <svg width="40px" height="40px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 22.4199C17.5228 22.4199 22 17.9428 22 12.4199C22 6.89707 17.5228 2.41992 12 2.41992C6.47715 2.41992 2 6.89707 2 12.4199C2 17.9428 6.47715 22.4199 12 22.4199Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M10.5596 8.41992L13.6196 11.29C13.778 11.4326 13.9047 11.6068 13.9914 11.8015C14.0781 11.9962 14.123 12.2068 14.123 12.4199C14.123 12.633 14.0781 12.8439 13.9914 13.0386C13.9047 13.2332 13.778 13.4075 13.6196 13.55L10.5596 16.4199" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </button>
        </div>
      </div>

      <div className="mt-10">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-teal-900 dark:text-white">
          Top Rated Teachers:
        </h1>
        <div className="flex items-center">
        <button className="hover:bg-teal-200 rounded-full" style={{ marginLeft: "-40px" }} onClick={() => slideLeft('slider2')}>
        <svg width="40px" height="40px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 22.4199C17.5228 22.4199 22 17.9428 22 12.4199C22 6.89707 17.5228 2.41992 12 2.41992C6.47715 2.41992 2 6.89707 2 12.4199C2 17.9428 6.47715 22.4199 12 22.4199Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M13.4102 16.4199L10.3502 13.55C10.1944 13.4059 10.0702 13.2311 9.98526 13.0366C9.9003 12.8422 9.85645 12.6321 9.85645 12.4199C9.85645 12.2077 9.9003 11.9979 9.98526 11.8035C10.0702 11.609 10.1944 11.4342 10.3502 11.29L13.4102 8.41992" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </button>
        <div id="slider2" className="flex w-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide mt-10 space-x-8">
          {topRatedTeachers.length === 0 ? (
            <p className="text-xl font-semibold">No Sessions Available</p>
          ) : (
            topRatedTeachers.map((teacher, index) => (
              <div key={index}>
                <div class="w-[400px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <a href="#">
                    <img
                      class="rounded-t-lg"
                      src="/docs/images/blog/image-1.jpg"
                      alt=""
                    />
                  </a>
                  <div class="p-5 text-wrap">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {teacher.firstName } {teacher.lastName}
                    </h5>
                    <p class="mb-3 font-semibold text-gray-900 text-lg dark:text-gray-400">
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
              </div>
            ))
          )}
        </div>
        <button className="hover:bg-teal-200 rounded-full" style={{ marginRight: "-40px" }} onClick={() => slideRight('slider2')}>
        <svg width="40px" height="40px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 22.4199C17.5228 22.4199 22 17.9428 22 12.4199C22 6.89707 17.5228 2.41992 12 2.41992C6.47715 2.41992 2 6.89707 2 12.4199C2 17.9428 6.47715 22.4199 12 22.4199Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M10.5596 8.41992L13.6196 11.29C13.778 11.4326 13.9047 11.6068 13.9914 11.8015C14.0781 11.9962 14.123 12.2068 14.123 12.4199C14.123 12.633 14.0781 12.8439 13.9914 13.0386C13.9047 13.2332 13.778 13.4075 13.6196 13.55L10.5596 16.4199" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </button>
        </div>
      </div>

      <div className="mt-10">
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-teal-900 dark:text-white">
          Polls:
        </h1>
        <div className="flex items-center">
        <button className="hover:bg-teal-200 rounded-full" style={{ marginLeft: "-40px" }} onClick={() => slideLeft('slider3')}>
        <svg width="40px" height="40px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 22.4199C17.5228 22.4199 22 17.9428 22 12.4199C22 6.89707 17.5228 2.41992 12 2.41992C6.47715 2.41992 2 6.89707 2 12.4199C2 17.9428 6.47715 22.4199 12 22.4199Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M13.4102 16.4199L10.3502 13.55C10.1944 13.4059 10.0702 13.2311 9.98526 13.0366C9.9003 12.8422 9.85645 12.6321 9.85645 12.4199C9.85645 12.2077 9.9003 11.9979 9.98526 11.8035C10.0702 11.609 10.1944 11.4342 10.3502 11.29L13.4102 8.41992" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </button>
        <ul id="slider3" className="flex w-full overflow-x-scroll scroll scroll-smooth scrollbar-hide mt-10 space-x-8">
        {polls.length !== 0 ? (
  polls.map((poll, index) => (
    <li key={index} className="mb-4 ml-2 mt-2 outline outline-teal-800 rounded p-3 w-[300px] h-fit">
      <h3 className="text-lg mt-5 font-semibold text-teal-900">{poll.question}</h3>
      <ul className="mt-5 ">
        {poll.options.map((option, optionIndex) => (
          <li className="w-[300px]" key={optionIndex}>
            <div className="flex items-center space-x-2 mb-2 mt-2">
              {/*
                Only render the radio input if the student has not voted
                Check if the student's profileID exists in the poll's users array
              */}
              {!poll.users.includes(profile.profileID) && (
                <input
                  onClick={() => handleOptionClicked(poll._id, option._id)}
                  id={`option-${option._id}`}
                  type="radio"
                  value=""
                  name={`poll-${poll._id}`}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 cursor-pointer focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
              )}
              <p className="font-bold">{option.option}</p>
            </div>
            <span>
              <div class="w-[270px] bg-blue-400 rounded-full dark:bg-gray-700">
                <div
                  class={`${option.percentage === 0 ? ("bg-blue-400") : ("bg-blue-600")} text-xs font-medium text-blue-200 text-center p-0.5 leading-none rounded-full`}
                  style={option.percentage !== 0 ? { width: `${option.percentage}%` } : null}
                >
                  {option.percentage}%
                </div>
              </div>
            </span>
          </li>
        ))}
      </ul>
    </li>
  ))
) : (<p>No current polls</p>)}

        </ul>
        <button className="hover:bg-teal-200 rounded-full" style={{ marginRight: "-40px" }} onClick={() => slideRight('slider3')}>
        <svg width="40px" height="40px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 22.4199C17.5228 22.4199 22 17.9428 22 12.4199C22 6.89707 17.5228 2.41992 12 2.41992C6.47715 2.41992 2 6.89707 2 12.4199C2 17.9428 6.47715 22.4199 12 22.4199Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M10.5596 8.41992L13.6196 11.29C13.778 11.4326 13.9047 11.6068 13.9914 11.8015C14.0781 11.9962 14.123 12.2068 14.123 12.4199C14.123 12.633 14.0781 12.8439 13.9914 13.0386C13.9047 13.2332 13.778 13.4075 13.6196 13.55L10.5596 16.4199" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </button>
        </div>
      </div>
    </div>
  );
};

export default StudentHomePage;
