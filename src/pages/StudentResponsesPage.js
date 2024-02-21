import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getStorage, ref, uploadBytes,getDownloadURL } from 'firebase/storage';
import { apiPrivate } from '../services/api';
import app from '../services/firebase'



// Initialize Firebase Storage
const storage = getStorage(app);

const StudentResponsesPage = () => {
    const [assignment, setAssignment] = useState(null);
    const [files, setFiles] = useState([]); // State to hold the uploaded files
    const [fileUrls, setFileUrls] = useState([]); // State to hold the download URLs of the uploaded files
    const [fileNames, setFileNames] = useState([]); // State to hold the names of selected files
    const [isLoading, setIsLoading] = useState(false); // State to control loading animation
  const [uploadSuccess, setUploadSuccess] = useState(false);
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

  const handleFileInputChange = (event) => {
    const fileList = event.target.files;
    setFiles(fileList);

    const names = Array.from(fileList).map(file => file.name);
    setFileNames(names);
  };

  const handleUpload = async () => {
    try {
      if (files.length === 0) {
        console.error('No files selected');
        return;
      }
      setIsLoading(true); // Start loading animation

      const uploadPromises = Array.from(files).map(async (file) => {
        const storageRef = ref(storage, file.name);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        return { fileName: file.name, fileUrl: downloadURL };
      });
    
      const uploadedFiles = await Promise.all(uploadPromises);
      setFileUrls(uploadedFiles);
      console.log('File uploaded:', uploadedFiles);
      // Send file URLs to backend
      const response = await apiPrivate.post(`/assignment/uploadFiles/${assignment._id}`, { files: uploadedFiles });
      console.log('File upload response:', response.data);

      fetchAssignmentDetails();

      

      setIsLoading(false); // Stop loading animation
      setUploadSuccess(true); // Set upload success to true
      setFiles([]); // Clear selected files
      setFileNames([]); // Clear selected file names
      setTimeout(() => {
        setUploadSuccess(false); // Reset upload success after 3 seconds
      }, 3000);

      document.getElementById('fileInput').value = '';

    } catch (error) {
      console.error(error);
      setIsLoading(false);
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

          {/* Display selected file names */}
          {fileNames && fileNames.length > 0 && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">Selected Files:</h3>
              <ul>
                {fileNames.map((fileName, index) => (
                  <li key={index}>{fileName}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Upload button and file input */}
          <div className="mt-4">
            <input type="file" multiple onChange={handleFileInputChange} id="fileInput" />
            <button onClick={handleUpload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 " disabled={isLoading}>
              {isLoading ? 'Uploading...' : 'Upload Files'}
            </button>
          </div>

          {/* Success message */}
          {uploadSuccess && (
            <div className="mt-4 text-green-500">Files uploaded successfully!</div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentResponsesPage;