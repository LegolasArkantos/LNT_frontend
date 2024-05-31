import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAPIPrivate from "../hooks/useAPIPrivate";
import Lottie from 'react-lottie';
import loadingPurple from '../assets/loadingPurple.json';
import emptyDataImgCourses from '../assets/no data.png';

const TeacherAssignmentsPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [isCreateAssignmentPopupOpen, setIsCreateAssignmentPopupOpen] = useState(false);
  const [createAssignmentFormData, setCreateAssignmentFormData] = useState({
    title: '',
    startTime: '',
    endTime: '',
    description: '',
    marks: ''
  });
  const [quizes, setQuizes] = useState([]);
  const [createQuiz, setCreateQuiz] = useState(false);
  const [createQuizFormData, setCreateQuizFormData] = useState({
    title: '',
    time: '',
    marks: '',
    questions: []
  });
  const [quizSubmissions, setQuizSubmissions] = useState([]);
  const [nav, setNav] = useState("Assignments");
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  
  const location = useLocation();
  const navigate = useNavigate();
  const sessionId = location.state.sessionId;
  const subject = location.state.subject;

  const apiPrivate = useAPIPrivate();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        
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

    

    fetchQuizes();

    fetchAssignments();
  }, [location]);

  const handleOpenCreateAssignmentPopup = () => {
    setIsCreateAssignmentPopupOpen(true);
  };

  const handleCloseCreateAssignmentPopup = () => {
    setCreateAssignmentFormData({
      title: '',
      startTime: '',
      endTime: '',
      description: '',
      marks: ''
    })
    setIsCreateAssignmentPopupOpen(false);
  };

  const handleCreateAssignmentFormChange = (e) => {
    setCreateAssignmentFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateAssignmentSubmit = async (e) => {
    e.preventDefault();
    try {
      const sessionId = location.state.sessionId;
      await apiPrivate.post(`/assignment/create/${sessionId}`, createAssignmentFormData);
      const response = await apiPrivate.get(`/assignment/getSessionAssignments/${sessionId}`);
      setAssignments(response.data.assignments);
      setIsCreateAssignmentPopupOpen(false);
      setCreateAssignmentFormData({
        title: '',
        startTime: '',
        endTime: '',
        description: '',
        marks: ''
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAssignmentClick = (assignmentId,sessionId,subject) => {
    console.log("id "+assignmentId,sessionId,subject)
    navigate('/teacher-home-page/sessions/assignments/overview', { state: { assignmentId,sessionId,subject} });
  };

  const handleCreateQuizFormChange = (e) => {
    setCreateQuizFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const addQuestion = () => {
    const newQuestion = {
      question: '',
      options: ['','','',''],
      correctAns: ''
    };
    
    setCreateQuizFormData(prevState => ({
      ...prevState,
      questions: [...prevState.questions, newQuestion]
    }));
  };

  const handleQuestionChange = (index, key, value) => {
    setCreateQuizFormData(prevState => {
      const updatedQuestions = [...prevState.questions];
      if (key === 'options') {
        updatedQuestions[index][key][value.index] = value.optionText;
      } else {
        updatedQuestions[index][key] = value;
      }
      return { ...prevState, questions: updatedQuestions };
    });
  };
  

  const handleCloseCreateQuizPopup = () => {
    setCreateQuiz(false);
    setCreateQuizFormData({
        title: '',
        time: '',
        marks: '',
        questions: []
    });
  };

  const handleCreateQuizFormSubmit = async (e) => {
    e.preventDefault();
  
    if (createQuizFormData.questions.length === 0) {
      alert('Please add at least one question before submitting.');
      return;
    }

    const hasEmptyFields = createQuizFormData.questions.some(question =>
      question.question?.trim() === '' ||
      question.options.some(option => option.trim() === '') ||
      question.correctAns === ''
    );
  
    if (hasEmptyFields) {
      alert('Please fill in all fields for each question before submitting.');
      return;
    }
  
    await apiPrivate.post(`quiz/create/${location.state.sessionId}`, {
      title: createQuizFormData.title, 
      marks: createQuizFormData.marks,
      time: createQuizFormData.time,
      questions: createQuizFormData.questions
    }).then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        quizes.push(res.data);
        setQuizes(quizes);
      }
    });
  
    setCreateQuiz(false);
    setCreateQuizFormData({
      title: '',
      time: '',
      marks: '',
      questions: []
    });
  }

  const fetchQuizSubmissions = async (quizId) => {
    try {
      await apiPrivate.get(`quiz/get-quiz-submissions/${quizId}`).then((res) => {
        if (res.status === 200) {
          setQuizSubmissions(res.data);
        }
      })
    }
    catch(error) {
      console.log(error)
    }
    
  }

  const handleQuizUpload = async (e) => {
    try {
        const file = e.target.files[0];
        console.log(file);

        if (file) { 
          const formData = new FormData();
          formData.append('file', file);
             await apiPrivate.post('quiz/upload-questions', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          })
                .then((res) => {
                    if (res.status === 200) {
                      console.log(res.data)
                      setCreateQuizFormData(prevState => ({
                        ...prevState,
                        questions: res.data
                      }));
                    }
                });
        }
    } catch (error) {
        console.log(error);
    }
};

  


  return (
    <div className="max-w-screen">
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
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl text-[#7179C6] font-bold">Assignments</h2>
            <button onClick={handleOpenCreateAssignmentPopup} className="inline-flex items-center px-4 py-2 mt-2 text-sm font-medium text-white bg-[#7179C6] rounded-lg hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
              Create Assignment
            </button>
          </div>
            <div className='flex flex-col overflow-y-scroll h-[350px] scroll scrollbar-hide'>
            {
              loading1 && (
                (
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
              )
            }
            {
              !loading1 && assignments?.length === 0
              ? (<div className="flex w-full h-[300px] items-center justify-center">
              {/* <p className="text-xl font-normal">No Sessions Available</p> */}
              <img className="w-1.5/5 h-full" src={emptyDataImgCourses}/>
              </div>
              )
              : (
            assignments?.map((assignment) => (
              <div key={assignment?._id} className="flex justify-between items-center bg-purple-100 p-4 rounded-lg shadow-lg mb-4">
                <h3 className="text-xl cursor-pointer font-semibold mb-2 text-purple-800 hover:underline"
                onClick={() =>handleAssignmentClick(assignment?._id,sessionId,subject)}
              >
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
        <div className="rounded-lg flex-1 flex flex-col h-[500px] max-w-screen mt-[-50px] mb-[125px] p-6" style={{ overflow: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl text-[#7179C6] font-bold">Quizes</h2>
            <button onClick={() => {
              setCreateQuiz(true)
            }} className="inline-flex items-center px-4 py-2 mt-2 text-sm font-medium text-white bg-[#7179C6] rounded-lg hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
              Create Quiz
            </button>
          </div>
            <div className='flex flex-col overflow-y-scroll h-[350px] scroll scrollbar-hide'>
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
            {!loading2 && quizes.length === 0
            ? (
              <div className="flex w-full h-[300px] items-center justify-center">
            {/* <p className="text-xl font-normal">No Sessions Available</p> */}
            <img className="w-1.5/5 h-full" src={emptyDataImgCourses}/>
            </div>
            )
            : (
            quizes.map((quiz) => (
              <div key={quiz?._id} className="flex justify-between items-center bg-purple-100 p-4 rounded-lg shadow-lg mb-4">
                <h3 onClick={() =>fetchQuizSubmissions(quiz?._id)} className="text-xl text-purple-800 font-semibold mb-2 hover:underline cursor-pointer">
                    {quiz?.title}
                </h3>
            <div className="flex">
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
            )))}
            </div>
        </div>
          )
        }
      </div>
      {isCreateAssignmentPopupOpen && (
        <div className="fixed top-0 left-0 h-screen w-screen z-20 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 h-3.5/5 w-2.5/5 p-8 rounded">
            <h2 className="text-2xl text-[#7179C6] font-bold mb-4">Create Assignment</h2>
            <form onSubmit={handleCreateAssignmentSubmit}>
              <div className="flex space-x-3">
                <div >
                <label htmlFor="title" className="font-bold text-sm text-gray-700">Topic</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={createAssignmentFormData?.title}
                  onChange={handleCreateAssignmentFormChange}
                  placeholder='The topic of the Assignment'
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="startTime" className="font-bold text-sm text-gray-700">Start Time</label>
                <input
                  type="text"
                  id="startTime"
                  name="startTime"
                  value={createAssignmentFormData?.startTime}
                  onChange={handleCreateAssignmentFormChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="endTime" className="font-bold text-sm text-gray-700">End Time</label>
                <input
                  type="text"
                  id="endTime"
                  name="endTime"
                  value={createAssignmentFormData?.endTime}
                  onChange={handleCreateAssignmentFormChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              </div>
              <div className="flex flex-col w-1/5 mb-4">
                <label htmlFor="marks" className="font-bold text-sm text-gray-700">Marks</label>
                <input
                  type="text"
                  id="marks"
                  name="marks"
                  value={createAssignmentFormData?.marks}
                  onChange={handleCreateAssignmentFormChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="description" className="font-bold text-sm text-gray-700">Description</label>
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  value={createAssignmentFormData?.description}
                  onChange={handleCreateAssignmentFormChange}
                  placeholder='Instructions about the Assignment'
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button type="button" onClick={handleCloseCreateAssignmentPopup} className="bg-gray-300 hover:bg-gray-500 text-gray-800 px-4 py-2 rounded">Close</button>
                <button type="submit" className="bg-[#7179C6] hover:bg-purple-500 text-white px-4 py-2 rounded">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {
        createQuiz && (
          <div className="fixed top-0 left-0 z-20 h-screen w-screen bg-gray-800 bg-opacity-50 flex items-center justify-center">
          
          <div className="bg-white p-8 w-3/5 rounded">
            <h2 className="text-2xl text-[#7179C6] font-bold mb-2">Create Quiz</h2>
            <form onSubmit={(e) => handleCreateQuizFormSubmit(e)}>
              <div className='flex space-x-3'>
              <div className="flex flex-col ">
                <label htmlFor="title" className="font-bold text-sm text-gray-700">Topic</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={createQuizFormData?.title}
                  onChange={handleCreateQuizFormChange}
                  placeholder='The topic of the Quiz'
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="time" className="font-bold text-sm text-gray-700">Time</label>
                <input
                  type="number"
                  placeholder='Minutes'
                  id="time"
                  name="time"
                  value={createQuizFormData?.time}
                  onChange={handleCreateQuizFormChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="marks" className="font-bold text-sm text-gray-700">Marks</label>
                <input
                  type="text"
                  id="marks"
                  name="marks"
                  value={createQuizFormData?.marks}
                  onChange={handleCreateQuizFormChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="quiz-upload" className="font-bold text-sm text-gray-700">Upload Quiz</label>
                <input
                  type="file"
                  id="quiz-upload"
                  name="quiz-upload"
                  className="mt-1 w-[250px] border rounded-md"
                  onChange={handleQuizUpload}
                />
              </div>
              </div>
              <div className='overflow-x-scroll scroll flex mb-2 p-2 space-x-8 w-full' >
                {
                  createQuizFormData?.questions?.map((question,index) => (
                    <div className="max-w-lg my-8 p-2 bg-white shadow-md outline rounded-md">
                      <div className='flex space-x-2'>
                <div className='flex-col space-y-3 mb-3'>
                  <div className='flex space-x-4'>
                    <div className='flex-col ml-4'>
                  <h2 className="font-bold text-m text-gray-700">Question</h2>
                  <input type="text" value={question?.question} onChange={(e) => handleQuestionChange(index, 'question', e.target.value)} className="border rounded-md px-2 py-1 focus:outline-none" />
                  </div>
                  <div className='flex-col ml-4'>
                    <h2 className="font-bold text-m text-gray-700">Answer</h2>
                    <input type="text" value={question?.correctAns?.toUpperCase()} maxLength={1} placeholder='A' onChange={(e) => handleQuestionChange(index, 'correctAns', e.target.value.toUpperCase())} className="border rounded-md w-7 ml-4 px-2 py-1 focus:outline-none" />
                  </div>
                  </div>
                </div>
                </div>
                <div className='flex'>
      <div className="flex-col space-y-2">
      {question?.options?.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center">
                <label className="font-bold text-m text-gray-700 mr-1">{String.fromCharCode(65 + optionIndex)}.</label>
                <input
                  type="text"
                  value={option}
                  onChange={e => handleQuestionChange(index, 'options', { index: optionIndex, optionText: e.target.value })}
                  className="border rounded-md px-2 py-1 focus:outline-none"
                />
              </div>
            ))}
      </div>
      
        </div>
    </div>
                  ))
                }
              
    <div className='flex items-center '>
    {/* <button type='button' onClick={() => addQuestion()}  className="bg-[#7179C6] hover:bg-purple-500 text-white px-4 py-2 rounded items-center h-10">Add</button> */}
    <svg onClick={() => addQuestion()} className="cursor-pointer" width="45px" height="45px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.4" d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2Z" fill="#6d28d9"></path> <path d="M18 11.25H12.75V6C12.75 5.59 12.41 5.25 12 5.25C11.59 5.25 11.25 5.59 11.25 6V11.25H6C5.59 11.25 5.25 11.59 5.25 12C5.25 12.41 5.59 12.75 6 12.75H11.25V18C11.25 18.41 11.59 18.75 12 18.75C12.41 18.75 12.75 18.41 12.75 18V12.75H18C18.41 12.75 18.75 12.41 18.75 12C18.75 11.59 18.41 11.25 18 11.25Z" fill="#ffffff"></path> </g></svg>
    </div>
    </div>
              <div className="flex justify-between">
                <button type="button" onClick={() => handleCloseCreateQuizPopup()} className="bg-gray-300 hover:bg-gray-500 text-gray-800 px-4 py-2 rounded">Close</button>
                <button type="submit" className="bg-[#7179C6] hover:bg-purple-500 text-white px-4 py-2 rounded">Create</button>
              </div>
            </form>
          </div>
        </div>
        )
      }

{
  quizSubmissions?.length !== 0 && (
    <div className="fixed top-0 left-0 h-screen w-screen z-40 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded h-2.5/5 w-1.5/5">
        <h2 className="text-2xl text-[#7179C6] font-bold mb-4">Submissions</h2>
        <div className='flex flex-col h-2/5 space-y-4 mb-3 overflow-y-scroll scroll scrollbar-hide'>
        {quizSubmissions?.map((submission, index) => (
          <div key={index} className="flex justify-between items-center space-x-7">
            <div className='flex items-center'>
            <div className="flex items-center justify-center h-8 w-8 bg-gray-300 rounded-full overflow-hidden mr-2">
              <img src={submission?.student?.profilePicture} alt="Profile" className="h-full w-full object-cover" />
            </div>
            <h3 className="font-bold text-sm text-gray-700">
              {`${submission?.student?.firstName} ${submission?.student?.lastName}`}
            </h3>
            </div>
            <div className='flex justify-start'>
            <h3 className="font-bold text-sm text-gray-700">
              {"Marks: "}{submission?.marks}
            </h3>
            </div>
          </div>
        ))}
        </div>
        <div className='flex justify-end'>
        <button onClick={() => setQuizSubmissions([])} className="bg-gray-500 hover:bg-gray-600 items-center px-4 py-2 mt-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Close
        </button>
        </div>
      </div>
    </div>
  )
}

    </div>
  );
};

export default TeacherAssignmentsPage;
