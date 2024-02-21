import React, { useState, useEffect } from 'react';
import { apiPrivate } from '../services/api';
import { useNavigate } from 'react-router-dom';


const TeacherSessionsPage = () => {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [isCreateSessionPopupOpen, setIsCreateSessionPopupOpen] = useState(false);
  const [isUpdateSessionPopupOpen, setIsUpdateSessionPopupOpen] = useState(false);
  const [createSessionFormData, setCreateSessionFormData] = useState({
    startTime: 'monday',
    endTime: 'mondayS',
    status: 'scheduled',
    subject: '',
    sessionPrice: '',
  });
  const [updateSessionFormData, setUpdateSessionFormData] = useState({
    startTime: '',
    endTime: '',
    status: '',
    paymentStatus: '',
    subject: '',
    sessionPrice: '',
  });
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const navigate = useNavigate();


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

    
  }, []);

  const handleShowStudents = (session) => {
    setSelectedSession(session);
  };

  const handleClosePopup = () => {
    setSelectedSession(null);
    setIsCreateSessionPopupOpen(false);
    setIsUpdateSessionPopupOpen(false);
  };

  const handleOpenCreateSessionPopup = () => {
    setIsCreateSessionPopupOpen(true);
  };

  const handleOpenUpdateSessionPopup = (session) => {
    setSelectedSessionId(session.sessionId);
    setUpdateSessionFormData({
      startTime: session.startTime,
      endTime: session.endTime,
      status: session.status,
      paymentStatus: session.paymentStatus,
      subject: session.subject,
      sessionPrice: session.sessionPrice,
    });
    setIsUpdateSessionPopupOpen(true);
  };

  const handleCreateSessionFormChange = (e) => {
    setCreateSessionFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdateSessionFormChange = (e) => {
    setUpdateSessionFormData((prevFormData) => ({
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

      setCreateSessionFormData({
        startTime: '',
        endTime: '',
        status: 'scheduled',
        subject: '',
        sessionPrice: '',
        day: 'monday', 
        hour: '00', 
        minute: '00', 
        endHour: '00', 
        endMinute: '00', 
      });
      // Refresh sessions after creating a new session
      const response = await apiPrivate.get('teacher/myStudents');
      setSessions(response.data.studentsData);

      // Close the popup after successful submission
      setIsCreateSessionPopupOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateSessionSubmit = async (e) => {
    e.preventDefault();

    try {
      await apiPrivate.put(`/sessions/updateSession/${selectedSessionId}`, updateSessionFormData);
      // Refresh sessions after updating the session
      const response = await apiPrivate.get('teacher/myStudents');
      setSessions(response.data.studentsData);

      // Close the popup after successful submission
      setIsUpdateSessionPopupOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTeacherClick = (studentId) => {
    console.log("id "+studentId)
    navigate('/teacher-home-page/StudentProfileSecondary', { state: { studentId, otherRole: "Student" } });
  };

  const handleAssignmentClick = (sessionId) => {
    console.log("id "+sessionId)
    navigate('/teacher-home-page/assignments', { state: { sessionId} });
  };


  return (
    <div className=" max-h-screen max-w-screen">
     {/* Main Content */}
<div className="p-8 flex  max-h-screen max-w-screen ">
  {/* Sessions Container */}
  <div className="bg-teal-100 rounded-lg outline outline-teal-500 flex-1 flex flex-col h-[500px] mb-20 max-w-screen mx-auto mt-[-50px] mb-[125px] ml-[-50px] p-6" style={{ overflow: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none" }}  >
    {/* Teacher Sessions */}
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">Teacher Sessions</h2>
      <button onClick={handleOpenCreateSessionPopup} className="inline-flex items-center px-4 py-2 mt-2  text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ">
        Create Session
      </button>
    </div>
    <div className="flex flex-wrap" style={{ paddingRight: "17px" }}>
      {/* Session Cards (Fetched Data) */}
      {sessions.map((session) => (
        <div key={session.sessionId} className="max-w-md bg-gray-100 p-6 rounded-lg shadow-lg mr-4 mb-4">
          <h3 className="text-xl font-semibold mb-2">
              
              <button
                className="text-black-500 hover:underline"
                onClick={() =>handleAssignmentClick(session.sessionId)}
              >
                {session.subject}
              </button>
            </h3>
          <p className="text-gray-700">Start Time: {session.startTime}</p>
          <p className="text-gray-700">End Time: {session.endTime}</p>
          <p className="text-gray-700">Payment Status: {session.paymentStatus}</p>
          <p className="text-gray-700">Status: {session.status}</p>
          <p className="text-gray-700">Price: ${session.sessionPrice}</p>
          <p className="text-gray-700">No. of Students: {session.students.length}</p>
          <div class="inline-flex rounded-md shadow-sm" role="group">
          <button onClick={() => handleShowStudents(session)} className="inline-flex items-center px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-500 rounded-s-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Show Students
          </button>
          <button onClick={() => handleOpenUpdateSessionPopup(session)} className="inline-flex items-center px-4 py-2 mt-4 text-sm font-medium text-white bg-green-500 rounded-e-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                  Update Session
                </button>
                </div>
        </div>
      ))}
    </div>
  </div>
</div>

      {/* Students Popup */}
      {selectedSession && (
        <div className="fixed top-0 left-0 h-screen w-screen bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded">
            <h2 className="text-2xl font-bold mb-4">Students in Session {selectedSession.subject}</h2>
            {selectedSession.students.map((student) => (
              <div key={student.studentId} className="mb-2">
                <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleTeacherClick(student.studentId)}
                  >
                {`${student.firstName} ${student.lastName}`}
                </button>
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
          <div className="bg-white p-8 mt-[100px] h-[430px] rounded">
            <h2 className="text-2xl font-bold mb-4">Create Session</h2>
            <form onSubmit={handleCreateSessionSubmit}>
              <div className="grid grid-cols-3 gap-4 mb-4">
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
      {/* Update Session Popup */}
      {isUpdateSessionPopupOpen && (
        <div className="fixed top-0 left-0 h-screen w-screen bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 mt-[100px] rounded">
            <h2 className="text-2xl font-bold mb-4">Update Session</h2>
            <form onSubmit={handleUpdateSessionSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-900">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={updateSessionFormData.subject}
                    onChange={handleUpdateSessionFormChange}
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
                    value={updateSessionFormData.sessionPrice}
                    onChange={handleUpdateSessionFormChange}
                    className="mt-1 p-2 w-full border rounded-md"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="mb-4">
                  <label htmlFor="startTime" className="block text-sm font-medium text-gray-900">
                    Start Time
                  </label>
                  <input
                    type="text"
                    id="startTime"
                    name="startTime"
                    value={updateSessionFormData.startTime}
                    onChange={handleUpdateSessionFormChange}
                    className="mt-1 p-2 w-full border rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="endTime" className="block text-sm font-medium text-gray-900">
                    End Time
                  </label>
                  <input
                    type="text"
                    id="endTime"
                    name="endTime"
                    value={updateSessionFormData.endTime}
                    onChange={handleUpdateSessionFormChange}
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
                  value={updateSessionFormData.status}
                  onChange={handleUpdateSessionFormChange}
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