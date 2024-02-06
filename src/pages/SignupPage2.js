import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import logo from "../assets/l-t-high-resolution-logo-transparent.png";
import lmage from "../assets/image-.png";

const SignUpPage2 = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [progress, setProgress] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("Teacher");
  const [educationalCredential, setEducationalCredential] = useState("");
  const [educationalLevel, setEducationalLevel] = useState("");
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [aboutMe, setAboutMe] = useState("");
  const [fileError, setFileError] = useState("");

  // Extracting email and password data from location state
  const { email, password } = location.state || {};

  const submit = (e) => {
    e.preventDefault();
  
    // Log the values
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Role:", role);
    console.log(aboutMe);

  
    if (role === "Teacher") {
      console.log("Educational Credential:", educationalCredential);
    } else if (role === "Student") {
      console.log("educational level", educationalLevel);
    }
  
    // Increase progress bar by one
    setProgress((prevProgress) => Math.min(prevProgress + 1, 3));
  
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        setTimeout(() => {
          // Navigate to the next page
          navigate("/signup3", {
            state: {
              email,
              password,
              firstName,
              lastName,
              role,
              educationalCredential,
              educationalLevel,
              profilePicture: reader.result,
              aboutMe,
            },
          });
        }, 1000);
      };
      reader.onerror = () => {
        console.error("AHHHHHHHH!!");
      };
    } else {
      // Handle the case where no file is selected
      console.error("No file selected");
      setFileError("Please upload a profile picture.");
      // You can show an error message or take other actions as needed
    }
  };
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      previewFile(file);
      setSelectedFile(file);
      setFileInputState(e.target.value);
      setFileError(""); // Clear the error state
    } else {
      // Handle the case where no file is selected
      setPreviewSource("");
      setSelectedFile(null);
      setFileInputState("");
      setFileError("Please upload a valid image."); // Set the error state
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };


  return (
    <div className="  w-full bg-white rounded-lg min-h-screen shadow dark:border dark:bg-gray-800 dark:border-gray-700 transition-all duration-1000 ease-in-out">
      <div className="p-10">
        <div className="flex mb-10 items-center justify-center space-x-3 rtl:space-x-reverse">
          <img src={logo} alt="Logo" className="h-8" />
        </div>

        {/* Progress Bar */}
        <div className="mb-5 relative pt-1 flex-col mb-2 items-center justify-between ">
          <ul className="flex relative pt-1">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-full bg-gray-300 rounded-full h-2 transition-all duration-1000 ease-in-out ${
                  progress >= step ? "bg-teal-400" : ""
                }`}
              ></div>
            ))}
          </ul>
        </div>

        {/* Form */}
        <form className="max-w-sm mx-auto pt-5" onSubmit={submit}>
          {/* Upload Image Icon */}
              <div className="flex flex-col items-center mt-3">
                <label htmlFor="imageUpload" className="cursor-pointer">
                  {previewSource ? (
                    <img
                      src={previewSource}
                      alt="Image"
                      className="h-[150px] w-[150px] text-gray-500 dark:text-gray-400 mb-2"
                    />
                  ) : (
                    <img
                      src={lmage}
                      alt="Image"
                      className="h-[150px] w-[150px] text-gray-500 dark:text-gray-400 mb-2"
                    />
                  )}
                </label>
                <label
                  htmlFor="imageUpload"
                  className="cursor-pointer text-sm text-gray-700 dark:text-gray-300"
                >
                  Upload Image
                </label>
                {/* Input for file upload */}
                <input
                  type="file"
                  id="imageUpload"
                  className="hidden"
                  onChange={handleFileInputChange}
                  value={fileInputState}
                  // Add event handlers for image upload if needed
                />
                {fileError && (
                   <p className="text-red-500 text-xs mt-1">{fileError}</p>
                )}
              </div>

          <div className="mb-5">
            <label
              htmlFor="firstName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="lastName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Doe"
              required
            />
          </div>
          <div className="mb-5">
                <label
                  htmlFor="aboutMe"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  About Me
                </label>
                <textarea
                  id="aboutMe"
                  value={aboutMe}
                  onChange={(e) => setAboutMe(e.target.value)}
                  rows="4"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 resize-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Tell us about yourself..."
                  required
                />
              </div>
          <div className="mb-5">
            <label
              htmlFor="role"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              <option value="Teacher">Teacher</option>
              <option value="Student">Student</option>
            </select>
          </div>
          {role === "Teacher" ? (
            <div className="mb-5">
              <label
                htmlFor="educationalCredential"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Educational Credential
              </label>
              <input
                type="text"
                id="educationalCredential"
                value={educationalCredential}
                onChange={(e) => setEducationalCredential(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Ph.D. in Computer Science"
                required
              />
            </div>
          ) : (
            <div className="mb-5">
              <label
                htmlFor="educationalLevel"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Educational Level
              </label>
              <input
                type="text"
                id="educationalLevel"
                value={educationalLevel}
                onChange={(e) => setEducationalLevel(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="IBA-Undergraduate"
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="text-white bg-teal-400 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage2;
