import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";

const PersonalityTestInformation = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { email, password, firstName, lastName, role, educationalCredential, educationalLevel, profilePicture, aboutMe,teacherFiles} = location.state || {};
    
  return (
    <div className='w-screen h-screen'>
        <div className='w-full h-2/4 bg-[#7179C6] flex items-center justify-center'>
            <div className='flex-col'>
            <h className='font-bold text-4xl text-white'>
            Personality Test
            </h>
            <p className='font-semibold text-white'>
            Welcome, User! Take the test to help us match you with compatible {role === "Student" ? "Teachers" : "Students"}.
            </p>
            </div>
        </div>
        <div className='w-full h-2/4 bg-white'>
        <div className='flex fixed w-full z-40 bottom-10 pl-10 pr-10 justify-end'>
        {/* <button
            type="button"
            className="text-white bg-[#7179C6] hover:bg-purple-500 focus:ring-4 focus:outline-none focus:ring-purple-500 font-medium rounded-lg text-sm w-sm px-5 py-2.5 text-center"
          >
            previous
          </button> */}
          <button
            type="button"
            className="text-white bg-[#7179C6]  cursor-pointer hover:bg-purple-500 focus:ring-4 focus:outline-none focus:ring-purple-500 font-medium rounded-lg text-sm w-sm px-5 py-2.5 text-center"
            onClick={
                () => {
                    navigate("/signup3", {
                        state: {
                          email,
                          password,
                          firstName,
                          lastName,
                          role,
                          educationalCredential,
                          educationalLevel,
                          profilePicture: profilePicture,
                          aboutMe,
                          teacherFiles,
                          
                        },
                      });
                }
            }
          >
            Next
          </button>
        </div>
        </div>

        <div className='absolute top-0 left-0 z-30 flex space-x-10  w-full h-full items-center justify-center'>
        <div className='mt-12 w-1/5 h-[200px] p-3 flex bg-gray-100 items-center justify-center'>
            <div>
            <div className='flex mb-2 items-center justify-center'>
            <svg fill="#38E1CD" width="50px" height="50px" viewBox="0 0 32 32" data-name="Layer 7" id="Layer_7" xmlns="http://www.w3.org/2000/svg" stroke="#38E1CD"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title></title><path d="M19.83,14.29a11.17,11.17,0,0,0,5.48-9.73A1.24,1.24,0,0,0,26.5,3.33V2.74A1.24,1.24,0,0,0,25.26,1.5H6.74A1.24,1.24,0,0,0,5.5,2.74V3.33A1.23,1.23,0,0,0,6.65,4.55c0.08,4.25,2.25,8.08,5.58,9.79A1.84,1.84,0,0,1,13.17,16v0.19a1.81,1.81,0,0,1-1,1.59,11.08,11.08,0,0,0-5.51,9.69A1.23,1.23,0,0,0,5.5,28.67v0.59A1.24,1.24,0,0,0,6.74,30.5H25.26a1.24,1.24,0,0,0,1.24-1.24V28.67a1.24,1.24,0,0,0-1.19-1.23,11.1,11.1,0,0,0-5.47-9.66,1.81,1.81,0,0,1-1-1.58V15.87A1.81,1.81,0,0,1,19.83,14.29ZM6.5,3.33V2.74A0.24,0.24,0,0,1,6.74,2.5H25.26a0.24,0.24,0,0,1,.24.24V3.33a0.24,0.24,0,0,1-.24.24H6.74A0.24,0.24,0,0,1,6.5,3.33Zm19,25.34v0.59a0.24,0.24,0,0,1-.24.24H6.74a0.24,0.24,0,0,1-.24-0.24V28.67a0.24,0.24,0,0,1,.24-0.24H25.26A0.24,0.24,0,0,1,25.5,28.67Zm-6.13-10a10.09,10.09,0,0,1,5,8.77H7.64a10.08,10.08,0,0,1,5-8.78,2.81,2.81,0,0,0,1.55-2.47V16a2.81,2.81,0,0,0-1.49-2.53,10.12,10.12,0,0,1-5-8.88H24.32a10.17,10.17,0,0,1-5,8.84,2.81,2.81,0,0,0-1.53,2.46V16.2A2.81,2.81,0,0,0,19.37,18.66Z"></path></g></svg>
            </div>
            <p className=''>
                It takes very little of your time,
            </p>
            <div className='items-center p-1 justify-center flex'> 
            <p>
            so easy.
            </p>
            </div>
            </div>
        </div>
        <div className='mt-12 w-1/5 h-[200px] flex bg-gray-100 items-center justify-center'>
            <div>
            <div className='flex justify-center mb-2 items-center'>
            <svg fill="#38E1CD" width="50px" height="50px" viewBox="0 -2.47 54.012 54.012" xmlns="http://www.w3.org/2000/svg" stroke="#38E1CD"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="chatting_writing" data-name="chatting writing" d="M178.158,399.582a1.234,1.234,0,0,0,.059.4,1.082,1.082,0,0,0,.378-.17l14.946-9.61H178.158Zm44.912-48.665H172.029a1.492,1.492,0,0,0-1.485,1.486v33.991a1.494,1.494,0,0,0,1.485,1.485h51.042a1.494,1.494,0,0,0,1.485-1.486V352.4A1.493,1.493,0,0,0,223.07,350.917Zm-37.605,22.366h0a4.035,4.035,0,1,1,4.034-4.036A4.041,4.041,0,0,1,185.463,373.283Zm12.112,0h0a4.034,4.034,0,1,1,4.036-4.032A4.037,4.037,0,0,1,197.574,373.281Zm12.084,0h0a4.035,4.035,0,1,1,4.037-4.036A4.041,4.041,0,0,1,209.659,373.283Z" transform="translate(-170.544 -350.917)"></path> </g></svg>
            </div>
            <div>
            <p className='pl-1 pr-1'>
            Please be honest in your answer. 
            </p>
            <div className='items-center p-1 justify-center flex'> 
            <p>
            Even if you don't like...
            </p>
            </div>
            </div>
            </div>
        </div>
        <div className='mt-12 w-1/5 h-[200px] p-1 flex bg-gray-100 items-center justify-center'>
            <div>
            <div className='flex justify-center mb-2 items-center'>
            <svg width="50px" height="50px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#38E1CD" stroke="#38E1CD"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><g id="balance"> <path class="cls-1" d="M1.46,12.94H8.17a0,0,0,0,1,0,0v.73a3.11,3.11,0,0,1-3.11,3.11h-.5a3.11,3.11,0,0,1-3.11-3.11v-.73A0,0,0,0,1,1.46,12.94Z"></path> <path class="cls-2" d="M.5,5.27H5.92a3.18,3.18,0,0,0,2.29-1h0a3.24,3.24,0,0,1,2.29-1h3a3.27,3.27,0,0,1,2.31,1h0a3.27,3.27,0,0,0,2.32,1H23.5"></path> <line class="cls-2" x1="12" y1="0.48" x2="12" y2="22.52"></line> <line class="cls-2" x1="17.75" y1="22.52" x2="6.25" y2="22.52"></line> <polygon class="cls-1" points="5.29 5.27 4.33 5.27 1.46 11.98 1.46 12.94 8.17 12.94 8.17 11.98 5.29 5.27"></polygon> <path class="cls-1" d="M15.83,12.94h6.71a0,0,0,0,1,0,0v.73a3.11,3.11,0,0,1-3.11,3.11h-.5a3.11,3.11,0,0,1-3.11-3.11v-.73a0,0,0,0,1,0,0Z"></path> <polygon class="cls-1" points="19.67 5.27 18.71 5.27 15.83 11.98 15.83 12.94 22.54 12.94 22.54 11.98 19.67 5.27"></polygon> </g> </g></svg>
            </div>
            <div>
            <p className=''>
            Try not to leave a “neutral”
            </p>
            <div className='items-center p-1 justify-center flex'> 
            <p>
            response.
            </p>
            </div>
            </div>
            </div>
        </div>

        </div>
    </div>
  )
}

export default PersonalityTestInformation