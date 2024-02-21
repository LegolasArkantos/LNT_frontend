import React, { useState, useEffect } from 'react';
import { apiPrivate } from '../services/api';
import { useNavigate, useLocation } from 'react-router-dom';

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

  return (
    <div className="flex h-screen">
      <div className="p-8 flex flex-col h-full">
        <div className="bg-teal-100 rounded-lg outline outline-teal-500 flex-1 flex flex-col overflow-x-auto h-[700px] w-[1430px] mt-[-50px] mb-[125px] ml-[-50px] p-6" style={{ overflow: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Assignments</h2>
            <button onClick={handleOpenCreateAssignmentPopup} className="inline-flex items-center px-4 py-2 mt-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Create Assignment
            </button>
          </div>
          <div className="flex flex-col" style={{ paddingRight: '17px' }}>
            <div className="flex items-center bg-gray-200 p-4 rounded-lg shadow-lg mb-4">
              <div className="flex-grow font-bold">Name</div>
              <div className="font-bold mx-4">Start Time</div>
              <div className="font-bold mx-4">End Time</div>
              <div className="font-bold">Marks</div>
            </div>
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
      {isCreateAssignmentPopupOpen && (
        <div className="fixed top-0 left-0 h-screen w-screen bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded">
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
    </div>
  );
};

export default TeacherAssignmentsPage;
