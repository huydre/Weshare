import { AnimatedWrapper } from "@/components/AnimatedWrapper";
import { LeftBar } from "@/components/LeftBar/LeftBar";
import { MainSection } from "@/components/MainSection/MainSection";
import { RightBar } from "@/components/RightBar/RightBar";
import React from "react";

const HomePage = () => {
  return (
    <>
      <AnimatedWrapper>
        <div className="flex justify-between py-[13px] px-[3%] relative">
          <LeftBar />
          <MainSection />
          <RightBar />
        </div>
      </AnimatedWrapper>
    </>
  );
};

export default HomePage;
