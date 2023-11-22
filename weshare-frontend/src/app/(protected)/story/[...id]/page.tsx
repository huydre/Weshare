"use client";
import { useRedux } from "@/hooks/useRedux";
import { getUserHasStory, getUserStories } from "@/services/story";
import React, { useEffect, useRef, useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper/core";
import Image from "next/image";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { FiSend } from "react-icons/fi";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Avatar, Button, Input } from "@nextui-org/react";
import Play from "@/components/icon/Play";
import Mute from "@/components/icon/Mute";
import ThreeDot from "@/components/icon/ThreeDot";
import Messager from "@/components/icon/Messager";
import toast, { Toaster } from "react-hot-toast";

export default function StoryPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { userLogged } = useRedux();
  const [stories, setStories] = useState<any>();
  const [storiesList, setStoriesList] = useState<any>();
  const swiperRef = useRef<SwiperCore | null>(null);
  const [currentIndex, setCurrentIndex] = useState<any>();

  useEffect(() => {
    async function fetchUserHasStoryList() {
      try {
        const userResponse = await getUserStories(params.id);
        setStories(userResponse);
      } catch (error) {
        console.log(error);
      }
    }
    if (userLogged) fetchUserHasStoryList();
  }, []);

  useEffect(() => {
    async function fetchUserHasStoryList() {
      try {
        const userResponse = await getUserHasStory();
        setStoriesList(userResponse);
        const initialIndex = userResponse.findIndex(
          (story: any) => story.id === parseInt(params.id)
        );
        setCurrentIndex(parseInt(initialIndex));
      } catch (error) {
        console.log(error);
      }
    }
    if (userLogged) fetchUserHasStoryList();
  }, []);

  const handleNext = () => {
    if (swiperRef.current) {
      const activeIndex = swiperRef.current.activeIndex;
      const totalSlides = swiperRef.current.slides.length;

      // Nếu đang ở slide cuối cùng
      if (activeIndex === totalSlides - 1) {
        if (currentIndex < storiesList.length - 1) {
          const nextIndex = currentIndex + 1;
          const nextStoryId = storiesList[nextIndex].id;
          router.push(`/story/${nextStoryId}`);
          setCurrentIndex(nextIndex);
        } else {
          toast.error("Đã hết story");
        }
      } else {
        // Chuyển đến slide tiếp theo
        swiperRef.current.slideNext();
      }
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      const activeIndex = swiperRef.current.activeIndex;

      // Nếu đang ở slide đầu tiên
      if (activeIndex === 0) {
        if (currentIndex > 0) {
          const prevIndex = currentIndex - 1;
          const prevStoryId = storiesList[prevIndex].id;
          router.push(`/story/${prevStoryId}`);
          setCurrentIndex(prevIndex);
        } else {
          toast.error("Đây là story đầu tiên");
        }
      } else {
        // Chuyển đến slide trước đó
        swiperRef.current.slidePrev();
      }
    }
  };

  console.log(stories);

  return (
    <div className="w-full h-full">
      <div className="w-full flex justify-center space-x-2">
        <div className="flex flex-col justify-center">
          <Button onClick={handlePrev} isIconOnly>
            <GrFormPrevious />
          </Button>
        </div>

        <div className="relative w-[370px] h-[670px] bg-slate-400">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation, Autoplay]}
            slidesPerView={1}
            watchSlidesProgress
          >
            {stories &&
              stories.map((story: any) => (
                <SwiperSlide>
                  <div className="relative w-[370px] h-[670px]">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}${story.image}`}
                      alt="bg"
                      fill
                      className="z-0"
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
          <div className="top-0 absolute w-full h-full flex flex-col justify-between z-10">
            {/* Top of Story  */}
            <div className="w-full p-4 flex justify-between bg-gradient-to-t from-transparent to-black/80 bg-blend-overlay">
              <div className="flex items-center space-x-2">
                <Avatar
                  size="md"
                  src={`${process.env.NEXT_PUBLIC_API_URL}${
                    storiesList && storiesList[currentIndex].image
                  }`}
                />
                <p className="text-xs text-white">
                  {storiesList && storiesList[currentIndex].username}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Play />
                <Mute />
                <ThreeDot />
              </div>
            </div>

            {/* Bottom of Story */}
            <div className="p-4 flex items-center space-x-3 bg-gradient-to-b from-transparent to-black/80 bg-blend-overlay">
              <Input
                classNames={{
                  input: ["text-white", "placeholder:text-white"],
                  inputWrapper: [
                    "border-white",
                    "hover:border-white",
                    "focus:border-white",
                  ],
                }}
                placeholder={`Reply ${
                  storiesList && storiesList[currentIndex].username
                }`}
                variant="bordered"
              />
              <FiSend size={"1.5em"} />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <Button onClick={handleNext} isIconOnly>
            <GrFormNext />
          </Button>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
