"use client";
import { useRedux } from "@/hooks/useRedux";
import { getUserHasStory } from "@/services/story";
import { Avatar } from "@nextui-org/react";
import Link from "next/link";
import React, {useEffect, useState} from "react";



export default function Story() {
  const { userLogged } = useRedux();
  
  const [stories, setStories] = useState<any>();

  useEffect(() => {
    async function fetchUserHasStoryList() {
      try {
        const userResponse = await getUserHasStory();
        setStories(userResponse);
      } catch (error) {
        console.log(error);
      }
    }
    if (userLogged) fetchUserHasStoryList();
  }, []);

  console.log(stories)

  return (
    <div className="w-full h-20 mb-2 flex flex-col justify-center px-2">
      <div className="flex space-x-6">
        {stories && stories.map((story: any) => (
          <Link href={`/story/${story.id}`} className="space-y-3">
            <Avatar
              size="lg"
              src={`${process.env.NEXT_PUBLIC_API_URL}${story.image}`}
              isBordered
              color="primary"
            />
            <p className="text-[0.68em] text-center truncate w-[56px] pb-2">{story.username}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
