import { useState } from "react";
import { api } from "../services/api";
import { setAuthValues } from "../features/auth";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import logo from '../assets/l-t-high-resolution-logo-transparent.png'

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api
        .post(
          "/auth/login",
          {
            email,
            password,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.status === 200) {
            const { accessToken } = res.data;
            console.log(accessToken);
            const decodedToken = jwtDecode(accessToken);
            const role = decodedToken.role;
            dispatch(setAuthValues({ role, accessToken }));
            if (decodedToken.role === "Admin") {
              navigate("/admin-dashboard");
            } else if (decodedToken.role === "Student") {
              navigate("/home-page");
            } else {
              navigate("/home-page");
            }
          }
        });
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  return (
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg-gray-200 dark:bg-gray-900">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-10">
          <div class="flex mb-10 items-center justify-center space-x-3 rtl:space-x-reverse">
            <img src={logo} class="h-8" />
          </div>
          <h1 class="text-2xl font-bold">Sign In to your Account</h1>
          <form class="max-w-sm mx-auto pt-5" onSubmit={submit}>
            <div class="mb-5">
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                class="bg-gray-50 border border-[#7179C6] text-gray-900 text-sm rounded-lg focus:ring-[#7179C6] focus:border-[#7179C6] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@gmail.com"
                required
              />
            </div>
            <div class="mb-5">
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                class="bg-gray-50 mb-5 border border-[#7179C6] text-gray-900 text-sm rounded-lg focus:ring-[#7179C6] focus:border-[#7179C6] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="•••••••••"
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>} 
            <button
              type="submit"
              class="text-white bg-[#7179C6] hover:bg-purple-500 focus:ring-4 focus:outline-none focus:ring-purple-500 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
            >
              Sign in
            </button>
            <div className="mt-3 flex items-center">
            <p className="text-gray-600">
            Dont have an account?
            </p>
          <a href="signup" className="text-sm text-[#7179C6] ml-2 font-semibold hover:underline cursor-pointer">
          Sign up
            </a>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
