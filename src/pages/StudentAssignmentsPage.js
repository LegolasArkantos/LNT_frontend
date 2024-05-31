import React, { useState, useEffect } from 'react';
import { apiPrivate } from '../services/api';
import { useLocation,useNavigate } from 'react-router-dom';
import ConfirmationPopupQuiz from '../components/ConfirmationPopup';
import Lottie from 'react-lottie';
import loadingPurple from '../assets/loadingPurple.json';
import emptyDataImgCourses from '../assets/no data.png'

const StudentAssignmentsPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [quizes, setQuizes] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [nav, setNav] = useState("Assignments");
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const sessionId = location.state.sessionId;
        const response = await apiPrivate.get(`/assignment/getSessionAssignments/${sessionId}`);
        setAssignments(response.data.assignments);
      } catch (error) {
        console.error(error);
      }
      finally {
        setLoading1(false);
      }
    };

    const fetchQuizes = async () => {
      try {
        const sessionId = location.state.sessionId;
        const response = await apiPrivate.get(`/quiz/get-session-quizes/${sessionId}`);
        console.log(response)
        setQuizes(response.data.quiz);
      } catch (error) {
        console.error(error);
      }
      finally {
        setLoading2(false);
      }
    }

    const fetchMySubmissions = async () => {
      try {
        const sessionId = location.state.sessionId;
        const response = await apiPrivate.get(`/quiz/my-session-quiz-submissions/${sessionId}`);
        setSubmissions(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMySubmissions();
    fetchQuizes();

    fetchAssignments();
  }, [location]);

  const handleAssignmentClick = (assignmentId) => {
    console.log("id "+assignmentId)
    navigate('/student-home-page/sessions/assignments/submission', { state: { assignmentId} });
  };

  const onConfirm = () => {
    navigate('/student-home-page/sessions/quizes/quiz', { state: { selectedQuiz, sessionId: location.state.sessionId } })
  }

  return (
    <div className=" max-w-screen ">
      <div className="p-8 flex flex-col space-y-10 max-w-screen h-full">
        <div className='flex w-full justify-center items-center'>
          <div className='flex bg-gray-200 w-1/4 h-[30px] shadow-lg rounded-full'>
            <div onClick={() => setNav("Assignments")} className={`flex items-center justify-center w-1/2 ${nav == "Assignments" && 'bg-[#7179C6]'} hover:bg-[#7179C6] hover:border hover:border-purple-500 hover:border-2 cursor-pointer rounded-l-full`}>
              <h className='font-bold text-3/5 text-black'>
                Assignments
              </h>
            </div>
            <div onClick={() => setNav("Quizes")} className={`flex items-center justify-center w-1/2 ${nav == "Quizes" && 'bg-[#7179C6]'} hover:bg-[#7179C6] hover:border hover:border-purple-500 hover:border-2 cursor-pointer rounded-r-full`}>
              <h className='font-bold text-3/5 text-black'>
                Quizes
              </h>
            </div>
          </div>
        </div>
        {
          nav === "Assignments"
          ? (
            <div className="flex-1 flex flex-col h-[500px] max-w-screen mt-[-50px] mb-[125px] p-6" style={{ overflow: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className=" justify-between items-center mb-4">
          <h2 className="text-2xl text-[#7179C6] font-bold">Assignments</h2>
          </div>
          <div className="flex flex-col overflow-y-scroll h-[350px] scroll scrollbar-hide" style={{ paddingRight: '17px' }}>
            {
              loading1 && (
                <div className="flex w-full h-[350px] items-center justify-center">
              <Lottie
                    options={{
                      loop: true,
                      autoplay: true,
                      animationData: loadingPurple,
                      rendererSettings: {
                        preserveAspectRatio: 'xMidYMid slice',
                      },
                    }}
                    height={200}
                    width={200}
                  />
            </div>
              )
            }
            {!loading1 && assignments?.length === 0
            ? (
              <div className="flex w-full h-[300px] items-center justify-center">
            {/* <p className="text-xl font-normal">No Sessions Available</p> */}
            <img className="w-1.5/5 h-full" src={emptyDataImgCourses}/>
            </div>
            )
            :(
            assignments?.map((assignment) => (
              <div key={assignment?._id} className="flex justify-between items-center bg-purple-100 p-4 rounded-lg shadow-lg mb-4">
                <h3 onClick={() =>handleAssignmentClick(assignment?._id)} className="text-xl cursor-pointer font-semibold mb-2 text-purple-800 hover:underline">
                  {assignment?.title}
                </h3>
                <div className="flex">
                <div className='flex'>
                  <h className="font-bold text-sm text-gray-700 mx-2">Start Time:</h>
                  <p className="font-semibold text-sm mr-4">{assignment?.startTime}</p>
                </div>
                <div className='flex'>
                  <h className="font-bold text-gray-700 text-sm mx-2">End Time:</h>
                  <p className="font-semibold text-sm mr-4">{assignment?.endTime}</p>
                </div>
                <div className='flex'>
                  <h className="font-bold text-gray-700 text-sm mx-2">Marks:</h>
                  <p className="font-semibold text-sm mr-2">{assignment?.marks}</p>
                </div>
                </div>
              </div>
            )))}
          </div>
        </div>
          )
          : (
        <div className="flex-1 flex flex-col h-[500px] max-w-screen mt-[-50px] mb-[125px] p-6" style={{ overflow: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl text-[#7179C6] font-bold">Quizes</h2>
          </div>
          <div className="flex flex-col" >
            <div className='overflow-y-scroll h-[350px] scroll scrollbar-hide'>
              {
                loading2 && (
                  <div className="flex w-full h-[350px] items-center justify-center">
              <Lottie
                    options={{
                      loop: true,
                      autoplay: true,
                      animationData: loadingPurple,
                      rendererSettings: {
                        preserveAspectRatio: 'xMidYMid slice',
                      },
                    }}
                    height={200}
                    width={200}
                  />
            </div>
                )
              }
            {!loading2 && quizes?.length === 0 
            ? (
              <div className="flex w-full h-[300px] items-center justify-center">
            {/* <p className="text-xl font-normal">No Sessions Available</p> */}
            <img className="w-1.5/5 h-full" src={emptyDataImgCourses}/>
            </div>
            )
            : (quizes.map((quiz, index) => {
              const submission = submissions[index];
              return (
              <div key={quiz?._id} className="flex justify-between items-center bg-purple-100 p-4 rounded-lg shadow-lg mb-4">
                <h3
                onClick={() => {
                  if (!submission) {
                    setConfirmationPopup(true);
                    setSelectedQuiz(quiz);
                  }
                }}
                className={`${!submission ? 'hover:underline cursor-pointer' : ''} text-xl text-purple-800 font-semibold mb-2`}
                >
                  {quiz?.title}
                </h3>
                <div className="flex items-center justify-center">
                {
                  submission && (
                    <button onClick={ () => {
                      navigate("/student-home-page/sessions/quizes/quiz-feedback", { state: { quiz, submission} })
                    }} class="text-white w-2/5 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-xs px-2 py-2.5 text-center me-2 mb-2">Feedback</button>
                  )
                }
                <div className='flex'>
                  <h className="font-bold text-sm text-gray-700 mx-2">Time:</h>
                  <p className="font-semibold text-sm mr-4">{quiz?.time}</p>
                </div>
                <div className='flex'>
                  <h className="font-bold text-sm text-gray-700 mx-2">Marks:</h>
                  <p className="font-semibold text-sm mr-2">{quiz?.marks}</p>
                </div>
                </div>
              </div>
              )}))
            }
            </div>
          </div>
        </div>
          )
        }

      
      </div>
      {
        confirmationPopup && (
          <ConfirmationPopupQuiz onConfirm={onConfirm} message="Are you sure you want to start the Quiz?" setConfirmationPopup={setConfirmationPopup}/>
        )
      }
    </div>
  );
};

export default StudentAssignmentsPage;
