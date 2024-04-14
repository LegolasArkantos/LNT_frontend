import React from 'react'
import { useEffect, useState } from 'react';
import useAPIPrivate from "../hooks/useAPIPrivate";

const ReviewsPopupTeacher = ({setReviewPopUp, reviewPopUpData}) => {

    const [reviews, setReviews] = useState([]);

    const apiPrivate = useAPIPrivate();

    const handleClickOutside = (event) => {
        // Check if the clicked element is the outermost div
        if (event.target.classList.contains('bg-gray-900')) {
          // Close the popup by setting setReviewPopUp to false
          setReviewPopUp(false);
        }
    };

    useEffect(() => {
        if (!reviewPopUpData.profilePage) {
        const getReviewsBySession = async () => {
            try {
                await apiPrivate.get(`reviews/getTeacherReviewsbySession/${reviewPopUpData.teacherId}/${reviewPopUpData.sessionName}`)
                .then((res) => {
                    if (res.status === 200) {
                        console.log(res.data)
                        setReviews(res.data);
                    }
                })
            }
            catch (error) {
                console.log(error);
            }
        };

        getReviewsBySession();
    }
    else {
        const getReviews = async () => {
            try {
                await apiPrivate.get(`reviews/getTeacherReviews/${reviewPopUpData.teacherId}`)
                .then((res) => {
                    if (res.status === 200) {
                        setReviews(res.data);
                    }
                })
            }
            catch (error) {
                console.log(error);
            }
        }

        getReviews();
    }

    },[]);


  return (
    <div onClick={handleClickOutside} className="fixed z-40  flex top-0 left-0 justify-center items-center bg-opacity-50 bg-gray-900 w-screen h-screen">
    <div className='rounded p-5 bg-teal-100 overflow-hidden w-3/4 h-3/4'>
        <div className='flex justify-center'>
    <h1 className="text-2xl text-teal-800 font-bold">Reviews</h1>
    </div>
    <ul className='p-5 h-full space-y-5 overflow-y-scroll scrollbar-hide scroll'>
                {
                    reviews.length != 0 
                    ? reviews.map((review, index) => (
                        <li key={index}>
    <div class="flex items-center mb-4">
        <img class="w-10 h-10 me-4 rounded-full" src={review.student.profilePicture} alt=""/>
        <div class="font-medium dark:text-white">
            <p>{review.student.firstName} {review.student.lastName}</p>
        </div>
    </div>
    {
        reviewPopUpData.profilePage && (<h className="font-medium">{review.sessionName}</h>)
    }
    <div class="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
        <svg class={`w-4 h-4 ${review.rating >= 1 ? 'text-yellow-300' : 'text-gray-300'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
        <svg class={`w-4 h-4 ${review.rating >= 2 ? 'text-yellow-300' : 'text-gray-300'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
        <svg class={`w-4 h-4 ${review.rating >= 3 ? 'text-yellow-300' : 'text-gray-300'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
        <svg class={`w-4 h-4 ${review.rating >= 4 ? 'text-yellow-300' : 'text-gray-300'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
        <svg class={`w-4 h-4 ${review.rating >= 5 ? 'text-yellow-300' : 'text-gray-300'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
        
    </div>

    <p class="mb-2 text-gray-500 dark:text-gray-400">{review.comment}</p>
    <hr/>
        </li>
                    ))
                        
        
                    
                    : (
                        <div className="flex h-full items-center justify-center">
                            <p className="text-xl text-teal-800">
                                No Reviews
                            </p>
                        </div>
                    )
                }
        
    </ul>
    </div>
    
    </div>
  )
}

export default ReviewsPopupTeacher