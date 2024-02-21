import React, { useState, useEffect } from 'react';
import { apiPrivate } from '../services/api';
import { useLocation,useNavigate } from 'react-router-dom';

const StudentAssignmentsPage = () => {
  const [assignments, setAssignments] = useState([]);
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

  const handleAssignmentClick = (assignmentId) => {
    console.log("id "+assignmentId)
    navigate('/student-home-page/submission', { state: { assignmentId} });
  };

  return (
    <div className=" max-w-screen ">
      <div className="p-8 flex flex-col max-w-screen h-full">
        <div className="bg-teal-100 rounded-lg outline outline-teal-500 flex-1 flex flex-col  h-[900px] max-w-screen mt-[-50px] mb-[125px] p-6" style={{ overflow: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className=" justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Assignments</h2>
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
                <div className="mx-4">{assignment.startTime}</div>
                <div className="mx-4">{assignment.endTime}</div>
                <div>{assignment.marks}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAssignmentsPage;
