"use client";
import React from "react";
import { LuCalendarDays } from "react-icons/lu";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { Button, Divider } from "@nextui-org/react";
import {BsThreeDotsVertical} from "react-icons/bs"

const EventsList = [
  {
    name: "10 Events Invites",
    place: "",
    icon: <LuCalendarDays className={"text-lg"} />,
  },
  {
    name: "Design System Collaboration",
    place: "Thu - Ha Dong, Ha Noi",
    icon: <LuCalendarDays className={"text-lg"} />,
  },
  {
    name: "Web Dev 2.0 Meetup",
    place: "Cau Giay, Ha Noi",
    icon: <LuCalendarDays className={"text-lg"} />,
  },
  {
    name: "Prada's Invitation Birthday",
    place: "",
    icon: <LiaBirthdayCakeSolid className={"text-lg"} />,
  },
];

const Events = () => {
  return (
    <div className="p-4 bg-white mt-4 rounded-2xl drop-shadow-custom dark:bg-neutral-800">
      <div className="flex justify-between items-start">
        <h2 className="text-sm font-medium text-gray-800 dark:text-gray-400 pb-4">
          Events
        </h2>
        <button>
            <BsThreeDotsVertical clasName="text-gray-800 dark:text-gray-400"/>
        </button>
      </div>

      <Divider className="mb-4" />

      <div className="space-y-2">
        {EventsList.map((event) => (
          <div className="flex items-center space-x-2">
            {event.icon}
            <div>
              <p className="font-semibold">{event.name}</p>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                {event.place}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
