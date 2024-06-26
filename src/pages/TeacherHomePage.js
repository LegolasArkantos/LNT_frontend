import React, { useEffect } from "react";
import { useState } from "react";
import useAPIPrivate from "../hooks/useAPIPrivate";
import Lottie from 'react-lottie';
import loadingPurple from '../assets/loadingPurple.json';
import emptyDataImgCourses from '../assets/no data.png'

const TeacherHomePage = () => {
  const [polls, setPolls] = useState([]);
  const [notes, setNotes] = useState([]);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [category, setCategory] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showNotePopup, setShowNotePopup] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [title1, setTitle1] = useState("");
  const [description1, setDescription1] = useState("");
  const [showUpdateNotePopup, setShowUpdateNotePopup] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const apiPrivate = useAPIPrivate();

  const addPoll = async (e) => {
    e.preventDefault();
    // Check if at least two options are added
    
    try {
      if (options.length >= 2) {
        const filteredOptions = options.filter((option) => option.option !== "");
          const pollData = {
            question: question,
            category: category,
            options: filteredOptions
          }
          setPolls((prevPolls) => [
            ...prevPolls,
            {
              question,
              options: filteredOptions,
            },
          ]);
          await apiPrivate.post("poll/create", {
           pollData
           }).then((res) => {
             if (res.status === 200) {
               setQuestion("");
               setCategory("")
               setOptions([]);
               setShowPopup(false);
             } 
           });
        
        
        
      } else {
        // If less than two options are added, display an alert or handle it accordingly
        alert("Please add at least two options before creating the poll.");
      }
    }
    catch (error) {
      console.log(error);
    }
    
  };
  

  const handleAddOption = () => {
    setOptions([...options, {option: ""}]);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index].option = value;
    setOptions(updatedOptions);
  };

  const handleCancel = () => {
    setShowPopup(false);
    setOptions([]);
    setQuestion("");
    setCategory("");
  };

  const handlePollDelete = async (pollID) => {
    try {
      await apiPrivate.delete("poll/delete/" + pollID).then((res) => {
        if (res.status === 200) {
          setPolls((polls) => polls.filter((poll) => poll._id !== pollID));
        }
      });
    }
    catch (error) {
      console.log(error)
    }
  };

  const handleNoteDelete = async (noteId) => {
    
    try {
      await apiPrivate.delete("note/delete/" + noteId).then((res) => {
        if (res.status === 200) {
          setNotes((notes) => notes.filter((notes) => notes._id !== noteId));
        }
      });
    }
    catch (error) {
      console.log(error)
    }
  };

  const noteUpdate = async (e) => {
    e.preventDefault();
    try {
      await apiPrivate.patch(`note/update/${selectedNoteId}`, {title,description}).then((res) => {
        if (res.status === 200) {
          setNotes(prevNotes => prevNotes.map(note => (note._id === res.data._id ? res.data : note)));
          setShowUpdateNotePopup(false);
        }
      }); // Assuming the response contains the updated note
      
    } catch (error) {
      console.log(error);
      throw error; // Re-throwing the error so that it can be caught and handled by the caller
    }
  }
  
  const handleNoteCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await apiPrivate.post("note/create", {
        title: title1,
        description: description1,
        timestamp: new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
      });
      if (response.status === 200) {
        // Update notes state with the newly created note
        setNotes([...notes, response.data]);
        // Reset input fields and close the popup
        setTitle("");
        setDescription("");
        setTitle1("");
        setDescription1("");
        setShowNotePopup(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateNotePopup = async (noteID, title, description) => {
    setSelectedNoteId(noteID);
    setTitle(title);
    setDescription(description);
    setShowUpdateNotePopup(true);
  }
  

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getPolls = async () => {
      try {
        await apiPrivate.get("poll/get-my-polls").then((res) => {
          if (res.status === 200 && isMounted) {
            setPolls(res.data.polls);
          }
        });
      }
      catch (error) {
        console.log(error)
      }
      finally {
        setLoading1(false)
      }
      
    }

    const getNotes = async () => {
      try {
        await apiPrivate.get("note/get").then((res) => {
          if (res.status === 200 && isMounted) {
            setNotes(res.data);
          }
        });
      }
      catch (error) {
        console.log(error)
      }
      finally {
        setLoading2(false)
      }
    }

    getPolls();
    getNotes();

    return () => {
      isMounted = false;
      controller.abort();
    };
  },[]);

  useEffect(() => {

    const getPolls = async () => {
      try {
        await apiPrivate.get("poll/get-my-polls").then((res) => {
          setPolls(res.data.polls);
        });
      }
      catch (error) {
        console.log(error)
      }      
    }

    const interval = setInterval(() => {
        getPolls();
    }, 10000); 

    return () => clearInterval(interval);
  }, []); 


  const slideLeft = (id) => {
    var slider = document.getElementById(id);
    slider.scrollLeft -= 300; 
  };
  
  const slideRight = (id) => {
    var slider = document.getElementById(id);
    slider.scrollLeft += 300; 
  };

  return (
    <div className="container flex flex-col mx-auto my-8">
      <div className="flex justify-between">
      <h1 className="text-3xl text-[#7179C6] font-bold mb-4">Polls</h1>
      <button
        className="bg-[#7179C6] hover:bg-purple-500 text-white px-4 py-2 rounded-full mb-4"
        onClick={() => setShowPopup(true)}
      >
        Create Poll
      </button>
      </div>
      {showPopup && (
        <div className="fixed z-20 top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-md h-2.5/5 w-2/5">
            <h2 className="text-2xl text-[#7179C6] font-bold mb-4">Create Poll</h2>
            <form onSubmit={addPoll} className="mb-8 space-y-3">
              <input
                type="text"
                placeholder="Enter poll question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="border border-gray-300 p-2 mr-2 rounded-md"
                required
              />
              <input
                type="text"
                placeholder="Enter Category of the poll"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border border-gray-300 p-2 mr-2 rounded-md"
                required
              />
              <ul className="flex-col space-y-3">
                {options.map((option, index) => (
                  <li>
                    <input
                      key={index}
                      type="text"
                      placeholder={`Option ${index + 1}`}
                      value={option.option}
                      onChange={(e) => {
                        if (e.target.value.trim() == ""){
                          alert("dont leave an option empty");
                        }
                        else {
                          handleOptionChange(index, e.target.value)
                        }
                      }
                      }
                      className="border border-gray-300 p-2 mr-2 rounded-md"
                    />
                  </li>
                ))}
              </ul>
              <svg onClick={handleAddOption} className="cursor-pointer" width="45px" height="45px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.4" d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2Z" fill="#6d28d9"></path> <path d="M18 11.25H12.75V6C12.75 5.59 12.41 5.25 12 5.25C11.59 5.25 11.25 5.59 11.25 6V11.25H6C5.59 11.25 5.25 11.59 5.25 12C5.25 12.41 5.59 12.75 6 12.75H11.25V18C11.25 18.41 11.59 18.75 12 18.75C12.41 18.75 12.75 18.41 12.75 18V12.75H18C18.41 12.75 18.75 12.41 18.75 12C18.75 11.59 18.41 11.25 18 11.25Z" fill="#ffffff"></path> </g></svg>
              <div className="flex space-x-4">
              <button
              onClick={() => handleCancel()}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md w-1/2"
            >
              Cancel
            </button>
              <button
                type="submit"
                className="bg-[#7179C6] hover:bg-purple-500 text-white px-4 py-2 rounded-md w-1/2"
              >
                Create Poll
              </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="flex items-center">
      <button className="hover:bg-purple-200 rounded-full" style={{ marginLeft: "-40px" }} onClick={() => slideLeft('slider1')}>
        <svg width="40px" height="40px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 22.4199C17.5228 22.4199 22 17.9428 22 12.4199C22 6.89707 17.5228 2.41992 12 2.41992C6.47715 2.41992 2 6.89707 2 12.4199C2 17.9428 6.47715 22.4199 12 22.4199Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M13.4102 16.4199L10.3502 13.55C10.1944 13.4059 10.0702 13.2311 9.98526 13.0366C9.9003 12.8422 9.85645 12.6321 9.85645 12.4199C9.85645 12.2077 9.9003 11.9979 9.98526 11.8035C10.0702 11.609 10.1944 11.4342 10.3502 11.29L13.4102 8.41992" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </button>
        <ul id="slider1" className="flex w-full overflow-x-scroll scroll scroll-smooth scrollbar-hide mt-5 space-x-8">
   {
    loading1 && (
      <div className="flex w-full h-[200px] items-center justify-center">
      <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: loadingPurple,
                    rendererSettings: {
                      preserveAspectRatio: 'xMidYMid slice',
                    },
                  }}
                  height={200}
                  width={200}
                />
    </div>
    )
   }
  {!loading1 && polls.length === 0 
  ? (<div className="flex w-full h-[300px] items-center justify-center">
            <img className="w-1.5/5 h-full" src={emptyDataImgCourses}/>
            </div>
  )
  : (
    polls?.map((poll, index) => (
      <li key={index} className="flex flex-col justify-between mb-4 ml-2 mt-2 outline outline-purple-800 rounded p-3 w-[300px]">
        <div className="flex justify-between">
          <div className="flex bg-[#d8b4fe] p-2 rounded-full">
            <p className="text-purple-800 text-xs">{poll?.category}</p>
          </div>
          <div onClick={() => handlePollDelete(poll?._id)} className="hover:bg-blue-100 rounded-full w-fit">
            <svg className="cursor-pointer" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M10 12V17" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M14 12V17" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M4 7H20" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </g>
            </svg>
          </div>
        </div>
        <div className="flex-grow">
          <h3 className="text-lg mt-5 mb-2 font-semibold text-black">{poll?.question}</h3>
        </div>
        <div className="flex-col">
          <ul className="space-y-2">
            {poll?.options?.map((option, index) => (
              <li className="w-[300px]" key={index}>
                <p className="font-bold">
                  {option?.option}
                </p>
                <span>
                  <div className="w-[270px] bg-gray-300 rounded-full dark:bg-gray-700">
                    <div
                      className={`${option?.percentage === 0 ? "bg-gray-300" : "bg-[#7179C6]"} text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full`}
                      style={option?.percentage !== 0 ? { width: `${option?.percentage}%` } : null}
                    >
                      {option?.percentage}%
                    </div>
                  </div>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </li>
    ))
  )}
</ul>

        <button className="hover:bg-purple-200 rounded-full" style={{ marginRight: "-40px" }} onClick={() => slideRight('slider1')}>
        <svg width="40px" height="40px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 22.4199C17.5228 22.4199 22 17.9428 22 12.4199C22 6.89707 17.5228 2.41992 12 2.41992C6.47715 2.41992 2 6.89707 2 12.4199C2 17.9428 6.47715 22.4199 12 22.4199Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M10.5596 8.41992L13.6196 11.29C13.778 11.4326 13.9047 11.6068 13.9914 11.8015C14.0781 11.9962 14.123 12.2068 14.123 12.4199C14.123 12.633 14.0781 12.8439 13.9914 13.0386C13.9047 13.2332 13.778 13.4075 13.6196 13.55L10.5596 16.4199" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </button>
      </div>
      <div className="flex justify-between mt-10">
      <h1 className="text-3xl text-[#7179C6] font-bold mb-4">Notes</h1>
      <button
        className="bg-[#7179C6] hover:bg-purple-500 text-white px-4 py-2 rounded-full mb-4"
        onClick={() => setShowNotePopup(true)}
      >
        Create Note
      </button>
      </div>
      {showNotePopup && (
  <div className="fixed z-20 top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-8 rounded-lg h-3.5/5 w-2/5">
      <h2 className="text-2xl text-[#7179C6] font-bold mb-4">Note</h2>
      <form onSubmit={handleNoteCreate} className="mb-8 space-y-3">
        <div>
          <label htmlFor="noteTitle" className="font-bold text-sm text-gray-700">Title</label>
          <input
            type="text"
            id="noteTitle"
            placeholder="Enter note title"
            className="border border-gray-300 p-2 rounded-md w-full"
            value={title1}
            onChange={(e) => setTitle1(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="noteDescription" className="font-bold text-sm text-gray-700">Description</label>
          <textarea
            id="noteDescription"
            placeholder="Enter note description"
            rows={4}
            className="border border-gray-300 p-2 rounded-md w-full"
            value={description1}
            onChange={(e) => setDescription1(e.target.value)}
            required
          />
        </div>
        <div className="flex space-x-4 justify-between mt-4">
        <button
            onClick={() => setShowNotePopup(false)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md w-1/2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#7179C6] hover:bg-purple-500 text-white px-4 py-2 rounded-md w-1/2"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
)}

{showUpdateNotePopup && (
  <div className="fixed z-20 top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-8 rounded-lg h-3.5/5 w-2/5">
      <h2 className="text-2xl text-[#7179C6] font-bold mb-4">Update</h2>
      <form onSubmit={noteUpdate} className="mb-8 space-y-3">
        <div>
          <label htmlFor="noteTitle" className="font-bold text-sm text-gray-700">Title</label>
          <input
            type="text"
            id="noteTitle"
            placeholder="Enter note title"
            className="border border-gray-300 p-2 rounded-md w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="noteDescription" className="font-bold text-sm text-gray-700">Description</label>
          <textarea
            id="noteDescription"
            placeholder="Enter note description"
            rows={4}
            className="border border-gray-300 p-2 rounded-md w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-between mt-4 space-x-4">
        <button
            onClick={() => setShowUpdateNotePopup(false)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md w-1/2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#7179C6] hover:bg-purple-500 text-white px-4 py-2 rounded-md w-1/2"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
)}

      <div className="flex items-center">
      <button className="hover:bg-purple-200 rounded-full" style={{ marginLeft: "-40px" }} onClick={() => slideLeft('slider2')}>
        <svg width="40px" height="40px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 22.4199C17.5228 22.4199 22 17.9428 22 12.4199C22 6.89707 17.5228 2.41992 12 2.41992C6.47715 2.41992 2 6.89707 2 12.4199C2 17.9428 6.47715 22.4199 12 22.4199Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M13.4102 16.4199L10.3502 13.55C10.1944 13.4059 10.0702 13.2311 9.98526 13.0366C9.9003 12.8422 9.85645 12.6321 9.85645 12.4199C9.85645 12.2077 9.9003 11.9979 9.98526 11.8035C10.0702 11.609 10.1944 11.4342 10.3502 11.29L13.4102 8.41992" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </button>
        <ul id="slider2" className="flex w-full overflow-x-scroll scroll scroll-smooth scrollbar-hide mt-6 space-x-8">
          {
            loading2 && (
              <div className="flex w-full h-[200px] items-center justify-center">
              <Lottie
                    options={{
                      loop: true,
                      autoplay: true,
                      animationData: loadingPurple,
                      rendererSettings: {
                        preserveAspectRatio: 'xMidYMid slice',
                      },
                    }}
                    height={200}
                    width={200}
                  />
            </div>
            )
          }
          {!loading2 && notes?.length === 0 
          ? (
            <div className="flex w-full h-[300px] items-center justify-center">
            <img className="w-1.5/5 h-full" src={emptyDataImgCourses}/>
            </div>
          )
          : ( notes?.map((note,index) => (
            <li key={index} className="flex flex-col justify-between mb-4 ml-2 mt-2 outline outline-purple-800 rounded p-3 w-[300px]">
              <div className="flex justify-end">
              <div onClick={() => handleUpdateNotePopup(note?._id, note?.title, note?.description)} className="hover:bg-blue-100 rounded-full w-fit">
              <svg fill="#000000" width="30px" height="30px" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path class="st0" d="M12 25l3 3 15-15-3-3-15 15zM11 26l3 3-4 1z"></path></g></svg>
              </div>
              <div onClick={() => handleNoteDelete(note._id)} className="hover:bg-blue-100 rounded-full w-fit">
              <svg className="cursor-pointer" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12V17" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
              </div>
              </div>
              <h3 className="text-lg mt-5 font-semibold text-black">{note?.title}</h3>
              <p className="text-m mt-5 font-normal text-black">{note?.description}</p>
              <div className="flex justify-end">
                <p className="text-m mt-5 font-normal text-black">{note?.timestamp}</p>
              </div>
            </li>
          )))}
        </ul>
        <button className="hover:bg-purple-200 rounded-full" style={{ marginRight: "-40px" }} onClick={() => slideRight('slider2')}>
        <svg width="40px" height="40px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 22.4199C17.5228 22.4199 22 17.9428 22 12.4199C22 6.89707 17.5228 2.41992 12 2.41992C6.47715 2.41992 2 6.89707 2 12.4199C2 17.9428 6.47715 22.4199 12 22.4199Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M10.5596 8.41992L13.6196 11.29C13.778 11.4326 13.9047 11.6068 13.9914 11.8015C14.0781 11.9962 14.123 12.2068 14.123 12.4199C14.123 12.633 14.0781 12.8439 13.9914 13.0386C13.9047 13.2332 13.778 13.4075 13.6196 13.55L10.5596 16.4199" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </button>
      </div>
    </div>
  );
};

export default TeacherHomePage;