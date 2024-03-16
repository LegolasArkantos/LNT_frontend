import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import AgoraRTC from "agora-rtc-react";

const VideoCallPage2 = () => {

    const [remoteUsers, setRemoteUsers] = useState({});
    const [localTracks, setLocalTracks] = useState([]);
    const [localScreenTracks, setLocalScreenTracks] = useState();
    const [screenShare, setScreenShare] = useState(false);
    const [client, setClient] = useState(AgoraRTC.createClient({mode: 'rtc', codec:'vp8'}));
    const [viewSwitch, setViewSwitch] = useState(false);
    const APP_ID = "77f2afa99ce6443fb89a6e40281b0b4f";

    const location = useLocation();
    const {roomID, userType} = location.state;

    const profile = useSelector((state) => {
        if (userType === "Teacher"){
            return state.teacherProfile.value;
        } 
        else {
            return state.studentProfile.value;
        }
    }
    );
    
    let token = null;

    let uid = sessionStorage.getItem('uid');
    if (!uid) {
        uid = profile.profileID;
        sessionStorage.setItem('uid', uid);
    }

    const handleUserPublished = async (user, mediaType) => {
        try{
            console.log(user)
            setRemoteUsers(prevRemoteUsers => ({
                ...prevRemoteUsers,
                [user.uid]: user
              }));
    
            await client.subscribe(user, mediaType)
    
            if (mediaType === 'video') {
                console.log("VIDEO TRACK", user.videoTrack)
                user.videoTrack.play(`user-${user.uid}`);
            }
    
            // if (mediaType === 'audio') {
            //     user.audioTrack.play()
            // }
        }
        catch (error) {
            console.log(error)
        }
        
    }

    const handleUserLeft = async (user) => {
        setRemoteUsers(prevRemoteUsers => {
            const updatedUsers = { ...prevRemoteUsers };
            delete updatedUsers[user.uid];
            return updatedUsers;
        });
    }

    const joinStream = async () => {
        try {
            const localTrackstemp = await AgoraRTC.createMicrophoneAndCameraTracks({}, {encoderConfig: {
                width: {min:640, ideal:1920, max:1920},
                height: {min:480, ideal:1080, max:1080}
            }});
            
            localTrackstemp[1].play(`user-${uid}`);
            // localTracks1[0].play();
            await client.publish([localTrackstemp[0], localTrackstemp[1]]);
            setLocalTracks(localTrackstemp);
        }
        catch (error) {
            console.log(error);
        }
    };

    const expandVideoFrame = (user) => {
        // if (localTracks[1]) {
        //     localTracks[1].stop();
        //     localTracks[1].close();
        // }
        try {
            if (!viewSwitch){
                user.videoTrack.play(`user-${uid}`);
                localTracks[1].play(`user-${user.uid}`)
                setViewSwitch(true);
            }
            else {
                user.videoTrack.play(`user-${user.uid}`);
                localTracks[1].play(`user-${uid}`)
                setViewSwitch(false);
            }
        }
        catch (error) {
            console.log(error);
        }
        
    }

    const toggleMic = async () => {
        try {
            if (localTracks[0]) {
                if(localTracks[0].muted) {
                    await localTracks[0].setMuted(false);
                }
                else {
                    await localTracks[0].setMuted(true);
                }
            } else {
                console.log("Local audio track is undefined");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const toggleCamera = async () => {
        try {
            if (localTracks[1]) {
                if(localTracks[1].muted) {
                    await localTracks[1].setMuted(false);
                }
                else {
                    await localTracks[1].setMuted(true);
                }
            } else {
                console.log("Local camera track is undefined");
            }
        }
        catch(error) {
            console.log(error);
        }
    }

    const toggleScreen = async () => {
        try {
            if (!screenShare) {
                setScreenShare(true);
                const localScreenTrackstemp = await AgoraRTC.createScreenVideoTrack();
                
                console.log("CLIENT JOINED:", client);
                
                if (localTracks[1]) {
                    localTracks[1].stop();
                    localTracks[1].close();
                }
                console.log("UID", uid);
                localScreenTrackstemp.play(`user-${uid}`);
                
                await client.unpublish([localTracks[1]]);
                await client.publish([localScreenTrackstemp]);
                setLocalScreenTracks(localScreenTrackstemp);
        
            } else {
                setScreenShare(false);
                if (localScreenTracks) {
                    localScreenTracks.stop();
                    localScreenTracks.close();
                }

                const localCameraTrack = await AgoraRTC.createCameraVideoTrack({encoderConfig: {
                    width: {min:640, ideal:1920, max:1920},
                    height: {min:480, ideal:1080, max:1080}
                }});

                localCameraTrack.play(`user-${uid}`);
                await client.unpublish([localScreenTracks]);
                
                
                
                // setLocalTracks([localTracks[0], localTracks[1]]);
                console.log("LOCALTRACKSSSOFF", localTracks)
                
                await client.publish([localCameraTrack]);
                setLocalTracks([localTracks[0], localCameraTrack]);
                setLocalScreenTracks(null);
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    
    

    useEffect(() => {
        const joinRoomInit = async () => {
            try {
                //const client = AgoraRTC.createClient({mode: 'rtc', codec:'vp8'});
                console.log(profile.profileID);
                await client.join(APP_ID, roomID, token, uid);
    
                client.on('user-published', handleUserPublished);
                client.on('user-left', handleUserLeft);
                
                await joinStream();
            }
            catch (error) {
                console.log(error);
            }
        }
    
        joinRoomInit();
    
        // Cleanup function to leave the channel when the component unmounts
        
    }, []);
    
    
    

  return (
        <div className='flex w-full bg-teal-100  h-screen'>
            <div className='flex-col w-3.5/5 '>
                <div className='flex-col p-3'>
                  <div className='w-[800px] h-[470px] ml-10 outline rounded overflow-hidden' id={`user-${uid}`} ></div>
                   <div className='flex justify-end font-bold'>
                    <div className='bg-gray-500'>
                    {profile.firstName} {profile.lastName}
                    </div>
                   </div>
                </div>
             
             <div className='flex items-center justify-center'>
             <div class="inline-flex rounded-md z-20 shadow-sm" role="group">
               {
                !screenShare && (
                 <button onClick={() => toggleCamera()}  className="inline-flex items-center px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-500 rounded-s-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    <svg width="30px" height="30px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.25 18.25C15.0114 18.25 17.25 16.0114 17.25 13.25C17.25 10.4886 15.0114 8.25 12.25 8.25C9.48858 8.25 7.25 10.4886 7.25 13.25C7.25 16.0114 9.48858 18.25 12.25 18.25Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2.25001 10C2.24847 9.13152 2.52963 8.28612 3.051 7.59155C3.57238 6.89699 4.30564 6.39103 5.14001 6.15002C5.96585 5.90841 6.69178 5.40688 7.21001 4.71997L8.05001 3.59998C8.4226 3.10319 8.90574 2.69995 9.46116 2.42224C10.0166 2.14453 10.629 2 11.25 2H13.25C13.871 2 14.4834 2.14453 15.0389 2.42224C15.5943 2.69995 16.0774 3.10319 16.45 3.59998L17.3 4.71997C17.8141 5.41113 18.5416 5.91375 19.37 6.15002C20.2025 6.39284 20.9336 6.89959 21.453 7.59399C21.9725 8.2884 22.2522 9.13281 22.25 10L21.58 18C21.4726 19.081 20.9726 20.0851 20.1746 20.8223C19.3766 21.5594 18.3361 21.9784 17.25 22H7.25001C6.16389 21.9784 5.12339 21.5594 4.32543 20.8223C3.52747 20.0851 3.02746 19.081 2.92002 18L2.25001 10Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                 </button>
                )
               }
               <button onClick={() => toggleMic()} className="inline-flex items-center px-4 py-2 mt-4 text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                 <svg fill="#000000" width="30px" height="30px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M960.315 96.818c-186.858 0-338.862 152.003-338.862 338.861v484.088c0 186.858 152.004 338.862 338.862 338.862 186.858 0 338.861-152.004 338.861-338.862V435.68c0-186.858-152.003-338.861-338.861-338.861M427.818 709.983V943.41c0 293.551 238.946 532.497 532.497 532.497 293.55 0 532.496-238.946 532.496-532.497V709.983h96.818V943.41c0 330.707-256.438 602.668-580.9 627.471l-.006 252.301h242.044V1920H669.862v-96.818h242.043l-.004-252.3C587.438 1546.077 331 1274.116 331 943.41V709.983h96.818ZM960.315 0c240.204 0 435.679 195.475 435.679 435.68v484.087c0 240.205-195.475 435.68-435.68 435.68-240.204 0-435.679-195.475-435.679-435.68V435.68C524.635 195.475 720.11 0 960.315 0Z" fill-rule="evenodd"></path> </g></svg>
               </button>
               <button onClick={() => toggleScreen()}  className="inline-flex items-center px-4 py-2 mt-4 text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
               <svg width="30px" height="30px" viewBox="0 0 28 28" version="1.1" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>ic_fluent_share_screen_28_regular</title> <desc>Created with Sketch.</desc> <g id="🔍-System-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="ic_fluent_share_screen_28_regular" fill="#212121" fill-rule="nonzero"> <path d="M23.75,4.99939 C24.9926,4.99939 26,6.00675 26,7.24939 L26,20.75 C26,21.9926 24.9926,23 23.75,23 L4.25,23 C3.00736,23 2,21.9927 2,20.75 L2,7.24939 C2,6.00675 3.00736,4.99939 4.25,4.99939 L23.75,4.99939 Z M23.75,6.49939 L4.25,6.49939 C3.83579,6.49939 3.5,6.83518 3.5,7.24939 L3.5,20.75 C3.5,21.1642 3.83579,21.5 4.25,21.5 L23.75,21.5 C24.1642,21.5 24.5,21.1642 24.5,20.75 L24.5,7.24939 C24.5,6.83518 24.1642,6.49939 23.75,6.49939 Z M13.9975,8.62102995 C14.1965,8.62102995 14.3874,8.69998 14.5281,8.8407 L17.7826,12.0952 C18.0755,12.3881 18.0755,12.863 17.7826,13.1559 C17.4897,13.4488 17.0148,13.4488 16.7219,13.1559 L14.7477,11.1817 L14.7477,18.6284 C14.7477,19.0426 14.412,19.3784 13.9977,19.3784 C13.5835,19.3784 13.2477,19.0426 13.2477,18.6284 L13.2477,11.1835 L11.2784,13.1555 C10.9858,13.4486 10.5109,13.4489 10.2178,13.1562 C9.92469,12.8636 9.92436,12.3887 10.217,12.0956 L13.467,8.84107 C13.6077,8.70025 13.7985,8.62102995 13.9975,8.62102995 Z" > </path> </g> </g> </g></svg>
               </button>
               <button  className="inline-flex items-center px-4 py-2 mt-4 text-sm font-medium text-white bg-green-500 rounded-e-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
               <svg width="30px" height="30px" viewBox="0 0 1024 1024" class="icon" version="1.1" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M928 358.4l-49.066667-49.066667c-172.8-168.533333-586.666667-145.066667-736 0l-49.066666 49.066667c-12.8 12.8-12.8 34.133333 0 49.066667L192 503.466667c12.8 12.8 36.266667 12.8 49.066667 0l108.8-104.533334-8.533334-113.066666c34.133333-34.133333 307.2-34.133333 341.333334 0l-6.4 117.333333 104.533333 100.266667c12.8 12.8 36.266667 12.8 49.066667 0l98.133333-96c14.933333-14.933333 14.933333-36.266667 0-49.066667z" fill="#F44336"></path><path d="M512 864L341.333333 661.333333h341.333334z" fill="#B71C1C"></path><path d="M448 512h128v160h-128z" fill="#B71C1C"></path></g></svg>
               </button>
             </div>
             </div>
            </div>

            
        
            <div className='flex-col bg-teal-200 flex-1 mr-10 ml-5 mt-3 mb-3 rounded outline outline-teal-700 p-5 space-y-5'>
               {
                 remoteUsers && (
                   Object.keys(remoteUsers).map((uid) => (
                     <div onClick={() => expandVideoFrame(remoteUsers[uid])} className='flex justify-center cursor-pointer' key={uid}>
                        <div className='w-[150px] h-[150px] rounded-full outline overflow-hidden' id={`user-${uid}`}>

                        </div>
                     </div>
                  ))
                 )
               }
            </div>

        </div>
  )
}

export default VideoCallPage2