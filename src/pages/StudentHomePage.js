import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import useAPIPrivte from "../hooks/useAPIPrivate";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const StudentHomePage = () => {

  const navigate = useNavigate();

  const [availableSessions, setAvailableSessions] = useState([]);
  const [topRatedTeachers, setTopRatedTeachers] = useState([]);
  const [polls, setPolls] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const apiPrivate = useAPIPrivte();

  const profile = useSelector((state) => state.studentProfile.value);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getSessions = async () => {
      try {
        await apiPrivate.get("sessions/availableSessions").then((res) => {
          if (isMounted && res.status === 200) {
            console.log(res.data.sessions)
            setAvailableSessions(res.data.sessions);
          }
        });
        console.log("process   :  "+process.env.REACT_APP_BASE_URL)
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

  const handleSearch = (searchValue) => {
    navigate('/student-home-page/results', { state: { searchValue } })
  }


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
  const handleTeacherClick = (teacherId) => {
    navigate('/student-home-page/StudentProfileSecondary', { state: { teacherId, otherRole: "Teacher" } });
  };

  const viewSession = async (session) => {
    try {
        navigate('/student-home-page/session-overview', {state: {session}});
    } catch (error) {
        console.log(error);
    }
};

// const joinSession = async (sessionId) => {
//   try {
//       const response = await apiPrivate.post(`/sessions/joinSession/${sessionId}`);
//       alert('Student joined session successfully');
//   } catch (error) {
//       console.log(error);
//   }
// };

      
  
  
  
  
  

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />
      <div className="mt-10">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-teal-900 dark:text-white">
          Session Recommendations :
        </h1>
        <div className="flex items-center">
          <button className="hover:bg-teal-200 rounded-full" style={{ marginLeft: "-40px" }} onClick={() => slideLeft('slider1')}>
        <svg width="40px" height="40px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 22.4199C17.5228 22.4199 22 17.9428 22 12.4199C22 6.89707 17.5228 2.41992 12 2.41992C6.47715 2.41992 2 6.89707 2 12.4199C2 17.9428 6.47715 22.4199 12 22.4199Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M13.4102 16.4199L10.3502 13.55C10.1944 13.4059 10.0702 13.2311 9.98526 13.0366C9.9003 12.8422 9.85645 12.6321 9.85645 12.4199C9.85645 12.2077 9.9003 11.9979 9.98526 11.8035C10.0702 11.609 10.1944 11.4342 10.3502 11.29L13.4102 8.41992" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </button>
        <div id="slider1" className="flex w-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide mt-10 space-x-8">
          {availableSessions.length === 0 ? (
            <p className="text-xl font-normal">No Sessions Available</p>
          ) : (
            availableSessions.map((session, index) => (
              <div key={index} className="w-[250px] bg-white border border-gray-200 rounded-lg  shadow dark:bg-gray-800 dark:border-gray-700">
  <div className="">
    {/* <a href="#">
      <img
        className="rounded-t-lg w-full"
        src="/docs/images/blog/image-1.jpg"
        alt=""
      />
    </a> */}
    <div className="p-5">
      <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
        {session.subject}
      </h2>
      <p className="mb-2 text-sm font-medium text-green-500 dark:text-green-400">
        Price: {session.sessionPrice}
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
          onClick={() => handleTeacherClick(session.teacher._id)}
        >
          <span className="font-semibold">Teacher:</span> {session.teacherName}
        </button>
      </div>
      <p className="mb-2 text-sm text-gray-700 dark:text-gray-400">
        <span className="font-semibold">Start:</span> {session.startTime}
      </p>
      <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">
        <span className="font-semibold">End:</span> {session.endTime}
      </p>
      <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      onClick={() => viewSession(session)}>
        View
      </button>
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
            <p className="text-xl font-normal">No Teachers</p>
          ) : (
            topRatedTeachers.map((teacher, index) => (
              <div key={index} class="w-[250px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  
    <div class="flex items-center justify-center">
      <img
        class="w-40 h-40 mt-4 rounded-full border-4 border-white"
        src={teacher.profilePicture}
        alt=""
      />
    </div>
  <div class="p-5 text-wrap">
    <h2 class="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
      {teacher.firstName} {teacher.lastName}
    </h2>
    <p class="mb-3 text-sm font-medium text-gray-900 dark:text-gray-400">
      Subjects: {teacher.subjectsTaught}
    </p>
      <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 " 
        onClick={() => handleTeacherClick(teacher._id)}>
        View
      </button>
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
    <li key={index} className="mb-4 ml-2 mt-2 border border-gray-200 rounded-lg shadow p-3 w-[300px] h-fit">
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
