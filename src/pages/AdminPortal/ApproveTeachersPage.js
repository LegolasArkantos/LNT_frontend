import React from 'react'
import { useState, useEffect } from 'react'
import useApiPrivate from '../../hooks/useAPIPrivaate';
import ConfirmationPopup from '../../components/AdminComponents/ConfirmationPopup';

const ApproveTeachersPage = () => {

  const [unApproveTeachers, setUnApproveTeachers] = useState([]);
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const [buttonType, setButtonType] = useState("");
  const [selectedTeacherID, setSelectedTeacherID] = useState("")

  const apiPrivate = useApiPrivate();

  const handleApproveTeacher = async () => {
    try {
      console.log("hello")
      await apiPrivate.patch("admin/approve-teacher/" + selectedTeacherID).then((res) => {
        if (res.status === 200) {
          setUnApproveTeachers((teachers) => teachers.filter((teacher) => teacher._id != selectedTeacherID));
          setConfirmationPopup(false);
          setSelectedTeacherID("");
        }
      })
    }
    catch (error) {
      console.log(error);
    }
  };

  const handleRejectTeacher = async () => {
    try {
      await apiPrivate.patch("admin/reject-teacher/" + selectedTeacherID).then((res) => {
        if (res.status === 200) {
          setUnApproveTeachers((teachers) => teachers.filter((teacher) => teacher._id != selectedTeacherID));
          setConfirmationPopup(false);
          setSelectedTeacherID("");
        }
      })
    }
    catch (error) {
      console.log(error);
    }
  };
  
  

  useEffect(() => {
    const getUnApproveTeachers = () => {
      try{
        apiPrivate.get("admin/un-approved-teachers").then((res) => {
          if (res.status === 200) {
            setUnApproveTeachers(res.data);
            console.log(res.data)
          }
        });
      }
      catch (error) {
        console.log(error)
      }
    };

    getUnApproveTeachers();
  }, [])

  return (
    <div>
      <h1 className='mb-2 text-2xl font-bold tracking-tight text-teal-900 dark:text-white'>
        Approve Teachers:
      </h1>

    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5  mb-10 gap-5'>
      {
        unApproveTeachers.length == 0 
        ? (
          <p className="text-xl font-normal">No teachers</p>
        )
        : (
          unApproveTeachers.map((teacher, index) => (
            <div key={index} class="w-[400px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  
    <div class="flex items-center justify-center">
      <img
        class="w-40 h-40 rounded-full mt-4 border-4 border-white"
        src={teacher.profilePicture}
        alt=""
      />
    </div>
  <div class="p-5 text-wrap">
    <h2 class="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
      {teacher.firstName} {teacher.lastName}
    </h2>
    <p class="mb-3 text-sm font-medium text-gray-900 dark:text-gray-400">
      Subjects: {teacher.subjectsTaught}
    </p>
    <p class="mb-3 text-sm font-medium text-gray-900 dark:text-gray-400">
      Educational Credentials: {teacher.educationalCredential}
    </p>
    <p class="mb-3 text-sm font-medium text-gray-900 dark:text-gray-400">
      Available Time slots: {teacher.availableTimeSlots}
    </p>
    <p class="mb-3 text-sm font-medium text-gray-900 dark:text-gray-400">
      About Me: {teacher.aboutMe}
    </p>
  </div>
  <div className='flex p-2 justify-end'>
  <button onClick={() => {
    setButtonType("reject")
    setConfirmationPopup(true)
    setSelectedTeacherID(teacher._id)
    }} type="button" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Reject</button>
  <button onClick={() => {
    setButtonType("approve")
    setConfirmationPopup(true)
    setSelectedTeacherID(teacher._id)
    }} type="button" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Approve</button>
  </div>
</div>
          ))
        )
      }
    </div>
    {
      confirmationPopup && (
        <ConfirmationPopup
          setConfirmationPopup={setConfirmationPopup}
          buttonType={buttonType}
          onConfirm={buttonType === 'approve' ? handleApproveTeacher : handleRejectTeacher}
        />
      )
      
    }
    </div>
  )
}

export default ApproveTeachersPage