import Link from "next/link";
import React from "react";
import {TbPhoto, TbSmartHome} from "react-icons/tb"
import {FaUserFriends} from "react-icons/fa"
import {MdEvent, MdOndemandVideo} from "react-icons/md"
import {AiOutlineMessage} from "react-icons/ai"

const menus = [
  {
    name: "Feed",
    icon: <TbSmartHome/>,
    path: "/",
  },
  {
    name: "Message",
    icon: <AiOutlineMessage/>,
    path: "/message",
  },
  {
    name: "Friends",
    icon: <FaUserFriends/>,
    path: "#",
  },
  {
    name: "Watch Videos",
    icon: <MdOndemandVideo/>,
    path: "#",
  },
  {
    name: "Photos",
    icon: <TbPhoto/>,
    path: "/",
  },
];

export const Menu = () => {
  return (
    <div className="drop-shadow-custom">
      <div className="relative bg-neutral-50 rounded-xl p-4 space-y-2 dark:bg-neutral-800">
        {menus.map((menu, index) => {
          return (
            <Link href={menu.path} className={`flex items-center space-x-2 px-2 py-3 rounded-xl text-[0.9rem] transition duration-300 ease-in-out text-gray-400 ${menu.name === 'Feed' && "bg-primary cursor-pointer hover:bg-primary text-white dark:text-white"}`}>
              <div className="text-lg">{menu.icon}</div>
              <div>{menu.name}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
