import { LeftBar } from "@/components/LeftBar/LeftBar";
import React from "react";
import { MainSection } from "@/components/Message/MainSection";

const MessagePage = () => {
  return (
    <div className="flex h-[calc(100vh-70px)] ">
      {/* <LeftBar /> */}
      <MainSection />
    </div>
  );
};

export default MessagePage;
