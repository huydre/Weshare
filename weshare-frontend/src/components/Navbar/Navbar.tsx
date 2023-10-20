"use client";
import { useAppSelector } from "@/redux/hooks";
import { InputSearch } from "./InputSearch";
import { Logo } from "./Logo";
import { ProfilePicture } from "./ProfilePicture";
import { useState } from "react";
import {IoMdNotificationsOutline} from 'react-icons/io'
import {IoBookmarkOutline, IoNotificationsOutline} from 'react-icons/io5'
import { Button } from "@nextui-org/react";

export const Navbar = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [showOptions, setShowOptions] = useState(false);

  const handleToggle = () => {
    setShowOptions(!showOptions);
  };

  return (
    <nav className="flex justify-between items-center h-[70px] bg-white dark:bg-neutral-900 py-1 px-[5%] sticky top-0 z-50 transition-colors duration-300 ease-in">
      <Logo />
      <InputSearch />
      <div className="flex space-x-4 items-center">
        <Button isIconOnly variant="light">
          <IoNotificationsOutline className="text-xl text-gray-600 dark:text-gray-300" />
        </Button>
        <Button isIconOnly variant="light">
          <IoBookmarkOutline className="text-xl text-gray-600 dark:text-gray-300" />
        </Button>
        <ProfilePicture user={user} image={user!.image} show={handleToggle} />
      </div>
    </nav>
  );
};
