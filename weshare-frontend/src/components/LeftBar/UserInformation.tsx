'use client'
import { getFollow } from "@/services/follow";
import { Avatar } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";

export const UserInformation = ({ user }: { user: any }) => {
  const [follower, setFollower] = useState(0);
  const [following, setFollowing] = useState(0);

  useEffect(() => {
      async function fetchUser() {
        try {
          if (user) {
            const userResponse = await getFollow(
              user.id
            );
            setFollower(userResponse.followers.length)
            setFollowing(userResponse.following.length)
          }
        } catch (error) {
          console.log(error);
        }
      }
      fetchUser();
    },[user])

  // console.log(user)

  return (
    <div className="drop-shadow-custom">
      <div className="relative bg-neutral-50 rounded-xl p-4 dark:bg-neutral-800">
        <div className="bg-zinc-100 p-4 rounded-xl space-y-6 dark:bg-neutral-900/20">
          <div className="flex items-center space-x-2">
            <Avatar
              size="md"
              className="transition-transform"
              src={`${process.env.NEXT_PUBLIC_API_URL}${user?.image}`}
            />
            <div>
              <div className="flex items-center space-x-2">
                <p className="text-sm font-semibold">
                  {user?.first_name}
                  {` `}
                  {user?.last_name}
                </p>
                {user.is_staff && (
                  <div>
                    <BsFillCheckCircleFill
                      className={"text-blue-500 text-xs"}
                    />
                  </div>
                )}
              </div>

              <p className="text-[0.7rem]">@{user?.username}</p>
            </div>
          </div>

          <div className="flex justify-between items-center text-center">
            <div>
              <p className="text-[0.8rem] font-semibold">{follower}</p>
              <p className="text-[0.7rem]">Follower</p>
            </div>

            <div>
              <p className="text-[0.8rem] font-semibold">{following}</p>
              <p className="text-[0.7rem]">Following</p>
            </div>

            <div>
              <p className="text-[0.8rem] font-semibold">{user?.posts_count}</p>
              <p className="text-[0.7rem]">Post</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
