import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAPIPrivate from '../hooks/useAPIPrivate';

const QuizPage = () => {
    const location = useLocation();
    const [timer, setTimer] = useState(parseInt(location.state.selectedQuiz.time * 60));
    const [quiz, setQuiz] = useState(location.state.selectedQuiz);
    const [answers, setAnswers] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const apiPrivate = useAPIPrivate();
    const navigate = useNavigate();

    const currentQuestion = quiz.questions[currentQuestionIndex];

    useEffect(() => {
        const timerDecrement = () => {
            if (timer !== 0) {
                setTimer(timer - 1);
            }
        };

        const interval = setInterval(() => {
            timerDecrement();
        }, 1000);

        if (timer === 0) {
            handleSubmit();
        }

        return () => clearInterval(interval);
    });

    const formatTime = () => {
        let minutes = Math.floor(timer / 60);
        let seconds = Math.floor(timer - minutes * 60);

        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        return minutes + ':' + seconds;
    };

    const handleOptionSelect = (optionIndex) => {
        setAnswers((prevAnswers) => {
            const newAnswers = [...prevAnswers];
            newAnswers[currentQuestionIndex] = String.fromCharCode(65 + optionIndex).toUpperCase();
            return newAnswers;
        });
    };

    const handleNext = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    };

    const handlePrevious = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    };

    const handleSubmit = async () => {
        try {
            await apiPrivate.post(`quiz/submit/${quiz._id}`, { answers }).then((res) => {
                if (res.status === 200) {
                    navigate('/student-home-page/sessions/assignments-and-quizes', { state: { sessionId: location.state.sessionId } });
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    

    return (
        <div className='flex-col items-center justify-center'>
            <div className='flex w-full items-center justify-center'>
                <div className={`flex space-x-2 ${timer <= 30 ? 'bg-red-400' : 'bg-green-400'} p-3 rounded-full`}>
                    <h>Timer:</h>
                    <p>{formatTime()}</p>
                </div>
            </div>
            
            <div className='flex items-center justify-center'>
                <div className='max-w-lg my-8 p-2 bg-white'>
                    <div className='flex space-x-2'>
                        <div className='flex-col space-y-3 mb-3'>
                            <h2 className='text-lg font-semibold mr-2'>Question {currentQuestionIndex + 1}</h2>
                            <p className='px-2 py-1'>{currentQuestion?.question}</p>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='flex-col space-y-2'>
                            {currentQuestion?.options.map((option, optionIndex) => (
                                <div key={optionIndex} className='flex items-center'>
                                    <input
                                        type='radio'
                                        checked={answers[currentQuestionIndex] === String.fromCharCode(65 + optionIndex)}
                                        onChange={() => handleOptionSelect(optionIndex)}
                                    />
                                    <h className='text-lg font-semibold ml-2 mr-2'>{String.fromCharCode(65 + optionIndex)}.</h>
                                    <p className='rounded-md px-2 py-1'>{option}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex justify-between'>
                <button
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    className='text-white ml-5 bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none dark:focus:ring-blue-800'
                >
                    Previous
                </button>
                {currentQuestionIndex < quiz?.questions.length - 1 ? (
                    <button
                        onClick={handleNext}
                        className='text-white ml-5 bg-teal-500 hover:bg-teal-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none dark:focus:ring-blue-800'
                    >
                        Next
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        className='text-white ml-5 bg-teal-500 hover:bg-teal-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none dark:focus:ring-blue-800'
                    >
                        Submit
                    </button>
                )}
            </div>
        </div>
    );
};

export default QuizPage;
