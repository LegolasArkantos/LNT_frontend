import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import peer from "../services/peer";

const VideoCallPage = ({socket}) => {

    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [myStream, setMyStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);

    const handleUserJoined = useCallback(({ id }) => {
        console.log(`${id} joined room`);
        setRemoteSocketId(id);
      }, []);


      const handleCallUser = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        const offer = await peer.getOffer();
        socket.emit("user:call", { to: remoteSocketId, offer });
        setMyStream(stream);
      }, [remoteSocketId, socket]);

    // const handleUserJoined = useCallback(async ({id}) => {
    //     try {
    //         const offer = await peer.getOffer();
    //         setRemoteSocketId(id);
    //         socket.emit("user:call", {to: remoteSocketId, offer});
    //         console.log("handleUserJoined")
    //     }
    //     catch (error) {
    //         console.log(error);
    //     }
    // }, [remoteSocketId, socket]);

    const handleIncomingCall = useCallback(async ({from, offer}) => {
        console.log("handleIncomingCall")
        try{
            setRemoteSocketId(from);
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true
            });
            setMyStream(stream);
            console.log('Incoming Call',from, offer)
            const ans = await peer.getAnswer(offer);
            console.log(ans)
            socket.emit("call:accepted", {to: from, ans});
        }
        catch (error) {
            console.log(error)
        }
    },[socket]);

    const sendStreams = useCallback( () => {
        for (const track of myStream.getTracks()) {
            peer.peer.addTrack(track, myStream);
        }
    }, [myStream])

    const handleCallAccepted = useCallback(async ({from, ans}) => {
        peer.setLocalDescription(ans);
        console.log("Call Accepted!");
        sendStreams();
    }, [sendStreams]);

    const handleNegoNeeded = useCallback(async () => {
        const offer = await peer.getOffer();
        socket.emit("peer:nego:needed", {offer, to: remoteSocketId})
    },[remoteSocketId, socket]);

    const handleNegoNeedIncoming = useCallback(async ({from,offer}) => {
        const ans = await peer.getAnswer(offer);
        socket.emit("peer:nego:done", {to: from, ans});
    }, [socket]);

    const handleNegoNeedFinal = useCallback(async ({ans}) => {
        await peer.setLocalDescription(ans);
    }, [])

    useEffect(() => {
        peer.peer.addEventListener('negotiationneeded', handleNegoNeeded);

        return () => {
            peer.peer.removeEventListener('negotiationneeded', handleNegoNeeded);
        }
    },[handleNegoNeeded])

    useEffect(() => {
        peer.peer.addEventListener('track', async ev => {
            const remoteStream = ev.streams;
            console.log("Got Tracks")
            setRemoteStream(remoteStream[0]);
        })
    },[])
    
    useEffect(() => {
        
        // const startStream = async () => {
        //     try {
        //         const stream = await navigator.mediaDevices.getUserMedia({
        //             audio: true,
        //             video: true
        //         });
        //         setMyStream(stream);
        //     }
        //     catch(error) {
        //         console.log(error)
        //     }
        // }

        // startStream();
        

        socket.on("user:joined", handleUserJoined);
        socket.on("incoming:call", handleIncomingCall);
        socket.on("call:accepted", handleCallAccepted);
        socket.on("peer:nego:needed", handleNegoNeedIncoming)
        socket.on("peer:nego:final", handleNegoNeedFinal)

        return () => {
            socket.off("user:joined", handleUserJoined);
            socket.off("incoming:call", handleIncomingCall);
            socket.off("call:accepted", handleCallAccepted);
            socket.off("peer:nego:needed", handleNegoNeedIncoming)
            socket.off("peer:nego:final", handleNegoNeedFinal)
        }
    }, [socket,handleUserJoined,handleIncomingCall,handleCallAccepted,handleNegoNeedIncoming,handleNegoNeedFinal])



  return (
    <div className='flex-col'>
        <h1 className='font-bold text-2xl'>
            {remoteSocketId ? ("Connected") : ("not connected")}
        </h1>
        {remoteSocketId && <button onClick={() => handleCallUser()} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Call</button>}
        {myStream && <button onClick={() => sendStreams()} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Join</button>}
        <div className='flex space-x-5'>
            <div>
            {
            myStream && <ReactPlayer playing muted height="400px" width="400px" url={myStream} />
            }
            </div>
            <div>
            {
            remoteStream && <ReactPlayer playing muted height="400px" width="400px" url={remoteStream} />
         }
            </div>
        </div>
        
        
    </div>
  )
}

export default VideoCallPage