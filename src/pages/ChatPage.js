import React, { useEffect, useState } from "react";
import useAPIPrivate from "../hooks/useAPIPrivate";
import { useSelector } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";

const ChatPage = ({ socket }) => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [currentMessage, setCurrentMessage] = useState("");
  const [room, setRoom] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [deleteChat, setDeleteChat] = useState(null);
  const [otherImage, setOtherImage] = useState("");

  const apiPrivate = useAPIPrivate();
  const auth = useSelector((state) => state.auth.value);
  const profile = useSelector((state) =>
    auth.role === "Student"
      ? state.studentProfile.value
      : state.teacherProfile.value
  );

  const handleDeleteChat = async (chatID) => {
    try {
      await apiPrivate.delete("chat/delete/" + chatID).then((res) => {
        if (res.status === 200) {
          setChats((prevChats) =>
            prevChats.filter((chat) => chat._id !== chatID)
          );
          setDeleteChat(null);
          setSelectedChat(null);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChatClicked = async (chat) => {
    socket.emit("join_room", chat._id);
    try {
      await apiPrivate.get("chat/get-chat/" + chat._id).then((res) => {
        console.log(res);
        if (res.status === 200) {
          setMessageList(res.data.messages);
        }
      });
    } catch (error) {
      console.log(error);
    }
    setSelectedChat(chat);
    chat.participants.map((participant) => {
      if (participant.participant !== profile.profileID){
        setOtherImage(participant.profilePicture);
      }
    })
    setRoom(chat._id);
  };

  const handleMessageDelete = async (chatID, messageID) => {
    try {
      await apiPrivate
        .patch("chat/delete-message", { chatID: chatID, messageID: messageID })
        .then((res) => {
          if (res.status === 200) {
            console.log("hello");
            setMessageList((prevMessages) =>
              prevMessages.filter((message) => message._id !== messageID)
            );
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      setCurrentMessage("");
      if (currentMessage) {
        const messageData = {
          user: {
            ID: profile.profileID,
            role: auth.role,
            name: profile.firstName + " " + profile.lastName,
          },
          roomID: room,
          message: currentMessage,
          timestamp:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
        };

        socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);

        const result = await apiPrivate.post("chat/send-message", {
          chatID: room,
          message: {
            user: {
              ID: messageData.user.ID,
              role: messageData.user.role,
              name: messageData.user.name,
            },
            message: messageData.message,
            timestamp: messageData.timestamp
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket.off("receive_message").on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
      console.log(data);
    });
  }, [socket]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getChats = async () => {
      try {
        await apiPrivate.get("chat/").then((res) => {
          if (isMounted && res.status === 200) {
            console.log(res.status);
            setChats(res.data.chatRooms);
            console.log(chats);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    getChats();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="flex divide-x outline outline-teal-500 h-[700px] rounded-lg">
      <div className="flex-col w-2/5 bg-teal-100 p-5">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-teal-900 dark:text-white">
          Chats
        </h1>
        <ul class="divide-y space-y-5 divide-gray-200 dark:divide-gray-700 mt-5">
          {!chats ? (
            <p className="text-lg font-semibold text-gray-900 truncate dark:text-white">
              No Chats
            </p>
          ) : (
            chats.map((chat, index) => (
              <li
                key={index}
                class="py-3 sm:py-4 cursor-pointer outline outline-teal-400 bg-teal-300 rounded-full hover:outline-teal-700 rounded p-3"
                onClick={() => handleChatClicked(chat)}
              >
                <div class="flex items-center">
                  <div class="flex-1 min-w-0 ms-4">
                    {chat.participants.map((participant, index) => {
                      if (participant.participant !== profile.profileID) {
                        return (
                          <div class="flex">
                            <img
                              class="w-8 h-8 rounded-full"
                              src={participant.profilePicture}
                              alt="Neil image"
                            />

                            <p
                              key={index}
                              class="text-lg ml-3 font-semibold text-gray-900 truncate dark:text-white"
                            >
                              {participant.name}
                            </p>
                          </div>
                        );
                      }
                    })}
                  </div>
                  
                  <button
                    class=" self-center items-center p-2 text-sm font-medium text-center text-gray-900  rounded-full hover:bg-teal-100  focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteChat(chat);
                    }}
                  >
                    <svg
                      width="25px"
                      height="25px"
                      viewBox="0 0 1024 1024"
                      class="icon"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#000000"
                      className="cursor-pointer"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M154 260h568v700H154z" fill="#FF3B30"></path>
                        <path
                          d="M624.428 261.076v485.956c0 57.379-46.737 103.894-104.391 103.894h-362.56v107.246h566.815V261.076h-99.864z"
                          fill="#030504"
                        ></path>
                        <path
                          d="M320.5 870.07c-8.218 0-14.5-6.664-14.5-14.883V438.474c0-8.218 6.282-14.883 14.5-14.883s14.5 6.664 14.5 14.883v416.713c0 8.219-6.282 14.883-14.5 14.883zM543.5 870.07c-8.218 0-14.5-6.664-14.5-14.883V438.474c0-8.218 6.282-14.883 14.5-14.883s14.5 6.664 14.5 14.883v416.713c0 8.219-6.282 14.883-14.5 14.883z"
                          fill="#152B3C"
                        ></path>
                        <path
                          d="M721.185 345.717v-84.641H164.437z"
                          fill="#030504"
                        ></path>
                        <path
                          d="M633.596 235.166l-228.054-71.773 31.55-99.3 228.055 71.773z"
                          fill="#FF3B30"
                        ></path>
                        <path
                          d="M847.401 324.783c-2.223 0-4.475-0.333-6.706-1.034L185.038 117.401c-11.765-3.703-18.298-16.239-14.592-27.996 3.706-11.766 16.241-18.288 27.993-14.595l655.656 206.346c11.766 3.703 18.298 16.239 14.592 27.996-2.995 9.531-11.795 15.631-21.286 15.631z"
                          fill="#FF3B30"
                        ></path>
                      </g>
                    </svg>
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
      {deleteChat && (
        <div className="fixed z-20 overflow-y-auto top-0 left-0 bg-opacity-50 bg-gray-900 w-screen h-screen">
          <div class="flex justify-center items-center mt-60">
            <div class="p-4 w-full max-w-md max-h-full ">
              <div class="bg-teal-200 rounded-lg shadow dark:bg-gray-700">
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
                    Are you sure you want to delete this chat?
                  </h3>
                  <button
                    data-modal-hide="popup-modal"
                    type="button"
                    onClick={() => handleDeleteChat(deleteChat._id)}
                    class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    data-modal-hide="popup-modal"
                    onClick={() => setDeleteChat(null)}
                    type="button"
                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedChat ? (
        <div className="w-3/5 flex-col">
          <div className="flex">
            {selectedChat.participants.map((participant, index) => {
              if (participant.participant != profile.profileID) {
                return (
                  <div key={index} className="bg-teal-500 w-full">
                    <h1 className="ml-10 mt-3 text-2xl font-bold tracking-tight text-teal-900 dark:text-white">
                      {participant.name}
                    </h1>
                    <p className="ml-10 font-semibold tracking-tight text-teal-900">
                      {participant.role}
                    </p>
                  </div>
                );
              }
            })}
          </div>
          <div className="h-[550px] p-3 w-full">
            <ScrollToBottom className="h-full w-full flex-col">
              {messageList.map((messageContent, index) => {
                return messageContent.user.ID !== profile.profileID ? (
                  <li
                    key={index}
                    className="flex 
                   gap-2.5 mb-3  "
                  >
                    <img
                      class="w-8 h-8 rounded-full"
                      src={otherImage}
                      alt="Jese image"
                    />
                    <div
                      class="flex flex-col w-fit max-w-[320px] leading-1.5 p-4 bg-gray-200 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl
                     dark:bg-gray-700"
                    >
                      <div class="flex items-center space-x-2 rtl:space-x-reverse">
                        <span class="text-sm font-semibold text-gray-900 dark:text-white">
                          {messageContent.user.name}
                        </span>
                        <span class="text-sm font-normal text-gray-900 dark:text-gray-400">
                          {messageContent.timestamp}
                        </span>
                      </div>
                      <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                        {messageContent.message}
                      </p>
                    </div>
                    
                  </li>
                ) : (
                  <li
                    key={index}
                    className="flex 
                   gap-2.5 mb-3 justify-end"
                  >
                    <div
                      class="flex flex-col items-end w-fit max-w-[320px] leading-1.5 p-4 bg-green-500 border-gray-200 bg-gray-100 rounded-l-lg rounded-b-lg
                     dark:bg-gray-700"
                    >
                      <div class="flex items-center space-x-2 rtl:space-x-reverse">
                        <span class="text-sm font-semibold text-gray-900 dark:text-white">
                          You
                        </span>
                        <span class="text-sm font-normal text-gray-900 dark:text-gray-400">
                          {messageContent.timestamp}
                        </span>
                      </div>
                      <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                        {messageContent.message}
                      </p>
                    </div>
                    <img
                      class="w-8 h-8 rounded-full"
                      src={profile.profilePicture}
                      alt="Jese image"
                    />
                  </li>
                );
              })}
            </ScrollToBottom>
          </div>
          <div className="p-5">
            <form onSubmit={sendMessage}>
              <label
                for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div class="relative">
                <input
                  id="default-search"
                  class="block w-full p-4 text-sm text-gray-900 border border-blue-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Type a message"
                  value={currentMessage}
                  onChange={(e) => {
                    setCurrentMessage(e.target.value);
                  }}
                  required
                />
                <button
                  type="submit"
                  class="text-white absolute end-2.5 bottom-2.5  hover:bg-blue-200  focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 -0.5 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M19.1168 12.1484C19.474 12.3581 19.9336 12.2384 20.1432 11.8811C20.3528 11.5238 20.2331 11.0643 19.8758 10.8547L19.1168 12.1484ZM6.94331 4.13656L6.55624 4.77902L6.56378 4.78344L6.94331 4.13656ZM5.92408 4.1598L5.50816 3.5357L5.50816 3.5357L5.92408 4.1598ZM5.51031 5.09156L4.76841 5.20151C4.77575 5.25101 4.78802 5.29965 4.80505 5.34671L5.51031 5.09156ZM7.12405 11.7567C7.26496 12.1462 7.69495 12.3477 8.08446 12.2068C8.47397 12.0659 8.67549 11.6359 8.53458 11.2464L7.12405 11.7567ZM19.8758 12.1484C20.2331 11.9388 20.3528 11.4793 20.1432 11.122C19.9336 10.7648 19.474 10.6451 19.1168 10.8547L19.8758 12.1484ZM6.94331 18.8666L6.56375 18.2196L6.55627 18.2241L6.94331 18.8666ZM5.92408 18.8433L5.50815 19.4674H5.50815L5.92408 18.8433ZM5.51031 17.9116L4.80505 17.6564C4.78802 17.7035 4.77575 17.7521 4.76841 17.8016L5.51031 17.9116ZM8.53458 11.7567C8.67549 11.3672 8.47397 10.9372 8.08446 10.7963C7.69495 10.6554 7.26496 10.8569 7.12405 11.2464L8.53458 11.7567ZM19.4963 12.2516C19.9105 12.2516 20.2463 11.9158 20.2463 11.5016C20.2463 11.0873 19.9105 10.7516 19.4963 10.7516V12.2516ZM7.82931 10.7516C7.4151 10.7516 7.07931 11.0873 7.07931 11.5016C7.07931 11.9158 7.4151 12.2516 7.82931 12.2516V10.7516ZM19.8758 10.8547L7.32284 3.48968L6.56378 4.78344L19.1168 12.1484L19.8758 10.8547ZM7.33035 3.49414C6.76609 3.15419 6.05633 3.17038 5.50816 3.5357L6.34 4.78391C6.40506 4.74055 6.4893 4.73863 6.55627 4.77898L7.33035 3.49414ZM5.50816 3.5357C4.95998 3.90102 4.67184 4.54987 4.76841 5.20151L6.25221 4.98161C6.24075 4.90427 6.27494 4.82727 6.34 4.78391L5.50816 3.5357ZM4.80505 5.34671L7.12405 11.7567L8.53458 11.2464L6.21558 4.83641L4.80505 5.34671ZM19.1168 10.8547L6.56378 18.2197L7.32284 19.5134L19.8758 12.1484L19.1168 10.8547ZM6.55627 18.2241C6.4893 18.2645 6.40506 18.2626 6.34 18.2192L5.50815 19.4674C6.05633 19.8327 6.76609 19.8489 7.33035 19.509L6.55627 18.2241ZM6.34 18.2192C6.27494 18.1759 6.24075 18.0988 6.25221 18.0215L4.76841 17.8016C4.67184 18.4532 4.95998 19.1021 5.50815 19.4674L6.34 18.2192ZM6.21558 18.1667L8.53458 11.7567L7.12405 11.2464L4.80505 17.6564L6.21558 18.1667ZM19.4963 10.7516H7.82931V12.2516H19.4963V10.7516Z"
                        fill="#000000"
                      ></path>{" "}
                    </g>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="w-3/5 flex items-center justify-center h-[550px]">
          <p className="text-lg font-semibold text-gray-900 truncate dark:text-white">
            No chat selected
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
