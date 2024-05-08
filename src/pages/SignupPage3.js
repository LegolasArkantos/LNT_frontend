import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from '../assets/l-t-high-resolution-logo-transparent.png';
import image from "../assets/signuppage2image.png"
import { api } from "../services/api";
import { getStorage,ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from '../services/firebase'
import image1 from "../assets/pt1.png"
import image2 from "../assets/pt2.png"
import image3 from "../assets/pt3.png"
import image4 from "../assets/pt4.png"
import image5 from "../assets/pt5.png"
import image6 from "../assets/pt6.png"
import image7 from "../assets/pt7.png"
import image8 from "../assets/pt8.png"
import image9 from "../assets/pt9.png"
import image10 from "../assets/pt10.png"

// Initialize Firebase Storage
const storage = getStorage(app);

const SignUpPage3 = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [progress, setProgress] = useState(2);
  const [personality, setPersonality] = useState(new Array(10).fill(0));
  const [errorMessage, setErrorMessage] = useState("");

  // Extracting previous data from location state
  const { email, password, firstName, lastName, role, educationalCredential, educationalLevel, profilePicture, aboutMe,teacherFiles} = location.state || {};
  console.log(profilePicture)

  const submit = async (e) => {
  e.preventDefault();

  if (personality.includes(0)) {
    setErrorMessage("Please answer all personality questions.");
    return;
  }

  try {
    const teacherFilesArray = Array.from(teacherFiles);

    // Upload each file to Firebase Storage and get download URLs
    const fileUploadPromises = teacherFilesArray.map(async (file) => {
      const storageRef = ref(storage, file.name);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return { fileName: file.name, fileUrl: downloadURL };
    });

    const uploadedFiles = await Promise.all(fileUploadPromises);
    console.log("Uploaded files:", uploadedFiles);

    // Upload profile picture to Firebase Storage
    const profileStorageRef = ref(storage, profilePicture.name);
    await uploadBytes(profileStorageRef, profilePicture);
    const profileDownloadURL = await getDownloadURL(profileStorageRef);
    console.log("Profile Picture URL:", profileDownloadURL);
   
    


    const payload = {
      email,
      password,
      firstName,
      lastName,
      role,
      educationalCredential,
      educationalLevel,
      personality,
      profilePicture:profileDownloadURL,
      aboutMe,
      credentialFiles: uploadedFiles, 
    };

    console.log("Payload:", payload);

    // Make API request to signup endpoint
    const response = await api.post("/auth/signup", payload);

    console.log("API Response:", response);

    // Update progress bar and navigate after a delay
    setProgress(progress + 1);

    setTimeout(() => {
      navigate("/login");
    }, 1000);

    // Reset error message
    setErrorMessage("");
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
    setErrorMessage("Failed to create an account. Please try again.");
  }
};

  const handleOptionChange = (questionIndex, optionIndex) => {
    setPersonality((prevPersonality) => {
      const newPersonality = [...prevPersonality];
      newPersonality[questionIndex] = optionIndex + 1; // Store the selected option (1, 2, or 3)
      return newPersonality;
    });
  };

  const questionList = [
    {
      question: "How do you typically recharge your energy?",
      options: [
        "By spending time alone ",
        "By being around others and socializing ",
        "It depends on the situation and my mood "
      ]
    },
    {
      question: "What motivates you the most?",
      options: [
        "Achieving personal goals and accomplishments ",
        "Positive feedback and recognition from others ",
        "The opportunity to learn and grow "
      ]
    },
    {
      question: "How do you handle stress?",
      options: [
        "Taking a break and practicing relaxation techniques ",
        "Seeking support and talking to others ",
        "Finding practical solutions and addressing the issues "
      ]
    },
    {
      question: "What describes your work style?",
      options: [
        "Methodical and organized ",
        "Collaborative and team-oriented ",
        "Adaptable and flexible "
      ]
    },
    {
      question: "How do you approach decision-making?",
      options: [
        "Carefully weighing all options and considering pros and cons ",
        "Consulting with others and seeking their input ",
        "Trusting my instincts and making quick decisions "
      ]
    },
    {
      question: "What is your communication style?",
      options: [
        "Thoughtful and detailed ",
        "Expressive and engaging ",
        "Flexible and adjusting based on the situation "
      ]
    },
    {
      question: "What do you value most in a learning environment?",
      options: [
        "Structured and organized lessons ",
        "Interactive and engaging activities ",
        "Adaptable and flexible approaches "
      ]
    },
    {
      question: "How do you handle feedback and criticism?",
      options: [
        "Reflecting on it and using it for improvement ",
        "Appreciating diverse perspectives and considering feedback ",
        "Taking it in stride and not letting it affect me "
      ]
    },
    {
      question: "What type of projects do you enjoy working on?",
      options: [
        "Projects that require careful planning and execution ",
        "Team projects with diverse contributions ",
        "Projects that allow for creativity and innovation "
      ]
    },
    {
      question: "How do you prefer to learn new things?",
      options: [
        "Through structured lessons and step-by-step instructions ",
        "Through collaboration and discussion with others ",
        "Through exploration and trying things out on my own "
      ]
    }
  ];

  const [progress, setProgress] = useState(2);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [personality, setPersonality] = useState(Array(questionList.length).fill(0));
  const [currentQuestionChecked, setCurrentQuestionChecked] = useState(false);
  const imageArray = [image1,image2,image3,image4,image5,image6,image7,image8,image9,image10];

  const handleOptionChange = (questionIndex, optionIndex) => {
    const newPersonality = [...personality];
    newPersonality[questionIndex] = optionIndex + 1;
    setCurrentQuestionChecked(true);
    setPersonality(newPersonality);
  };

  const goToNextQuestion = () => {
    if (currentQuestionChecked) {
      setCurrentQuestionChecked(false);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    
  };

  // Extracting previous data from location state
  const { email, password, firstName, lastName, role, educationalCredential, educationalLevel, profilePicture, aboutMe,teacherFiles} = location.state || {};

  const submit = async (e) => {
    e.preventDefault();
    
    if (currentQuestionChecked) {
      if (personality.includes(0)) {
        setErrorMessage("Please answer all personality questions.");
        return;
      }
  
      try {
        const teacherFilesArray = Array.from(teacherFiles);
  
        // Upload each file to Firebase Storage and get download URLs
        const fileUploadPromises = teacherFilesArray.map(async (file) => {
          const storageRef = ref(storage, file.name);
          await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(storageRef);
          return { fileName: file.name, fileUrl: downloadURL };
        });
  
        const uploadedFiles = await Promise.all(fileUploadPromises);
        console.log("Uploaded files:", uploadedFiles);
  
        const payload = {
          email,
          password,
          firstName,
          lastName,
          role,
          educationalCredential,
          educationalLevel,
          personality,
          profilePicture,
          aboutMe,
          credentialFiles: uploadedFiles, // Include credentialFiles in payload
        };
  
        console.log("Payload:", payload);
  
        // Make API request to signup endpoint
        const response = await api.post("/auth/signup", payload);
  
        console.log("API Response:", response);
  
        // Update progress bar and navigate after a delay
        setProgress(progress + 1);
  
        setTimeout(() => {
          navigate("/login");
        }, 1000);
  
        // Reset error message
        setErrorMessage("");
      } catch (error) {
        // Handle errors
        console.error("Error:", error);
        setErrorMessage("Failed to create an account. Please try again.");
      }
    }

    
  };

  return (
    <div className="w-full bg-white rounded-lg h-screen shadow dark:border dark:bg-gray-800 dark:border-gray-700 transition-all duration-1000 ease-in-out">
  <div className="w-full z-20 h-full flex bg-[#7179C6] absolute inset-0">
    <div className="w-2/5 h-full flex items-center justify-center">
      <div className="flex-col">
        <div className="flex items-center mb-10 justify-center">
          <h className="text-3xl font-semibold text-white">
            Step 3
          </h>
        </div>
        {imageArray.map((img,index) => (
          <div key={index} className={`left-0 top-40 flex items-center justify-center ${index === currentQuestionIndex ? '' : 'hidden'}`}>
            <img src={img} class="w-3/4 h-3/4" />
          </div>
        ))}
      </div>
    </div>
  </div>

  <div className="w-full h-full z-30 flex absolute inset-0">
    <div className="w-2/5 h-full"></div>
    <div className=" w-3/5 h-full rounded-tl-3xl rounded-bl-3xl bg-white shadow-2xl">
      <div className="mb-5 relative  p-5 flex-col mb-2 items-center justify-between ">
        <ul className="flex relative ">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`w-full bg-gray-300 rounded-full h-2 transition-all duration-1000 ease-in-out ${
                progress >= step ? "bg-purple-400" : ""
              }`}
            ></div>
          ))}
        </ul>
        <p className="text-white">
          {currentQuestionIndex + 1}/{questionList.length}
        </p>
      </div>
      <div className="flex items-center w-full h-2/5 justify-center">
        <form className="w-3/5 h-3/5 pt-5" onSubmit={submit}>
          {questionList.map((questionObj, questionIndex) => (
            <div key={questionIndex} className={questionIndex === currentQuestionIndex ? '' : 'hidden'}>
              <div className="flex items-center justify-center">
                <p className="text-[#191D63] font-bold mb-5">
                  {questionObj.question}
                </p>
              </div>
              <div className="flex flex-col space-y-3">
                {questionObj.options.map((option, optionIndex) => (
                  <label key={optionIndex} className="flex shadow w-full h-[50px] bg-[#F4F3F6] rounded p-1 items-center">
                    <input
                      type="radio"
                      name={`question${questionIndex}`}
                      value={optionIndex + 1}
                      checked={personality[questionIndex] === optionIndex + 1}
                      onChange={() => handleOptionChange(questionIndex, optionIndex)}
                      className="form-radio h-4 w-4 text-[#7179C6] transition duration-150 ease-in-out"
                    />
                    <span className="ml-2 font-semibold">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          {errorMessage && (
            <p className="text-red-500 mb-3">{errorMessage}</p>
          )}
          <div className="flex items-center justify-center">
          <div className="w-2/5">
            <div class="flex justify-end mb-1 mt-3">
              <span class="text-sm font-medium text-[#757575] dark:text-white">{currentQuestionIndex + 1}/{questionList.length}</span>
            </div>
            <div class="w-full bg-[#EDE8E3] rounded-full h-2.5 dark:bg-gray-700">
              <div class="bg-[#31CD63] h-2.5 rounded-full" style={{width: `${((currentQuestionIndex + 1) / questionList.length) * 100}%`}}></div>
            </div>
          </div>
          </div>
          <div className="flex justify-end mt-10">
            {currentQuestionIndex === questionList.length - 1 ? (
              <button
                type="submit"
                className="text-white bg-[#7179C6] cursor-pointer hover:bg-purple-500 focus:ring-4 focus:outline-none focus:ring-purple-500 font-medium rounded-lg text-sm px-5 w-[100px] py-2.5 text-center"
              >
                Submit
              </button>
            ) : (
              <button
                type="button"
                onClick={goToNextQuestion}
                className="text-white bg-[#7179C6] cursor-pointer hover:bg-purple-500 focus:ring-4 focus:outline-none focus:ring-purple-500 font-medium rounded-lg text-sm px-5 w-[100px] py-2.5 text-center"
              >
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

  );
};

export default SignUpPage3;
