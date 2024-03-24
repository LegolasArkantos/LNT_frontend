import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

const QuizPage = () => {
    const location = useLocation();
    const [timer, setTimer] = useState(parseInt(location.state.selectedQuiz.time));
    const [quiz, setQuiz] = useState(location.state.selectedQuiz);
    const [answers, setAnswers] = useState(Array(quiz.questions.length).fill('')); // Initialize answers array

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

    return (
        <div className='flex-col items-center justify-center'>
            <div className='flex items-center justify-center'>
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
        </div>
    )
}

export default QuizPage;
