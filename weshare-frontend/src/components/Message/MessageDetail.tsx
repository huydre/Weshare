"use client";
import { useRedux } from "@/hooks/useRedux";
import { ParticipantsMessage, Target } from "@/interfaces/interface";
import { getMessageParticipants, createMessage } from "@/services/message";
import { Avatar, Button, Input, Textarea } from "@nextui-org/react";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import Messager from "../icon/Messager";

export const MessageDetail = ({
  targetID,
  targetInfo,
}: {
  targetID: number;
  targetInfo: Target;
}) => {
  const textRef = useRef<HTMLTextAreaElement>(null);

  const [messages, setMessage] = useState<ParticipantsMessage[] | null>(null);
  const [target, setTarget] = useState<String>("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const { userLogged } = useRedux();

  useEffect(() => {
    setLoading(true);
    const interval = setInterval(() => {
      async function fetchUser() {
        try {
          if (targetID) {
            const userResponse = await getMessageParticipants(
              userLogged!.id,
              Number(targetID)
            );
            setMessage(userResponse);
            setLoading(false);
          }
        } catch (error) {
          console.log(error);
        }
      }
      fetchUser();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [targetID]);

  const handleSendMessage = async () => {
    try {
      await createMessage({
        sender: userLogged?.id,
        receiver: targetID,
        body: text,
      });
      textRef.current!.value = "";
      // textRef.current!.blur();
      setText("");
      console.log("Sent message!");
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(loading);

  return targetID ? (
    loading === false ? (
      <div className="w-full bg-white flex flex-col h-full justify-between dark:bg-neutral-900">
        <div className="h-full flex flex-col ">
          <div className="flex space-x-2 items-center border-b-2 dark:border-neutral-700 py-4 px-4">
            <Avatar
              src={`${process.env.NEXT_PUBLIC_API_URL}media/${targetInfo.image_url}`}
            />
            <h2 className="font-semibold capitalize">{`${targetInfo.first_name} ${targetInfo.last_name}`}</h2>
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
                <div className="flex space-x-2 items-center pt-2 max-w-[700px] mr-10">
                  <div>
                    <Avatar
                      className="w-[32px]"
                      src={`${process.env.NEXT_PUBLIC_API_URL}media/${targetInfo.image_url}`}
                      size="sm"
                    />
                  </div>
                  <div className="flex flex-col bg-gray-100 py-2 px-3 rounded-2xl dark:bg-neutral-700">
                    {message.body.split("\n").map((line) => (
                      <p>{line}</p>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div className="px-4 pb-4 pt-6 flex space-x-2 items-center">
          <Input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            maxRows={1}
            ref={textRef}
            onChange={(e) => {
              setText(e.target.value);
            }}
            radius="full"
            size="lg"
            variant="bordered"
            placeholder="Write something..."
          />
          <Button
            color="primary"
            isIconOnly
            onClick={() => handleSendMessage()}
          >
            <RiSendPlaneFill />
          </Button>
        </div>
      </div>
    ) : (
      <div className="w-full bg-white flex flex-col h-full justify-between dark:bg-neutral-900"></div>
    )
  ) : (
    <div className="w-full bg-white flex flex-col h-full justify-center dark:bg-neutral-900 text-center">
      <div className="flex justify-center w-full">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-center w-full">
            <Messager />
          </div>
          <h2>Your inbox</h2>
          <h2>Send messages to your friends!</h2>
        </div>
      </div>
    </div>
  );
};
