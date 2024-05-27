import React, { useEffect, useState } from 'react'
import useApiPrivate from '../../hooks/useAPIPrivate';
import ConfirmationPopup from '../../components/AdminComponents/ConfirmationPopup';

const ApproveSessionsPage = () => {

    const [inReviewSessions, setInReviewSessions] = useState([]);
    const [confirmationPopup, setConfirmationPopup] = useState(false);
    const [buttonType, setButtonType] = useState("");
    const [selectedSessionID, setSelectedSessionID] = useState("")

    const apiPrivate = useApiPrivate();

    const handleApproveSession = async () => {
        try {
          console.log("hello")
          await apiPrivate.patch("admin/approve-session/" + selectedSessionID).then((res) => {
            if (res.status === 200) {
                setInReviewSessions((sessions) => sessions.filter((session) => session?._id != selectedSessionID));
                setConfirmationPopup(false);
                setSelectedSessionID("");
            }
          })
        }
        catch (error) {
          console.log(error);
        }
      };
    
      const handleRejectSession = async () => {
        try {
          await apiPrivate.patch("admin/reject-session/" + selectedSessionID).then((res) => {
            if (res.status === 200) {
                setInReviewSessions((sessions) => sessions.filter((session) => session?._id != selectedSessionID));
                setConfirmationPopup(false);
                setSelectedSessionID("");
            }
          })
        }
        catch (error) {
          console.log(error);
        }
      };

    useEffect(() => {
        const getUnApproveSessions = () => {
            try{
              apiPrivate.get("admin/un-approved-sessions").then((res) => {
                if (res.status === 200) {
                  setInReviewSessions(res.data);
                  console.log(res.data)
                }
              });
            }
            catch (error) {
              console.log(error)
            }
          };
      
        getUnApproveSessions();

    }, []);


  return (
    <div>
        <h1 className='mb-8 text-2xl font-bold tracking-tight text-teal-900 dark:text-white'>
            Approve Sessions:
        </h1>

        <div className='flex-col space-y-5'>
      {
        inReviewSessions?.length == 0 
        ? (
          <p className="text-xl font-normal">No Sessions</p>
        )
        : (
            inReviewSessions?.map((session, index) => (
            <div key={index} class="h-fit w-3/5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  
    {/* <div class="flex items-center justify-center">
      <img
        class="w-40 h-40 rounded-full mt-4 border-4 border-white"
        src={teacher?.profilePicture}
        alt=""
      />
    </div> */}
  <div class="p-5 text-wrap flex flex-col">
    <h2 class="mb-3 text-2xl font-semibold text-gray-900 dark:text-white">
      {session?.subject}
    </h2>
    <div className='flex flex-col'>
    <p class="mb-3 text-sm font-bold text-gray-900 dark:text-gray-400">
      Teacher: <span className='font-normal'>{session?.teacherName}</span>
    </p>
    <p class="mb-3 text-sm font-bold text-gray-900 dark:text-gray-400">
      Timings: <span className='font-normal'>{session?.startTime} - {session?.endTime}</span>
    </p>
    <p class="text-sm mb-3 font-bold text-gray-900 dark:text-gray-400">
      Day: <span className='font-normal'>{session?.day}</span>
    </p>
    <p class="text-sm mb-3 font-bold text-gray-900 dark:text-gray-400">
      Number of Sessions: <span className='font-normal'>{session?.sessionCounter?.sessionCount}</span>
    </p>
    </div>
    <div className='flex-col'>
        <p className="mb-3 text-lg underline font-semibold text-gray-700 dark:text-gray-400">
            Course Overview:
        </p>
        <div className='flex w-full h-[300px] bg-gray-100 rounded p-3 overflow-y-scroll'>
        <p className='mb-4 text-m font-semibold text-teal-900' style={{ whiteSpace: 'pre-wrap' }}>
            {session?.sessionDescription}
        </p>
        </div>
        </div>
  </div>
  <div className='flex p-2 justify-end'>
  <button onClick={() => {
    setButtonType("reject")
    setConfirmationPopup(true)
    setSelectedSessionID(session?._id)
    }} type="button" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Reject</button>
  <button onClick={() => {
    setButtonType("approve")
    setConfirmationPopup(true)
    setSelectedSessionID(session?._id)
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
          purpose="Session"
          onConfirm={buttonType === 'approve' ? handleApproveSession : handleRejectSession}
        />
      )
      
    }
    </div>
  )
}

export default ApproveSessionsPage