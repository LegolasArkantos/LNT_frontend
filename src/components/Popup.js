import React from 'react'

const Popup = (props) => {
  return (
    <div className="fixed z-50 overflow-y-auto top-0 left-0 bg-opacity-50 bg-gray-900 w-screen h-screen">
          <div class="flex justify-center items-center mt-40">
            <div class="p-4 w-full max-w-md max-h-full ">
              <div class="bg-purple-300 rounded-lg shadow dark:bg-gray-700">
                <div class="p-4 md:p-5 text-center space-y-10">
                  <h3 class="mb-5 text-lg font-bold text-m text-gray-700">
                    {props.message}
                  </h3>
                  <button
                    data-modal-hide="popup-modal"
                    onClick={() => {
                        props.setPopup(false)
                        if (props.purpose === "enroll") {
                          window.history.back();
                        }
                        if (props.purpose === "signup"){
                          props.onConfirm()
                        }
                        if (props.purpose === "course-creation") {
                          props.onConfirm()
                        }
                    }}
                    type="button"
                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Popup