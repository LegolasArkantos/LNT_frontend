import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from '../assets/l-t-high-resolution-logo-transparent.png';
import { api } from "../services/api";


const SignUpPage3 = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [progress, setProgress] = useState(2);
  const [personality, setPersonality] = useState(new Array(10).fill(0));
  const [errorMessage, setErrorMessage] = useState("");

  // Extracting previous data from location state
  const { email, password, firstName, lastName, role, educationalCredential, educationalLevel, profilePicture, aboutMe} = location.state || {};
  console.log(profilePicture)
  const submit = async (e) => {
    e.preventDefault();

    if (personality.includes(0)) {
        setErrorMessage("Please answer all personality questions.");
        return;
      }

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
      console.log("Educational Level:", educationalLevel);
    }

    console.log("Personality Questions:", personality);

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
      };
    console.log("payload",payload);
      try {
        
        const response = await api.post("/auth/signup", payload);
    
        
        console.log("API Response:", response);
    
        // Update progress bar and navigate after a delay
        setProgress(progress + 1);
    
        setTimeout(() => {
          navigate("/login");
        }, 1000);
    
        // You can dispatch or store the data in Redux state here if needed
        setErrorMessage(""); // Reset error message
      } catch (error) {
        // Handle API request error
        console.error("API Request Error:", error);
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

  return (
    <div className="w-full bg-white rounded-lg min-h-screen shadow dark:border dark:bg-gray-800 dark:border-gray-700 transition-all duration-1000 ease-in-out">
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

        {/* Personality Questions */}
        <form className="max-w-sm mx-auto pt-5" onSubmit={submit}>
          {questionList.map((questionObj, questionIndex) => (
            <div key={questionIndex} className="mb-5">
              <p className="text-gray-900 dark:text-white font-medium mb-2">
                {`Personality Question ${questionIndex + 1}: ${questionObj.question}`}
              </p>
              <div className="flex flex-col space-y-2">
                {questionObj.options.map((option, optionIndex) => (
                  <label key={optionIndex} className="flex items-center">
                    <input
                      type="radio"
                      name={`question${questionIndex}`}
                      value={optionIndex + 1}
                      checked={personality[questionIndex] === optionIndex + 1}
                      onChange={() => handleOptionChange(questionIndex, optionIndex)}
                      className="form-radio h-4 w-4 text-teal-600 transition duration-150 ease-in-out"
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          {errorMessage && (
            <p className="text-red-500 mb-3">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="text-white bg-teal-400 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage3;
