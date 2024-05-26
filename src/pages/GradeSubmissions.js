import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { apiPrivate } from '../services/api';

const GradeSubmissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const location = useLocation();
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [grade, setGrade] = useState('');
    const [feedback, setFeedback] = useState('');


    const fetchSubmissions = async () => {
        try {
            const assignmentId = location.state.assignmentId;
            const response = await apiPrivate.get(`/assignment/getSubmissions/${assignmentId}`);
            setSubmissions(response.data.submissions);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchSubmissions();
    }, [location]);

    const handleGradeClick = (submission) => {
        setSelectedSubmission(submission);
        setGrade('');
        setFeedback('');
    };

    const handleSubmit = async () => {
        try {
            const assignmentId = location.state.assignmentId;
            const title = location.state.title;
            const total =location.state.total;
            const sessionId =location.state.sessionId;
            const subject =location.state.subject;


            const response = await apiPrivate.post(`/assignment/grade/${selectedSubmission._id}`, {
                assignmentId,
                title,
                grade,
                feedback,
                total,
                sessionId,
                subject
            });
            console.log(response.data.message);
            fetchSubmissions();

        setSelectedSubmission(null);
        setGrade('');
        setFeedback('');
        } catch (error) {
            console.error(error);
        }
    };

    const handleClose = () => {
        setSelectedSubmission(null);
        setGrade('');
        setFeedback('');
    };

    return (
        
        <div className="flex flex-col items-center h-screen bg-gradient-to-b">
            <div className="container mx-auto px-4">
                <div className='flex justify-between items-center mb-8'>
                    <h className="text-2xl text-[#7179C6] font-bold">
                        Submissions
                    </h>
                </div>
                <div className="grid grid-cols-5 gap-4">
                    {submissions.map(submission => (
                        <div key={submission?._id} className="w-1.5/5 h-4.5/5 bg-purple-100 p-4 rounded-lg shadow-lg mr-2 mb-2 mt-4 flex flex-col">
                            <h3 className="text-lg font-semibold mb-4">{submission?.studentName}</h3>
                            <p className='text-gray-700 text-sm font-bold'>Submission Files:</p>
                            <ul className='mb-3'>
                                {submission.files.map((file, index) => (
                                    <li key={index}>
                                        <a href={file?.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{file?.fileName}</a>
                                    </li>
                                ))}
                            </ul>
                            {submission?.grade !== -1 ? (
                                <p className="text-gray-700 text-sm font-bold mb-4">
                                    Grade: <span className='text-purple-800'>{submission?.grade} / {location.state?.total}</span>
                                </p>
                            ) : (
                                <p className="text-red-500 mt-2 mb-2">Not graded</p>
                            )}
                            <button onClick={() => handleGradeClick(submission)} className="text-white w-2/5 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-xs px-2 py-2.5 text-center me-2 mb-2">
                                Grade
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            {selectedSubmission && (
                <div className="fixed z-30 top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg w-1/2">
                        <h2 className="text-lg font-semibold mb-4">Grade Submission</h2>
                        <div className="mb-4">
                            <label htmlFor="grade" className="block text-sm font-medium text-gray-700">Grade:</label>
                            <input type="number" id="grade" value={grade} onChange={(e) => setGrade(e.target.value)} className="mt-1 p-2 block w-full rounded border-gray-300" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">Feedback:</label>
                            <textarea id="feedback" value={feedback} onChange={(e) => setFeedback(e.target.value)} className="mt-1 p-2 block w-full rounded border-gray-300" rows="4"></textarea>
                        </div>
                        <div className="flex justify-between">
                        <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                        <button onClick={handleClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GradeSubmissions;
