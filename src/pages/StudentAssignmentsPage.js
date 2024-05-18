import React, { useState, useEffect } from 'react';
import { apiPrivate } from '../services/api';
import { useLocation,useNavigate } from 'react-router-dom';
import ConfirmationPopupQuiz from '../components/ConfirmationPopupQuiz';

const StudentAssignmentsPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [quizes, setQuizes] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
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
    navigate('/student-home-page/submission', { state: { assignmentId} });
  };

  const onConfirm = () => {
    navigate('/student-home-page/quiz', { state: { selectedQuiz, sessionId: location.state.sessionId } })
  }

  return (
    <div className=" max-w-screen ">
      <div className="p-8 flex flex-col max-w-screen h-full">
        <div className="bg-teal-100 rounded-lg outline outline-teal-500 flex-1 flex flex-col  h-[900px] max-w-screen mt-[-50px] mb-[125px] p-6" style={{ overflow: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className=" justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Assignments</h2>
          </div>
          <div className="flex flex-col overflow-y-scroll scroll scrollbar-hide" style={{ paddingRight: '17px' }}>
            {/* <div className="flex items-right bg-gray-200 p-4 rounded-lg shadow-lg mb-4">
              <div className="flex-grow font-bold">Name</div>
              <div className="font-bold mx-4">Start Time</div>
              <div className="font-bold mx-4">End Time</div>
              <div className="font-bold">Marks</div>
            </div> */}
            {assignments?.map((assignment) => (
              <div key={assignment?._id} className="flex items-center bg-gray-100 p-4 rounded-lg shadow-lg mb-4">
                <h3 onClick={() =>handleAssignmentClick(assignment?._id)} className="text-xl font-semibold mb-2 text-black-500 cursor-pointer hover:underline">
                  {assignment?.title}
                </h3>
            <div className="flex-grow"></div>
                <div className='flex'>
                  <h className="font-bold mx-4">Start Time:</h>
                  <p className="">{assignment?.startTime}</p>
                </div>
                <div className='flex'>
                  <h className="font-bold mx-4">End Time:</h>
                  <p className="">{assignment?.endTime}</p>
                </div>
                <div className='flex'>
                  <h className="font-bold mx-4">Marks:</h>
                  <p className="">{assignment?.marks}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col max-w-screen h-full">
        <div className="bg-teal-100 rounded-lg outline outline-teal-500 flex-1 flex flex-col  h-[900px] max-w-screen mt-[-50px] mb-[125px] p-6" style={{ overflow: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Quizes</h2>
          </div>
          <div className="flex flex-col" >
            {/* <div className="flex items-center bg-gray-200 p-4 rounded-lg shadow-lg mb-4">
              <div className="flex-grow font-bold">Title</div>
              <div className="font-bold mx-4">Marks Attained</div>
              <div className="font-bold mx-4">Time</div>
              <div className="font-bold">Marks</div>
            </div> */}
            <div className='overflow-y-scroll scroll scrollbar-hide'>
            {quizes.map((quiz, index) => {
              const submission = submissions[index];
              return (
              <div key={quiz?._id} className="flex items-center bg-gray-100 p-4 rounded-lg shadow-lg mb-4">
                <h3
                onClick={() => {
                  if (!submission) {
                    setConfirmationPopup(true);
                    setSelectedQuiz(quiz);
                  }
                }}
                className={`text-xl ${!submission ? 'hover:underline cursor-pointer' : ''} font-semibold mb-2`}
                >
                  {quiz?.title}
                </h3>
                <div className="flex-grow"></div>
                {
                  submission && (
                    <button onClick={ () => {
                      navigate("/student-home-page/quiz-feedback-page", { state: { quiz, submission} })
                    }} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Feedback</button>
                  )
                }
                <div className='flex'>
                  <h className="font-bold mx-4">Marks Attained:</h>
                  <p className="">{!submission?.marks ? "Not Attempted" : submission?.marks}</p>
                </div>
                <div className='flex'>
                  <h className="font-bold mx-4">Time:</h>
                  <p className="">{quiz?.time}</p>
                </div>
                <div className='flex'>
                  <h className="font-bold mx-4">Marks:</h>
                  <p className="">{quiz?.marks}</p>
                </div>
              </div>
              )})
            }
            </div>
          </div>
        </div>
      </div>

      {
        confirmationPopup && (
          <ConfirmationPopupQuiz onConfirm={onConfirm} setConfirmationPopup={setConfirmationPopup}/>
        )
      }
      </div>
    </div>
  );
};

export default StudentAssignmentsPage;
