import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const QuizFeedbackPage = () => {

    const location = useLocation();
    const {quiz, submission} = location.state;

  return (
        <div className='flex-col items-center ' >
            <div className='flex itmes-center justify-center'>
                <h className='text-[25px] font-semibold mr-2'>
                    Your Score:
                </h>
                <p className='text-[25px] font-semibold '>
                    {submission?.marks}/{quiz?.marks}
                </p>
            </div>
                {
                    quiz?.questions.map((question, questionIndex) => (
                        <div className="max-w-lg my-8 p-2 w-fit bg-white" key={questionIndex}>
                            <div className='flex space-x-2'>
                                <div className='flex-col space-y-3 mb-3'>
                                    <h2 className="text-lg font-semibold mr-2">Question {questionIndex + 1}</h2>
                                    <p className="px-2 py-1 ">
                                        {question?.question}
                                    </p>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className="flex-col space-y-2">
                                    {question?.options.map((option, optionIndex) => (
                                        <div key={optionIndex} className={`flex items-center rounded-full ${submission?.answers[questionIndex] === question?.correctAns && String.fromCharCode(65 + optionIndex) === submission?.answers[questionIndex] && "bg-green-300"} ${submission?.answers[questionIndex] !== question?.correctAns && submission?.answers[questionIndex] === String.fromCharCode(65 + optionIndex) && "bg-red-300"} ${question?.correctAns === String.fromCharCode(65 + optionIndex) && "bg-green-300"}`}>
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
  )
}

export default QuizFeedbackPage