import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/lntlogo-removebg-preview.png';
import { api } from '../services/api';
// import { Resend } from 'resend';

const ForgotPasswordPage = () => {

    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
          setLoading(true);
          const lowercasedEmail = email.toLowerCase()
          await api.post("auth/forgot-password", {email: lowercasedEmail}).then((res) => {
            if (res.status === 200) {
              alert(res.data.message);
              setLoading(false)
            }
          })
        } catch (error) {
          setLoading(false)
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
          <h1 class="text-2xl font-bold">Forgot Password</h1>
          <form class="max-w-sm mx-auto pt-5" onSubmit={submit}>
            <div class="mb-5">
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                class="bg-gray-50 border border-[#7179C6] text-gray-900 text-sm rounded-lg focus:ring-[#7179C6] focus:border-[#7179C6] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@gmail.com"
                required
              />
            </div>
            <div className="flex justify-end mb-2">
            </div>
            {error && <p className="text-red-500">{error}</p>} 
            {
              loading 
              ? (
                <button disabled type="button" class="text-white bg-[#7179C6] hover:bg-purple-500 focus:ring-4 focus:outline-none focus:ring-purple-500 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">
<svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
</svg>
Loading...
</button>
              )
              : (
                <button
              type="submit"
              class="text-white bg-[#7179C6] hover:bg-purple-500 focus:ring-4 focus:outline-none focus:ring-purple-500 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
            >
              Submit
            </button>
              )
            }
            <p class="text-xs text-gray-600 mt-3">
              Note: The email might be in your spam folder. Please check and mark it as not spam to ensure future emails are delivered to your inbox.
              </p>
            
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage