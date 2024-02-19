import React, { useState, useEffect } from 'react';
import { apiPrivate } from '../services/api';
import { useLocation } from 'react-router-dom';

const StudentResponsesPage = () => {
    const [assignment, setAssignment] = useState(null);
    const [file, setFile] = useState(null); // State to hold the uploaded file
    const location = useLocation();
  
    useEffect(() => {
      const fetchAssignmentDetails = async () => {
        try {
          const assignmentId = location.state.assignmentId;
          console.log('Assignment ID:', assignmentId);
          const response = await apiPrivate.get(`/assignment/getAssignment/${assignmentId}`);
          setAssignment(response.data.assignment);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchAssignmentDetails();
    }, [location]);

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
    };

    const handleUpload = async () => {
        try {
            if (!file) {
                console.error('No file selected');
                return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                // Send the base64-encoded file data to the backend
                uploadFile(reader.result);
            };
        } catch (error) {
            console.error(error);
        }
    };

    const uploadFile = async (base64Data) => {
        try {
            // Send a request to the backend with the base64-encoded file data
            const response = await apiPrivate.post(`/assignment/uploadFile/${assignment._id}`, { file: base64Data });
            // Update the assignment state with the updated assignment data
            setAssignment(response.data.assignment);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-8">
            {assignment && (
                <div>
                    <h2 className="text-3xl font-bold mb-4">{assignment.title}</h2>
                    <p className="text-lg">Start Time: <span className="ml-2">{assignment.startTime}</span></p>
                    <p className="text-lg">End Time: <span className="ml-4">{assignment.endTime}</span></p>
                    <p className="text-lg">Marks: <span className="ml-6">{assignment.marks}</span></p>
                    <div className="mt-4">
                        <h3 className="text-xl font-semibold mb-2">Description:</h3>
                        <div className="bg-gray-100 p-4 rounded-lg">{assignment.description}</div>
                    </div>

                    {/* Upload button and file input */}
                    <div className="mt-4">
                        <input type="file" onChange={handleFileInputChange} />
                        <button onClick={handleUpload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">Upload File</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentResponsesPage;
