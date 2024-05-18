import React, { useState, useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytes,getDownloadURL } from 'firebase/storage';
import { apiPrivate } from '../services/api';
import app from '../services/firebase'



// Initialize Firebase Storage
const storage = getStorage(app);

const StudentResponsesPage = () => {
    const [assignment, setAssignment] = useState(null);
    const [files, setFiles] = useState([]); 
    const [fileUrls, setFileUrls] = useState([]); 
    const [fileNames, setFileNames] = useState([]); 
    const [isLoading, setIsLoading] = useState(false); 
  const [uploadSuccess, setUploadSuccess] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const assignmentId = location.state.assignmentId;
    const sessionId = location.state.sessionId;
    const subject = location.state.subject;

    
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
      // Send file URLs to backend
      const response = await apiPrivate.post(`/assignment/uploadFiles/${assignment._id}`, { files: uploadedFiles });

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

  const handleSubmissionClick = (assignmentId, total,title,sessionId,subject) => {
    console.log("id dad "+assignmentId,"id dad "+ total+"id sub"+sessionId,subject)
    navigate('/teacher-home-page/submissons', { state: { assignmentId,total,title,sessionId,subject} });
  };

  return (
    <div className="p-8">
      {assignment && (
        <div>
          <h2 className="text-3xl font-bold mb-4">{assignment?.title}</h2>
          <p className="text-lg">Start Time: <span className="ml-2">{assignment?.startTime}</span></p>
          <p className="text-lg">End Time: <span className="ml-4">{assignment?.endTime}</span></p>
          <p className="text-lg">Marks: <span className="ml-6">{assignment?.marks}</span></p>
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Description:</h3>
            <div className="bg-gray-100 p-4 rounded-lg">{assignment?.description}</div>
          </div>

          {/* Display uploaded files */}
          {assignment?.files?.length > 0 && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">Uploaded Files:</h3>
              <ul>
                {assignment?.files?.map((file, index) => (
                  <li key={index}>
                    <a href={file?.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{file?.fileName}</a>
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
                {fileNames?.map((fileName, index) => (
                  <li key={index}>{fileName}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Upload button and file input */}
          <div className="mt-4">
            <input type="file" multiple onChange={handleFileInputChange} id="fileInput" />
            <button onClick={handleUpload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 " disabled={isLoading}>
            {isLoading ? (
        <div className="flex items-center">
            <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
            </svg>
            Uploading...
        </div>
    ) : (
        'Upload Files'
    )}
            </button>
          </div>

          {/* Success message */}
          {uploadSuccess && (
            <div className="mt-4 text-green-500">Files uploaded successfully!</div>
          )}
        </div>
      )}


      <button 
      type="button" 
      onClick={() =>handleSubmissionClick(assignmentId,assignment?.marks,assignment?.title,sessionId,subject)} 
      class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-8 "
  
      >View Submissions</button>
      
    </div>
  );
};

export default StudentResponsesPage;