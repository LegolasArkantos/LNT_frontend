import React from "react";
import { useState } from "react";
const TeacherHomePage = () => {
  const [polls, setPolls] = useState([]);
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const addPoll = (e) => {
    e.preventDefault();
    polls.push({
      title,
      options: options.filter((option) => option.trim() !== ""),
    });
    setPolls(polls);
    setTitle("");
    setOptions([]);
    setShowPopup(false);
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
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">Polls</h1>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md mb-4"
        onClick={() => setShowPopup(true)}
      >
        Create Poll
      </button>
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
        <ul>
          {polls.map((poll) => (
            <li key={poll.id} className="mb-4">
              <h3 className="text-lg font-semibold">{poll.title}</h3>
              <ul>
                {poll.options.map((option, index) => (
                  <li key={index}>
                    {option}
                    <span>
                      <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
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
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeacherHomePage;
