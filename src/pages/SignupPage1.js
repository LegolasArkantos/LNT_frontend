import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/l-t-high-resolution-logo-transparent.png";
import image from "../assets/signuppage1image.png"
const SignUpPage1 = () => {
  const navigate = useNavigate();

  const [progress, setProgress] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const submit = async (e) => {
    e.preventDefault();

    // Validate email format
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      setPasswordError(""); // Clear password error if email is invalid
      return; // Do not proceed if email format is incorrect
    }

    // Validate password format
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and include at least one digit, one lowercase letter, and one uppercase letter."
      );
      setEmailError(""); // Clear email error if password is invalid
      return; // Do not proceed if password format is incorrect
    }

    // Clear errors if both email and password are valid
    setEmailError("");
    setPasswordError("");

    // Log the values of email and password
    console.log("Email:", email);
    console.log("Password:", password);

    // Increase progress bar by one
    setProgress((prevProgress) => Math.min(prevProgress + 1, 3));

    // Wait for 1 second for the animation to play
    setTimeout(() => {
      // Navigate to the next page
      navigate("/signup2", { state: { email, password, firstName, lastName } });
    }, 1000);
  };

  return (
    <div className="w-full flex bg-white rounded-lg h-full shadow dark:border dark:bg-gray-800 dark:border-gray-700 transition-all duration-1000 ease-in-out">
      <div className="w-full z-20 h-full flex bg-[#7179C6] absolute inset-0">
        <div className="w-2/5 h-full flex items-center justify-center">
          <div className="flex-col">
            <div className="flex items-center mb-10 justify-center">
              <h className="text-3xl font-semibold text-white">
                Step 1
              </h>
            </div>
            <img src={image} class="w-85 h-70" />
          </div>
        
        </div>
      
</div>
<div className="w-full h-full z-30 flex absolute inset-0">
<div className="w-2/5 h-full " >
      
      </div>
    <div className=" w-3/5 rounded-tl-3xl rounded-bl-3xl h-full bg-white shadow-2xl">
    <div className="mb-5 relative p-5 flex-col mb-2 items-center justify-between ">
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
        </div>
    <form className="max-w-sm mx-auto w-3/5 h-3/5 mt-12 " onSubmit={submit}>
    <h className="text-2xl font-bold">
          Create Account
        </h>
          <div className="flex space-x-5 mt-10 mb-2">
            <div className="flex-col">
          <label
              htmlFor="first name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              First Name
            </label>
            <input
              type="normal"
              id="first name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John"
              required
            />
            </div>
            <div className="flex-col">
          <label
              htmlFor="last name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Last Name
            </label>
            <input
              type="normal"
              id="last name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Doe"
              required
            />
            </div>
          </div>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@gmail.com"
              required
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="bg-gray-50 mb-2.5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="•••••••••"
              required
            />
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
          </div>
          <button
            type="submit"
            className="text-white bg-[#7179C6] hover:bg-purple-500 focus:ring-4 focus:outline-none focus:ring-purple-500 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center"
          >
            Next
          </button>
          <div className="mt-3 flex items-center">
            <p className="text-gray-600">
            Already have an account?
            </p>
          <a href="login" className="text-sm text-[#7179C6] ml-2 font-semibold hover:underline cursor-pointer">
               Login in
            </a>
          </div>
          
        </form>
    </div>
</div>
      
      {/* <div className="p-10">
        <div className="flex mb-10 items-center justify-center space-x-3 rtl:space-x-reverse">
          <img src={logo} alt="Logo" className="h-8" />
        </div> */}

        
        {/* Progress Bar */}
        {/* <div className="mb-5 relative pt-1 flex-col mb-2 items-center justify-between ">
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
        </div> */}

        {/* Form */}
        {/* <form className="max-w-sm mx-auto mt-40 " onSubmit={submit}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@gmail.com"
              required
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="bg-gray-50 mb-2.5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="•••••••••"
              required
            />
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
            <a href="login" className="text-sm hover:underline cursor-pointer">
              Already have an account? Login in
            </a>
          </div>
          <button
            type="submit"
            className="text-white bg-teal-400 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Next
          </button>
        </form>
      </div> */}
    </div>
  );
};

export default SignUpPage1;
