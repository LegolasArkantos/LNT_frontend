import React from "react";
import { useState } from "react";
const TeacherHomePage = () => {
  const [polls, setPolls] = useState([]);
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const addPoll = (e) => {
    e.preventDefault();
    // Check if at least two options are added
    if (options.length >= 2) {
      const filteredOptions = options.filter((option) => option.trim() !== "");
      polls.push({
        title,
        options: filteredOptions,
      });
      setPolls(polls);
      setTitle("");
      setOptions([]);
      setShowPopup(false);
    } else {
      // If less than two options are added, display an alert or handle it accordingly
      alert("Please add at least two options before creating the poll.");
    }
  };
  

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleCancel = () => {
    setShowPopup(false);
    setOptions([]);
    setTitle("");
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
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Create Poll</h2>
            <form onSubmit={addPoll} className="mb-8 space-y-3">
              <input
                type="text"
                placeholder="Enter poll question"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
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
      <div>
        <ul className="flex space-x-5">
          {polls.length !== 0 ? ( polls.map((poll) => (
            <li key={poll.id} className="mb-4  outline outline-teal-800 rounded p-3 w-[200px] h-fit">
              <div className="flex justify-end">
              <div className="hover:bg-blue-100 rounded-full w-fit">
              <svg className="cursor-pointer" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12V17" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
              </div>
              </div>
              <h3 className="text-lg mt-5 font-semibold text-teal-900">{poll.title}</h3>
              <ul className="mt-5 ">
                {poll.options.map((option, index) => (
                  <li key={index}>
                    <p className="font-bold">
                    {option}
                    </p>
                    <span>
                      <div class="w-full bg-blue-300 rounded-full dark:bg-gray-700">
                        <div
                          class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                          style={{ width: "45%" }}
                        >
                          {" "}
                          45%
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
      </div>
    </div>
  );
};

export default TeacherHomePage;