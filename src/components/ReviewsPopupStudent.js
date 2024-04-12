import React, { useEffect, useState } from 'react'
import useAPIPrivate from "../hooks/useAPIPrivate";

const ReviewsPopupStudent = ({setReviewPopUp, reviewPopUpData}) => {

    const [reviewsSelected, setReviewsSelected] = useState(true);
    const [stars, setStars] = useState([false,false,false,false,false]);
    const [rating, setRating] = useState();
    const [description, setDescription] = useState("");
    const [reviews, setReviews] = useState([]);

    const apiPrivate = useAPIPrivate();

    const handleClickOutside = (event) => {
        if (event.target.classList.contains('bg-gray-900')) {
          setReviewPopUp(false);
        }
    };

    const updateStarAtIndex = (index) => {
        const updatedStars = [...stars];
        for (var i = 0; i <= 4; i++) {
            updatedStars[i] = false;
        }
        for (var i = 0; i <= index; i++) {
            updatedStars[i] = true;
        }
        setStars(updatedStars);
        setRating(index+1);
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiPrivate.post(`reviews/addReview/${reviewPopUpData.teacherId}/${reviewPopUpData.sessionId}`, 
            {rating: rating, comment: description, time: new Date(Date.now()).getHours() + ":" +
              new Date(Date.now()).getMinutes()
            }).then((res) => {
             if (res.status === 200) {
                setReviewPopUp(false);
             }
            })
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
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

    },[]);

  return (
    <div onClick={handleClickOutside} className="fixed z-40  flex top-0 left-0 justify-center items-center bg-opacity-50 bg-gray-900 w-screen h-screen">
    <div className='rounded p-5 bg-teal-100 overflow-hidden w-3/4 h-3/4'>
        <div className='flex pl-5 space-x-5'>
    <h1 onClick={() => setReviewsSelected(true)} className={`text-xl ${reviewsSelected ? 'text-teal-800' : 'text-gray-400' }  cursor-pointer font-bold`}>Reviews</h1>
    <h1 onClick={() => setReviewsSelected(false)} className={`text-xl ${!reviewsSelected ? 'text-teal-800' : 'text-gray-400' } cursor-pointer font-bold`}>Create Review</h1>
    </div>
    {
        reviewsSelected 
        ? (
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
        )
        : 
        (
                <form className='p-5' onSubmit={handleReviewSubmit}>
          <div class=" grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className='flex-col'>
          <label for="rating" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rating</label>
          <div id="rating" class="flex items-center  mb-5">
            {stars.map((star, index) => (
                <svg onClick={() => updateStarAtIndex(index)} class={`w-6 h-6 cursor-pointer ${star ? 'text-yellow-300' : 'text-gray-300'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>
            ))}
</div>
</div>
              <div class="sm:col-span-2">
                  <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} id="description" rows="8" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here"></textarea>
              </div>
          </div>
          <div className='flex justify-end p-3'>
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Submit
          </button>
          </div>
      </form>
        )
    }
    
    </div>
    
    </div>
  )
}

export default ReviewsPopupStudent