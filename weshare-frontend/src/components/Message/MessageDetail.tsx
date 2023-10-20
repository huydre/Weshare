"use client";
import { useRedux } from "@/hooks/useRedux";
import { ParticipantsMessage } from "@/interfaces/interface";
import { getMessageParticipants, createMessage } from "@/services/message";
import { Avatar, Button, Input } from "@nextui-org/react";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";

export const MessageDetail = () => {
  const textRef = useRef<HTMLTextAreaElement>(null);

  const [messages, setMessage] = useState<ParticipantsMessage[] | null>(null);
  const [text, setText] = useState("");

  const { userLogged } = useRedux();

  useEffect(() => {
    const interval = setInterval(() => {
      async function fetchUser() {
        try {
          const userResponse = await getMessageParticipants(1, 2);
          setMessage(userResponse);
        } catch (error) {
          console.log(error);
        }
      }
      fetchUser();
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const GetUsernameReceiver = () => {
    if (messages)
      return messages[0].sender === userLogged?.username
        ? messages[0].receiver
        : messages[0].sender;
  };

  const handleSendMessage = async () => {
    try {
      await createMessage({
        sender: userLogged?.id,
        receiver: 2,
        body: text,
      });
      textRef.current!.value = "";
      textRef.current!.blur();
      setText("");
      console.log("Sent message!");
    } catch (error) {
      console.log(error);
    }
  };

  const usernameReceiver = GetUsernameReceiver();

  // console.log(text);

  return (
    <div className="w-full bg-white flex flex-col h-full justify-between">
      <div className="h-full flex flex-col ">
        <div className="flex space-x-2 items-center border-b-2 py-4 px-4">
          <Avatar />
          <h2 className="font-semibold capitalize">{usernameReceiver}</h2>
        </div>

        {/* Message  */}
        <div className="px-4 flex flex-col-reverse overflow-y-scroll h-[calc(100vh-232px)]">
          {messages?.map((message) =>
            message.sender === userLogged!.username ? (
              <div className="flex space-x-2 items-center justify-end pt-2 ">
                <div className="bg-blue-500 text-white py-2 px-3 rounded-2xl max-w-[700px]">
                  <p>{message.body}</p>
                </div>
              </div>
            ) : (
              <div className="flex space-x-2 items-center pt-2 max-w-[700px]">
                <Avatar size="sm" />
                <div className="bg-gray-100 py-2 px-3 rounded-2xl">
                  <p>{message.body}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <div className="px-4 pb-4 pt-6 flex space-x-2 items-center">
        <Input
          ref={textRef}
          onChange={(e) => {
            setText(e.target.value);
          }}
          radius="full"
          size="lg"
          variant="bordered"
          placeholder="Write something..."
        />
        <Button color="primary" isIconOnly onClick={() => handleSendMessage()}>
          <RiSendPlaneFill />
        </Button>
      </div>
    </div>
  );
};
