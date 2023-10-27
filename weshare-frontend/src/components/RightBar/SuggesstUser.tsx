"use client";
import { useRedux } from "@/hooks/useRedux";
import { User } from "@/interfaces/interface";
import { getUsers } from "@/services/user";
import { Avatar } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

const SuggesstUser = () => {
  const { userLogged } = useRedux();

  const [usersList, setUsersList] = useState<any>();

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

  // console.log(usersList);

  return (
    <div className="bg-white p-4 rounded-2xl drop-shadow-custom dark:bg-neutral-800">
      <h2 className="text-sm font-medium text-gray-800 dark:text-gray-400 ">
        Suggestions for you
      </h2>

      <div className="space-y-4 pt-4">
        {usersList &&
          usersList.slice(0, 10).map(
            (user: User) =>
              userLogged!.id !== user.id && (
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2 items-center cursor-pointer">
                    <Avatar
                      src={`${process.env.NEXT_PUBLIC_API_URL}${user.image}`}
                    />
                    <p className="text-sm font-medium">{user.username}</p>
                  </div>
                  <div>
                    <p className="text-sm text-primary font-medium hover:text-blue-100 cursor-pointer">Follow</p>
                  </div>
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default SuggesstUser;
