import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import useAPIPrivate from "../hooks/useAPIPrivate";

const QuizPage = () => {
    const location = useLocation();
    const [timer, setTimer] = useState(parseInt(location.state.selectedQuiz.time));
    const [quiz, setQuiz] = useState(location.state.selectedQuiz);
    const [answers, setAnswers] = useState([]);

    const apiPrivate = useAPIPrivate();
    const navigate = useNavigate();

    useEffect(() => {
        const timerDecrement = () => {
            setTimer(timer - 1);
        }

        const interval = setInterval(() => {
            timerDecrement();
        }, 1000);

        return () => clearInterval(interval);

    });

    // Function to handle option selection
    const handleOptionSelect = (questionIndex, optionIndex) => {
        setAnswers(prevAnswers => {
            const newAnswers = [...prevAnswers];
            newAnswers[questionIndex] = String.fromCharCode(65 + optionIndex).toUpperCase();
            return newAnswers;
        });
    };

    const handleSubmit = async () => {
        try{
            await apiPrivate.post(`quiz/submit/${quiz._id}`, {answers}).then((res) => {
                if (res.status === 200) {
                    navigate('/student-home-page/studentassignments', { state: { sessionId: location.state.sessionId } });
                }
            });
        }
        catch(error) {
            console.log(error)
        }
    }

    return (
        <div className='flex-col items-center justify-center'>
            <div className='flex w-full items-center justify-center'>
                <div className={`flex space-x-2 ${timer <= 30 ? 'bg-red-400' : 'bg-green-400'} p-3 rounded-full`}>
                    <h>Timer:</h>
                    <p>{timer}</p>
                    <p>seconds left</p>
                </div>
            </div>


            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  mb-10 space-x-12 gap-5' >
                {
                    quiz.questions.map((question, questionIndex) => (
                        <div className="max-w-lg my-8 p-2 w-fit bg-white" key={questionIndex}>
                            <div className='flex space-x-2'>
                                <div className='flex-col space-y-3 mb-3'>
                                    <h2 className="text-lg font-semibold mr-2">Question</h2>
                                    <p type="text" className="px-2 py-1 ">
                                        {question.question}
                                    </p>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className="flex-col space-y-2">
                                    {question.options.map((option, optionIndex) => (
                                        <div key={optionIndex} className="flex items-center">
                                            <input
                                                type='radio'
                                                checked={answers[questionIndex] === String.fromCharCode(65 + optionIndex)} // Check if this option is selected
                                                onChange={() => handleOptionSelect(questionIndex, optionIndex)} // Call handleOptionSelect on change
                                            />
                                            <h className="text-lg font-semibold ml-2 mr-2">{String.fromCharCode(65 + optionIndex)}.</h>
                                            <p className="rounded-md px-2 py-1 ">
                                                {option}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='flex justify-end'>
            <button onClick={() => handleSubmit()} type="button" class="text-white ml-5 bg-teal-500 hover:bg-teal-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none dark:focus:ring-blue-800">Submit</button>
            </div>
        </div>
    )
}

export default QuizPage;
