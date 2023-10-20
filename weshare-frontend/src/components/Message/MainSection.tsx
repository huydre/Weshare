"use client";
import React, { useState } from "react";
import { MessageList } from "./MessageList";
import { MessageDetail } from "./MessageDetail";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

export const MainSection = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [target, setTarget] = useState<any>();
  const [targetInfo, setTargetInfo] = useState<any>();

  const updateTargetUser = (newTargetUser: any) => {
    setTarget(newTargetUser);
  };

  const updateTargetInfo = (newTargetInfo: any) => {
    setTargetInfo(newTargetInfo);
  };

  // console.log(targetInfo);

  return (
    <div className="flex px-[3%] w-full ">
      <MessageList
        setTargetUser={updateTargetUser}
        setTargetInfos={updateTargetInfo}
      />
      <MessageDetail targetID={target} targetInfo={targetInfo} />
      {/* <Button onPress={onOpen}>Open Modal</Button> */}
      
    </div>
  );
};
