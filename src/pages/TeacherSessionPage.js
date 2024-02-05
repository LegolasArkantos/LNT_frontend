import React, { useState, useEffect } from 'react';
import { apiPrivate } from '../services/api';

const TeacherSessionsPage = () => {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [isCreateSessionPopupOpen, setIsCreateSessionPopupOpen] = useState(false);
  const [createSessionFormData, setCreateSessionFormData] = useState({
    startTime: '',
    endTime: '',
    status: 'scheduled',
    subject: '',
    sessionPrice: '',
  });

  

  useEffect(() => {
    const getSessions = async () => {
      try {
        const response = await apiPrivate.get('teacher/myStudents');
        setSessions(response.data.studentsData);
      } catch (error) {
        console.error(error);
      }
    };

    getSessions();

    // Disable scrolling on mount
    document.body.style.overflow = 'hidden';

    // Enable scrolling on unmount (cleanup)
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleShowStudents = (session) => {
    setSelectedSession(session);
  };

  const handleClosePopup = () => {
    setSelectedSession(null);
    setIsCreateSessionPopupOpen(false);
  };

  const handleOpenCreateSessionPopup = () => {
    setIsCreateSessionPopupOpen(true);
  };

  const handleCreateSessionFormChange = (e) => {
    setCreateSessionFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateSessionSubmit = async (e) => {
    e.preventDefault();

    // Combine day, hour, and minute for startTime and endTime
    const startTime = `${createSessionFormData.day} ${createSessionFormData.hour}:${createSessionFormData.minute}`;
    const endTime = `${createSessionFormData.day} ${createSessionFormData.endHour}:${createSessionFormData.endMinute}`;

    try {
      await apiPrivate.post('/sessions/create', { ...createSessionFormData, startTime, endTime });
      // Refresh sessions after creating a new session
      const response = await apiPrivate.get('teacher/myStudents');
      setSessions(response.data.studentsData);

      // Close the popup after successful submission
      setIsCreateSessionPopupOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="p-8 flex space-x-8 h-full">
        {/* Sessions Container */}
        <div className="rounded bg-white p-8 flex-1 h-screen-1/2 overflow-y-auto mt-[-100px] mb-[100px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Teacher Sessions</h2>
            <button onClick={handleOpenCreateSessionPopup} className="text-blue-500 underline">
              Create Session
            </button>
          </div>

          {/* Session Cards (Fetched Data) */}
          {sessions.map((session) => (
            <div key={session.sessionId} className="bg-gray-100 p-4 rounded mb-4 w-96 h-60 ">
              <h3 className="text-lg font-semibold mb-2">{session.subject}</h3>
              <p>Start Time: {session.startTime}</p>
              <p>End Time: {session.endTime}</p>
              <p>Payment Status: {session.paymentStatus}</p>
              <p>Status: {session.status}</p>
              <p>Price: ${session.sessionPrice}</p>
              <p>No. of Students: {session.students.length}</p>
              <button onClick={() => handleShowStudents(session)} className="text-blue-500 mt-2 underline">
                Show Students
              </button>
              
          </div>
        ))}
      </div>

        {/* Assignments Container */}
        <div className="rounded bg-white p-8 flex-1 h-screen-1/2 overflow-y-auto mt-[-100px] mb-[100px]">
          <h2 className="text-2xl font-bold mb-4">Assignments</h2>

          {/* Assignment Cards (Dummy Data) */}
          {Array.from({ length: 20 }).map((_, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded mb-4 w-96 h-48 ">
              <h3 className="text-lg font-semibold mb-2">Assignment {index + 1}</h3>
              <p>Subject: Science</p>
              <p>Time: Due in 3 days</p>
            </div>
          ))}
        </div>
      </div>

      {/* Students Popup */}
      {selectedSession && (
        <div className="fixed top-0 left-0 h-screen w-screen bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded">
            <h2 className="text-2xl font-bold mb-4">Students in Session {selectedSession.subject}</h2>
            {selectedSession.students.map((student) => (
              <div key={student.studentId} className="mb-2">
                {`${student.firstName} ${student.lastName}`}
              </div>
            ))}
            <button onClick={handleClosePopup} className="text-blue-500 mt-4 underline">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Create Session Popup */}
      {isCreateSessionPopupOpen && (
        <div className="fixed top-0 left-0 h-screen w-screen bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded">
            <h2 className="text-2xl font-bold mb-4">Create Session</h2>
            <form onSubmit={handleCreateSessionSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-900">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={createSessionFormData.subject}
                    onChange={handleCreateSessionFormChange}
                    className="mt-1 p-2 w-full border rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="sessionPrice" className="block text-sm font-medium text-gray-900">
                    Session Price
                  </label>
                  <input
                    type="text"
                    id="sessionPrice"
                    name="sessionPrice"
                    value={createSessionFormData.sessionPrice}
                    onChange={handleCreateSessionFormChange}
                    className="mt-1 p-2 w-full border rounded-md"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="mb-4">
                  <label htmlFor="day" className="block text-sm font-medium text-gray-900">
                    Day
                  </label>
                  <select
                    id="day"
                    name="day"
                    value={createSessionFormData.day}
                    onChange={handleCreateSessionFormChange}
                    className="mt-1 p-2 w-full border rounded-md"
                    required
                  >
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                    <option value="saturday">Saturday</option>
                    <option value="sunday">Sunday</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="hour" className="block text-sm font-medium text-gray-900">
                   Start Hour
                  </label>
                  <input
                    type="number"
                    id="hour"
                    name="hour"
                    value={createSessionFormData.hour}
                    onChange={handleCreateSessionFormChange}
                    min="0"
                    max="24"
                    className="mt-1 p-2 w-full border rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="minute" className="block text-sm font-medium text-gray-900">
                     Start Minute
                  </label>
                  <input
                    type="number"
                    id="minute"
                    name="minute"
                    value={createSessionFormData.minute}
                    onChange={handleCreateSessionFormChange}
                    min="0"
                    max="59"
                    className="mt-1 p-2 w-full border rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="endHour" className="block text-sm font-medium text-gray-900">
                    End Hour
                  </label>
                  <input
                    type="number"
                    id="endHour"
                    name="endHour"
                    value={createSessionFormData.endHour}
                    onChange={handleCreateSessionFormChange}
                    min="0"
                    max="24"
                    className="mt-1 p-2 w-full border rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="endMinute" className="block text-sm font-medium text-gray-900">
                    End Minute
                  </label>
                  <input
                    type="number"
                    id="endMinute"
                    name="endMinute"
                    value={createSessionFormData.endMinute}
                    onChange={handleCreateSessionFormChange}
                    min="0"
                    max="59"
                    className="mt-1 p-2 w-full border rounded-md"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="status" className="block text-sm font-medium text-gray-900">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={createSessionFormData.status}
                  onChange={handleCreateSessionFormChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="canceled">Canceled</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-auto">
                  Submit
                </button>
                <button type="button" onClick={handleClosePopup} className="bg-gray-300 text-gray-800 px-4 py-2 rounded">
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherSessionsPage;