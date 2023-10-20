"use client";
import { useRedux } from "@/hooks/useRedux";
import { UserMessage } from "@/interfaces/interface";
import { getMessageUser } from "@/services/message";
import React, { useEffect, useState } from "react";
import CreateMessage from "../icon/CreateMessage";
import { Avatar, Button } from "@nextui-org/react";


export const MessageList = () => {
  const [messageList, setMessageList] = useState<UserMessage[] | null>(null);

  const { userLogged } = useRedux();

  useEffect(() => {
    const interval = setInterval(() => {
      async function fetchUser() {
        try {
          const userResponse = await getMessageUser(userLogged!.id);
          setMessageList(userResponse);
        } catch (error) {
          console.log(error);
        }
      }
      if (userLogged) fetchUser();
    }, 3000);
    return () => {
      clearInterval(interval);
    }
  }, []);

  console.log(messageList)

  return (
    <div className="w-[33%] bg-white py-4 border-r-2">
      <div className="flex justify-between items-center px-4">
        <p className="text-xl font-semibold ">Message</p>
        <Button isIconOnly variant="light">
          <CreateMessage />
        </Button>
      </div>
      <div className="space-y-2 pt-6">
        {messageList != null &&
          messageList.map((message: UserMessage) => (
            <div className="h-16 w-full flex items-center px-4 space-x-2 justify-between hover:bg-gray-200 transition duration-300 ease-in-out">
              <div className="flex items-center space-x-2">
                <Avatar size="lg" name={message.participants[1]} />
                <div>
                  <h2 className="font-semibold">{message.participants[1]}</h2>
                  <p className="max-w-[290px] text-sm text-gray-600 font-medium truncate mr-2">
                    {message.last_message}
                  </p>
                </div>
              </div>

              {message.unread_count != 0 && (
                <div className="w-4 h-4 bg-red-500 rounded-full">
                  <p className=" text-white text-center text-xs font-semibold">
                    {message.unread_count}
                  </p>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};
