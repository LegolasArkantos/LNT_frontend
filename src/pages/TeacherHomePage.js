import React, { useEffect } from "react";
import { useState } from "react";
import useAPIPrivate from "../hooks/useAPIPrivate";

const TeacherHomePage = () => {
  const [polls, setPolls] = useState([]);
  const [notes, setNotes] = useState([]);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showNotePopup, setShowNotePopup] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showUpdateNotePopup, setShowUpdateNotePopup] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const apiPrivate = useAPIPrivate();

  const addPoll = async (e) => {
    e.preventDefault();
    // Check if at least two options are added
    
    try {
      if (options.length >= 2) {
        console.log(options)
        const filteredOptions = options.filter((option) => option.option !== "");
          const pollData = {
            question: question,
            options: filteredOptions
          }
     
          await apiPrivate.post("poll/create", {
           pollData
           }).then((res) => {
             if (res.status === 200) {
               polls.push({
                 question,
                 options: filteredOptions,
               });
               setPolls(polls);
               setQuestion("");
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
  };

  const handlePollDelete = async (pollID) => {
    console.log(pollID)
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
        title: title,
        description: description,
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
          console.log(res.data)
          }
        });
      }
      catch (error) {
        console.log(error)
      }
      
    }

    const getNotes = async () => {
      try {
        await apiPrivate.get("note/get").then((res) => {
          if (res.status === 200 && isMounted) {
            setNotes(res.data);
          console.log(res.data)
          }
        });
      }
      catch (error) {
        console.log(error)
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
          console.log(res.data)
        });
      }
      catch (error) {
        console.log(error)
      }
      
    }

    const interval = setInterval(() => {
        getPolls();
    }, 2000); 

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
    <div className="container mx-auto my-8">
      <div className="flex justify-between">
      <h1 className="text-3xl text-teal-900 font-bold mb-4">Polls</h1>
      <button
        className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-full mb-4"
        onClick={() => setShowPopup(true)}
      >
        Create Poll
      </button>
      </div>
      {showPopup && (
        <div className="fixed z-20 top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Create Poll</h2>
            <form onSubmit={addPoll} className="mb-8 space-y-3">
              <input
                type="text"
                placeholder="Enter poll question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
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
              <button
                type="button"
                onClick={handleAddOption}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Add Option
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 ml-4 rounded-md"
              >
                Create Poll
              </button>
            </form>
            <button
              onClick={() => handleCancel()}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className="flex items-center">
      <button className="hover:bg-teal-200 rounded-full" style={{ marginLeft: "-40px" }} onClick={() => slideLeft('slider1')}>
        <svg width="40px" height="40px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 22.4199C17.5228 22.4199 22 17.9428 22 12.4199C22 6.89707 17.5228 2.41992 12 2.41992C6.47715 2.41992 2 6.89707 2 12.4199C2 17.9428 6.47715 22.4199 12 22.4199Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M13.4102 16.4199L10.3502 13.55C10.1944 13.4059 10.0702 13.2311 9.98526 13.0366C9.9003 12.8422 9.85645 12.6321 9.85645 12.4199C9.85645 12.2077 9.9003 11.9979 9.98526 11.8035C10.0702 11.609 10.1944 11.4342 10.3502 11.29L13.4102 8.41992" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </button>
        <ul id="slider1" className="flex w-full overflow-x-scroll scroll  scroll-smooth scrollbar-hide mt-10 space-x-8">
          {polls.length !== 0 ? ( polls.map((poll,index) => (
            <li key={index} className="mb-4 ml-2 mt-2 outline outline-teal-800 rounded p-3 w-[300px]">
              <div className="flex justify-end">
              <div onClick={() => handlePollDelete(poll._id)} className="hover:bg-blue-100 rounded-full w-fit">
              <svg className="cursor-pointer" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12V17" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
              </div>
              </div>
              <h3 className="text-lg mt-5 font-semibold text-teal-900">{poll.question}</h3>
              <ul className="mt-5 ">
                {poll.options.map((option, index) => (
                  <li className="w-[300px]" key={index}>
                    <p className="font-bold">
                    {option.option}
                    </p>
                    <span>
                      <div class="w-[270px] bg-blue-300 rounded-full dark:bg-gray-700">
                        <div
                          class={`${option.percentage === 0 ? ("bg-blue-300") : ("bg-blue-600")} text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full`}
                          style={option.percentage !== 0 ? { width: `${option.percentage}%` } : null}
                        >
                          
                          {option.percentage}%
                        </div>
                      </div>
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          )))
        : (<p>No current polls</p>)}
        </ul>
        <button className="hover:bg-teal-200 rounded-full" style={{ marginRight: "-40px" }} onClick={() => slideRight('slider1')}>
        <svg width="40px" height="40px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 22.4199C17.5228 22.4199 22 17.9428 22 12.4199C22 6.89707 17.5228 2.41992 12 2.41992C6.47715 2.41992 2 6.89707 2 12.4199C2 17.9428 6.47715 22.4199 12 22.4199Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M10.5596 8.41992L13.6196 11.29C13.778 11.4326 13.9047 11.6068 13.9914 11.8015C14.0781 11.9962 14.123 12.2068 14.123 12.4199C14.123 12.633 14.0781 12.8439 13.9914 13.0386C13.9047 13.2332 13.778 13.4075 13.6196 13.55L10.5596 16.4199" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </button>
      </div>
      <div className="flex justify-between">
      <h1 className="text-3xl text-teal-900 font-bold mb-4">Notes</h1>
      <button
        className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-full mb-4"
        onClick={() => setShowNotePopup(true)}
      >
        Create Note
      </button>
      </div>
      {showNotePopup && (
  <div className="fixed z-20 top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-8 rounded-lg h-fit shadow-md max-w-md">
      <h2 className="text-2xl font-semibold mb-4">Create Note</h2>
      <form onSubmit={handleNoteCreate} className="mb-8 space-y-3">
        <div>
          <label htmlFor="noteTitle" className="block text-sm font-medium text-gray-700">Note Title</label>
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
          <label htmlFor="noteDescription" className="block text-sm font-medium text-gray-700 mt-4">Note Description</label>
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
        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md w-1/2 mr-2"
          >
            Create
          </button>
          <button
            onClick={() => setShowNotePopup(false)}
            className="bg-red-500 text-white px-4 py-2 rounded-md w-1/2 ml-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}

{showUpdateNotePopup && (
  <div className="fixed z-20 top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-8 rounded-lg h-fit shadow-md max-w-md">
      <h2 className="text-2xl font-semibold mb-4">Create Note</h2>
      <form onSubmit={noteUpdate} className="mb-8 space-y-3">
        <div>
          <label htmlFor="noteTitle" className="block text-sm font-medium text-gray-700">Note Title</label>
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
          <label htmlFor="noteDescription" className="block text-sm font-medium text-gray-700 mt-4">Note Description</label>
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
        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md w-1/2 mr-2"
          >
            Update
          </button>
          <button
            onClick={() => setShowUpdateNotePopup(false)}
            className="bg-red-500 text-white px-4 py-2 rounded-md w-1/2 ml-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}

      <div className="flex items-center">
      <button className="hover:bg-teal-200 rounded-full" style={{ marginLeft: "-40px" }} onClick={() => slideLeft('slider2')}>
        <svg width="40px" height="40px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 22.4199C17.5228 22.4199 22 17.9428 22 12.4199C22 6.89707 17.5228 2.41992 12 2.41992C6.47715 2.41992 2 6.89707 2 12.4199C2 17.9428 6.47715 22.4199 12 22.4199Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M13.4102 16.4199L10.3502 13.55C10.1944 13.4059 10.0702 13.2311 9.98526 13.0366C9.9003 12.8422 9.85645 12.6321 9.85645 12.4199C9.85645 12.2077 9.9003 11.9979 9.98526 11.8035C10.0702 11.609 10.1944 11.4342 10.3502 11.29L13.4102 8.41992" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </button>
        <ul id="slider2" className="flex w-full overflow-x-scroll scroll  scroll-smooth scrollbar-hide mt-10 space-x-8">
          {notes.length !== 0 ? ( notes.map((note,index) => (
            <li key={index} className="mb-4 ml-2 mt-2 outline outline-teal-800 rounded p-3 w-[300px]">
              <div className="flex justify-end">
              <div onClick={() => handleUpdateNotePopup(note._id, note.title, note.description)} className="hover:bg-blue-100 rounded-full w-fit">
              <svg fill="#000000" width="30px" height="30px" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path class="st0" d="M12 25l3 3 15-15-3-3-15 15zM11 26l3 3-4 1z"></path></g></svg>
              </div>
              <div onClick={() => handleNoteDelete(note._id)} className="hover:bg-blue-100 rounded-full w-fit">
              <svg className="cursor-pointer" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12V17" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
              </div>
              </div>
              <h3 className="text-lg mt-5 font-semibold text-teal-900">{note.title}</h3>
              <p className="text-m mt-5 font-normal text-teal-900">{note.description}</p>
              <div className="flex justify-end">
                <p className="text-m mt-5 font-normal text-teal-900">{note.timestamp}</p>
              </div>
            </li>
          )))
        : (<p>No current Notes</p>)}
        </ul>
        <button className="hover:bg-teal-200 rounded-full" style={{ marginRight: "-40px" }} onClick={() => slideRight('slider2')}>
        <svg width="40px" height="40px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 22.4199C17.5228 22.4199 22 17.9428 22 12.4199C22 6.89707 17.5228 2.41992 12 2.41992C6.47715 2.41992 2 6.89707 2 12.4199C2 17.9428 6.47715 22.4199 12 22.4199Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M10.5596 8.41992L13.6196 11.29C13.778 11.4326 13.9047 11.6068 13.9914 11.8015C14.0781 11.9962 14.123 12.2068 14.123 12.4199C14.123 12.633 14.0781 12.8439 13.9914 13.0386C13.9047 13.2332 13.778 13.4075 13.6196 13.55L10.5596 16.4199" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </button>
      </div>
    </div>
  );
};

export default TeacherHomePage;