import React, { useEffect, useState } from "react";
import axios from "axios";
import { api_path_url, authToken } from "../secret";
import Cookies from "js-cookie";
import ChattingListCard from "./chatting/ChattingListCard";

function MyChat() {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    async function getChatList() {
      const id = Cookies.get("restaurantId");

      const { data } = await axios.get(
        `${api_path_url}/chat/restaurant/chat-list?id=${id}`,
        {
          headers: {
            "x-auth-token": authToken,
          },
        }
      );

      if (data.success) {
        setChatList(data.chatList);
      }

      console.log(data);
    }

    getChatList();
  }, []);

  return (
    <div>
      <header className="bg-gradient-to-r top-0 left-0 from-purple-200 to-blue-200 p-4 w-full fixed">
        <div className="flex flex-col items-center mb-2 mt-2 justify-between">
          <div className="w-full text-center">
            <span className="font-bold text-blue-700">My Chat</span>
          </div>
        </div>
      </header>
      <div className="mt-20"></div>
      <main className="flex px-12 flex-col w-full min-h-screen bg-white">
        {/* <div className="text-center">
        
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-full">
              <svg
                className="h-16 w-16 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5} // Corrected camelCase
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round" // Corrected camelCase
                  strokeLinejoin="round" // Corrected camelCase
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                />
              </svg>
            </div>
          </div>

         
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            No chat yet!
          </h2>
        </div> */}

        <div>
          {chatList?.map((item, index) => {
            return <ChattingListCard item={item} key={index} />;
          })}
        </div>
      </main>
    </div>
  );
}

export default MyChat;
