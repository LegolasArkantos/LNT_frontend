import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAPIPrivate from "../hooks/useAPIPrivate";

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
  const location = useLocation();
  const navigate = useNavigate();
  const apiPrivate = useAPIPrivate();

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

    fetchQuizes();

    fetchAssignments();
  }, [location]);

  const handleOpenCreateAssignmentPopup = () => {
    setIsCreateAssignmentPopupOpen(true);
  };

  const handleCloseCreateAssignmentPopup = () => {
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
      // Refetch assignments after creating a new assignment
      const response = await apiPrivate.get(`/assignment/getSessionAssignments/${sessionId}`);
      setAssignments(response.data.assignments);
      // Close the popup after successful submission
      setIsCreateAssignmentPopupOpen(false);
      // Clear the form data
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

  const handleAssignmentClick = (assignmentId) => {
    console.log("id "+assignmentId)
    navigate('/teacher-home-page/responses', { state: { assignmentId} });
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
      options: [{ optionText: '' }, { optionText: '' }, { optionText: '' }, { optionText: '' }],
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
      question.options.some(option => option.optionText?.trim() === '') ||
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
  


  return (
    <div className="max-w-screen">
      <div className="p-8 flex flex-col max-w-screen h-full">
        <div className="bg-teal-100 rounded-lg outline outline-teal-500 flex-1 flex flex-col  h-[900px] max-w-screen mt-[-50px] mb-[125px] p-6" style={{ overflow: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Assignments</h2>
            <button onClick={handleOpenCreateAssignmentPopup} className="inline-flex items-center px-4 py-2 mt-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Create Assignment
            </button>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center bg-gray-200 p-4 rounded-lg shadow-lg mb-4">
              <div className="flex-grow font-bold">Name</div>
              <div className="font-bold mx-4">Start Time</div>
              <div className="font-bold mx-4">End Time</div>
              <div className="font-bold">Marks</div>
            </div>
            <div className='overflow-y-scroll scroll scrollbar-hide'>
            {assignments.map((assignment) => (
              <div key={assignment._id} className="flex items-center bg-gray-100 p-4 rounded-lg shadow-lg mb-4">
                <h3 className="text-xl font-semibold mb-2">
              
              <button
                className="text-black-500 hover:underline"
                onClick={() =>handleAssignmentClick(assignment._id)}
              >
                {assignment.title}
              </button>
            </h3>
            <div className="flex-grow"></div>
                <div className="mx-4">{assignment.startTime}</div>
                <div className="mx-4">{assignment.endTime}</div>
                <div>{assignment.marks}</div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
      {isCreateAssignmentPopupOpen && (
        <div className="fixed top-0 left-0 h-screen w-screen z-20 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded">
            <h2 className="text-2xl font-bold mb-4">Create Assignment</h2>
            <form onSubmit={handleCreateAssignmentSubmit}>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
              <div className="flex flex-col mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-900">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={createAssignmentFormData.title}
                  onChange={handleCreateAssignmentFormChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-900">Start Time</label>
                <input
                  type="text"
                  id="startTime"
                  name="startTime"
                  value={createAssignmentFormData.startTime}
                  onChange={handleCreateAssignmentFormChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-900">End Time</label>
                <input
                  type="text"
                  id="endTime"
                  name="endTime"
                  value={createAssignmentFormData.endTime}
                  onChange={handleCreateAssignmentFormChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-900">Description</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={createAssignmentFormData.description}
                  onChange={handleCreateAssignmentFormChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="marks" className="block text-sm font-medium text-gray-900">Marks</label>
                <input
                  type="text"
                  id="marks"
                  name="marks"
                  value={createAssignmentFormData.marks}
                  onChange={handleCreateAssignmentFormChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded mr-auto">Submit</button>
                <button type="button" onClick={handleCloseCreateAssignmentPopup} className="bg-gray-300 hover:bg-gray-500 text-gray-800 px-4 py-2 rounded">Close</button>
              </div>
            </form>
          </div>
        </div>
      )}

<div className="pl-8 pr-8 flex flex-col max-w-screen h-full">
        <div className="bg-teal-100 rounded-lg outline outline-teal-500 flex-1 flex flex-col  h-[900px] max-w-screen mt-[-50px] mb-[125px] p-6" style={{ overflow: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Quizes</h2>
            <button onClick={() => {
              setCreateQuiz(true)
            }} className="inline-flex items-center px-4 py-2 mt-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Create Quiz
            </button>
          </div>
          <div className="flex flex-col" >
            <div className="flex items-center bg-gray-200 p-4 rounded-lg shadow-lg mb-4">
              <div className="flex-grow font-bold">Title</div>
              <div className="font-bold mx-4">Time</div>
              <div className="font-bold">Marks</div>
            </div>
            <div className='overflow-y-scroll scroll scrollbar-hide'>
            {quizes.map((quiz) => (
              <div key={quiz._id} className="flex items-center bg-gray-100 p-4 rounded-lg shadow-lg mb-4">
                <h3 className="text-xl font-semibold mb-2">
              
              <button
                className="text-black-500 hover:underline"
                //onClick={() =>handleAssignmentClick(assignment._id)}
              >
                {quiz.title}
              </button>
            </h3>
            <div className="flex-grow"></div>
                <div className="mx-4">{quiz.time}</div>
                <div>{quiz.marks}</div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>

      {
        createQuiz && (
          <div className="fixed top-0 left-0 z-20 h-screen w-screen bg-gray-800 bg-opacity-50 flex items-center justify-center">
          
          <div className="bg-white p-5 rounded">
            <h2 className="text-2xl font-bold mb-2">Create Quiz</h2>
            <form onSubmit={(e) => handleCreateQuizFormSubmit(e)}>
              <div className='flex space-x-3'>
              <div className="flex flex-col ">
                <label htmlFor="title" className="block text-sm font-medium text-gray-900">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={createQuizFormData.title}
                  onChange={handleCreateQuizFormChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="time" className="block text-sm font-medium text-gray-900">Time</label>
                <input
                  type="number"
                  placeholder='Minutes'
                  id="time"
                  name="time"
                  value={createQuizFormData.time}
                  onChange={handleCreateQuizFormChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="marks" className="block text-sm font-medium text-gray-900">Marks</label>
                <input
                  type="text"
                  id="marks"
                  name="marks"
                  value={createQuizFormData.marks}
                  onChange={handleCreateQuizFormChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              </div>
              <div className='overflow-x-scroll scroll scrollbar-hide flex p-2 space-x-8 w-[700px]' >
                {
                  createQuizFormData.questions.map((question,index) => (
                    <div className="max-w-lg my-8 p-2 bg-white shadow-md outline rounded-md">
                      <div className='flex space-x-2'>
                <div className='flex-col space-y-3 mb-3'>
                  <h2 className="text-lg font-semibold mr-2">Question</h2>
                  <input type="text" value={question.question} onChange={(e) => handleQuestionChange(index, 'question', e.target.value)} className="border rounded-md px-2 py-1 focus:outline-none" />
                </div>
                </div>
                <div className='flex'>
      <div className="flex-col space-y-2">
      {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center">
                <label className="text-lg font-semibold mr-2">{String.fromCharCode(65 + optionIndex)}.</label>
                <input
                  type="text"
                  value={option.optionText}
                  onChange={e => handleQuestionChange(index, 'options', { index: optionIndex, optionText: e.target.value })}
                  className="border rounded-md px-2 py-1 focus:outline-none"
                />
              </div>
            ))}
      </div>
      <div className='flex-col ml-4'>
           <h2 className="text-lg font-semibold mr-2">Answer</h2>
           <input type="text" value={question.correctAns.toUpperCase()} maxLength={1} placeholder='A' onChange={(e) => handleQuestionChange(index, 'correctAns', e.target.value.toUpperCase())} className="border rounded-md w-7 ml-4 px-2 py-1 focus:outline-none" />
        </div>
        </div>
    </div>
                  ))
                }
              
    <div className='flex items-center ml-3'>
    <button type='button' onClick={() => addQuestion()}  className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded items-center h-10">Add</button>
    </div>
    </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded mr-auto">Submit</button>
                <button type="button" onClick={() => handleCloseCreateQuizPopup()} className="bg-gray-300 hover:bg-gray-500 text-gray-800 px-4 py-2 rounded">Close</button>
              </div>
            </form>
          </div>
        </div>
        )
      }
    </div>
  );
};

export default TeacherAssignmentsPage;
