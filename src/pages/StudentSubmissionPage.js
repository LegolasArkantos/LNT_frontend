import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes,getDownloadURL } from 'firebase/storage';
import { apiPrivate } from '../services/api';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
  };

// Initialize Firebase App
initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage();

const StudentSubmissionPage = () => {
    const [assignment, setAssignment] = useState(null);
    
    const location = useLocation();

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
 

  useEffect(() => {
    fetchAssignmentDetails();
  }, [location]);

  

  

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

          {/* Display uploaded files */}
          {assignment.files.length > 0 && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">Uploaded Files:</h3>
              <ul>
                {assignment.files.map((file, index) => (
                  <li key={index}>
                    <a href={file.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{file.fileName}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default StudentSubmissionPage;