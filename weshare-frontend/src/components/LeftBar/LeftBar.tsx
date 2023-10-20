"use client";
import { useAppSelector } from "@/redux/hooks";
import { UserInformation } from "./UserInformation";
import { Menu } from "./Menu";

export const LeftBar = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="basis-[24%] space-y-4 sticky top-[85px] h-[calc(100vh-70px)] px-6">
      <UserInformation user={user}/>
      <Menu/>
    </div>
  );
};
