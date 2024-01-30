import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from '../assets/l-t-high-resolution-logo-transparent.png';

const SignUpPage1 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [progress, setProgress] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
      setPasswordError("Password must be at least 8 characters long and include at least one digit, one lowercase letter, and one uppercase letter.");
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
      navigate("/signup2", { state: { email, password } });
    }, 1000);
  };

  return (
    <div className="w-full bg-white rounded-lg h-screen shadow dark:border dark:bg-gray-800 dark:border-gray-700 transition-all duration-1000 ease-in-out">
      <div className="p-10">
        <div className="flex mb-10 items-center justify-center space-x-3 rtl:space-x-reverse">
          <img src={logo} alt="Logo" className="h-8" />
        </div>

        {/* Progress Bar */}
        <div className="mb-5">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div className="flex flex-col w-full">
                <div className="flex relative pt-1">
                  <div className={`w-full bg-gray-300 rounded-full h-2 transition-all duration-1000 ease-in-out  ${progress >= 1 ? "bg-teal-400" : ""}`}></div>
                  <div className={`w-full bg-gray-300 rounded-full h-2 transition-all duration-1000 ease-in-out ${progress >= 2 ? "bg-teal-400" : ""}`}></div>
                  <div className={`w-full bg-gray-300 rounded-full h-2 transition-all duration-1000 ease-in-out ${progress === 3 ? "bg-teal-400" : ""}`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form className="max-w-sm mx-auto pt-5" onSubmit={submit}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
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
            {emailError && (
              <p className="text-red-500 text-sm">{emailError}</p>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="bg-gray-50 mb-2.5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="..................."
              required
            />
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
            <a href="signup" className="text-sm hover:underline cursor-pointer">
              Don't have an account? Sign up
            </a>
          </div>
          <button
            type="submit"
            className="text-white bg-teal-400 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage1;
