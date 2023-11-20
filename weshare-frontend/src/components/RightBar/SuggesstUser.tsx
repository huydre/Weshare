"use client";
import { useRedux } from "@/hooks/useRedux";
import { User } from "@/interfaces/interface";
import { following, getFollow, unFollow } from "@/services/follow";
import { getUsers } from "@/services/user";
import { Avatar } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SuggesstUser = () => {
  const { userLogged } = useRedux();

  const [usersList, setUsersList] = useState<any>();
  const [followList, setFollowList] = useState<any>();
  const [followingUsers, setFollowingUsers] = useState<number[]>([]);

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

  useEffect(() => {
    async function fetchFollowList() {
      try {
        const userResponse = await getFollow(userLogged?.id);
        setFollowList(userResponse.following);
      } catch (error) {
        console.log(error);
      }
    }
    if (userLogged) fetchFollowList();
  }, []);

  // Filter out users who are already in the followList
  const suggestedUsers = usersList?.filter(
    (user: any) =>
      userLogged?.id !== user.id &&
      !followList?.some((follow: any) => follow.following === user.username)
  );

  const handleFollowing = async (userId: number) => {
    // Check if the user is already following or not
    const isFollowing = followingUsers.includes(userId);
    
    // console.log(userId)
    try {
      // Toggle follow status
      if (isFollowing) {
        await unFollow(userLogged?.id, userId);
        setFollowingUsers((prevFollowing) => prevFollowing.filter((u) => u !== userId));
        toast.success("Unfollowed", { duration: 2500 });
      } else {
        await following({
          follower: userLogged?.id,
          following: userId,
        });
        // Update followingUsers after a successful follow API call
        setFollowingUsers((prevFollowing) => [...prevFollowing, userId]);
        toast.success("Followed", { duration: 2500 });
      }
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };

  // console.log(suggestedUsers);

  return (
    <div className="bg-white p-4 rounded-2xl drop-shadow-custom dark:bg-neutral-800">
      <h2 className="text-sm font-medium text-gray-800 dark:text-gray-400 ">
        Suggestions for you
      </h2>

      <div className="space-y-4 pt-4">
        {suggestedUsers &&
          suggestedUsers.slice(0, 10).map(
            (user: User, key: number) =>
              userLogged!.id !== user.id && (
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2 items-center cursor-pointer">
                    <Avatar
                      src={`${process.env.NEXT_PUBLIC_API_URL}${user.image}`}
                    />
                    <p className="text-sm font-medium">{user.username}</p>
                  </div>
                  <div>
                  <button
                  className={`text-sm text-primary font-medium hover:text-blue-300 cursor-pointer ${followingUsers.includes(user.id) && "text-[#A3A3A3] dark:text-gray-300"}`}
                  onClick={() => handleFollowing(user.id)}
                >
                  {followingUsers.includes(user.id) ? "Following" : "Follow"}
                </button>
                  </div>
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default SuggesstUser;
