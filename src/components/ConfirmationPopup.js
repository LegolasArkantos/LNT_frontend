import React from 'react'

const ConfirmationPopup = (props) => {
  return (
    <div className="fixed z-40 top-0 left-0 bg-opacity-50 bg-gray-900 w-screen h-screen">
          <div class="flex justify-center items-center mt-40">
            <div class="p-4 w-full max-w-md max-h-full ">
              <div class="bg-purple-300 rounded-lg shadow dark:bg-gray-700">
                <div class="p-4 md:p-5 text-center">
                  <svg
                    class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    {props.message}
                  </h3>
                  <div className='flex justify-center space-x-4'>
                  <button
                    data-modal-hide="popup-modal"
                    onClick={() => props.setConfirmationPopup(false)}
                    type="button"
                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    No, cancel
                  </button>
                  <button
                    data-modal-hide="popup-modal"
                    type="button"
                    onClick={() => props.onConfirm()}
                    class="text-white bg-[#7179C6] hover:bg-purple-500 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm items-center px-5 py-2.5 text-center"
                  >
                    Yes, I'm sure
                  </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default ConfirmationPopup