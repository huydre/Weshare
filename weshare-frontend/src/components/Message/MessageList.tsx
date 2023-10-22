"use client";
import { useRedux } from "@/hooks/useRedux";
import { User, UserMessage } from "@/interfaces/interface";
import { createMessage, getMessageUser } from "@/services/message";
import { getUsers } from "@/services/user";
import React, { useEffect, useRef, useState } from "react";
import CreateMessage from "../icon/CreateMessage";
import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";

export const MessageList = ({
  setTargetUser,
  setTargetInfos,
}: {
  setTargetUser: any;
  setTargetInfos: any;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const textRef = useRef<HTMLTextAreaElement>(null);

  const [targetUsers, setTargetUsers] = useState<number>();
  const [usersList, setUsersList] = useState<any>();
  const [messageList, setMessageList] = useState<UserMessage[] | null>(null);
  const [messageText, setMessageText] = useState<any>("");
  const [newMessageID, setNewMessageID] = useState();

  const { userLogged } = useRedux();

  useEffect(() => {
    const interval = setInterval(() => {
      async function fetchMessage() {
        try {
          const userResponse = await getMessageUser(userLogged!.id);
          setMessageList(userResponse);
        } catch (error) {
          console.log(error);
        }
      }
      if (userLogged) fetchMessage();
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Get users list
  useEffect(() => {
    async function fetchMessage() {
      try {
        const userResponse = await getUsers();
        setUsersList(userResponse);
      } catch (error) {
        console.log(error);
      }
    }
    if (userLogged) fetchMessage();
  }, []);

  // Send Message
  const handleSendMessage = async () => {
    try {
      await createMessage({
        sender: userLogged?.id,
        receiver: newMessageID,
        body: messageText,
      });
      textRef.current!.value = "";
      textRef.current!.blur();
      setMessageText("");
      console.log("Sent message!");
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(usersList);

  return (
    <div className="w-[33%] bg-white py-4 border-r-2 dark:border-neutral-700 dark:bg-neutral-900">
      <div className="flex justify-between items-center px-4">
        <p className="text-xl font-semibold ">Message</p>
        <Button onPress={onOpen} isIconOnly variant="light">
          <CreateMessage />
        </Button>
      </div>
      <div className="pt-6">
        {messageList != null &&
          messageList.map((message: UserMessage) => (
            <div
              onClick={() => {
                setTargetInfos(message.target);
                setTargetUser(message.target.id);
                setTargetUsers(message.target.id);
              }}
              className={`h-20 w-full flex items-center px-4 space-x-2 justify-between hover:bg-gray-200 transition duration-300 ease-in-out dark:hover:bg-neutral-800 ${
                targetUsers === message.target.id &&
                "bg-gray-200 dark:bg-neutral-800"
              }`}
            >
              <div className="flex items-center space-x-2">
                <Avatar
                  size="lg"
                  name={message.target.username}
                  src={`${process.env.NEXT_PUBLIC_API_URL}media/${message.target.image_url}`}
                />
                <div>
                  <h2 className="font-semibold">{`${message.target.first_name} ${message.target.last_name}`}</h2>
                  <p className={`max-w-[220px] text-sm text-gray-500 font-medium truncate mr-2 dark:text-neutral-400 ${message.unread_count > 0 && "text-black dark:text-white"}`}>
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

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                New Message
              </ModalHeader>
              <ModalBody>
                <div className="flex items-center space-x-4">
                  <p>To:</p>
                  <Select
                    selectedKeys={newMessageID}
                    variant="bordered"
                    placeholder="Select an user"
                    onSelectionChange={(e) => {
                      setNewMessageID(e.currentKey);
                    }}
                  >
                    {usersList.map(
                      (user: User) =>
                        user.id !== userLogged!.id && (
                          <SelectItem key={user.id} textValue={`${user.first_name} ${user.last_name}`}>
                            <div className="flex gap-2 items-center">
                              <Avatar
                                src={`${process.env.NEXT_PUBLIC_API_URL}${user.image}`}
                              />
                              <div className="flex flex-col">
                                <span className="text-small">{`${user.first_name} ${user.last_name}`}</span>
                                <span className="text-tiny text-default-400">
                                  {user.username}
                                </span>
                              </div>
                            </div>
                          </SelectItem>
                        )
                    )}
                  </Select>
                </div>
                <Textarea
                  ref={textRef}
                  onChange={(e) => setMessageText(e.target.value)}
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={() => handleSendMessage()}
                  color="primary"
                  onPress={onClose}
                >
                  Send
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
