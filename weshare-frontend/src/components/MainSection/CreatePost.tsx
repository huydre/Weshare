"use client";
import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Head } from "./Head";
import { Multimedia } from "./Multimedia";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { createPost } from "@/services/post";
import { addPostRedux } from "@/redux/reducers/post.slice";
import { useRedux } from "@/hooks/useRedux";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { BsCameraVideo, BsImage } from "react-icons/bs";
import { BiLinkAlt } from "react-icons/bi";
import { CiHashtag } from "react-icons/ci";
import { GoMention } from "react-icons/go";

const logos = [
  { text: "Image/Video", icon: <BsImage className={"text-blue-500"} /> },
  { text: "Attachment", icon: <BiLinkAlt className={"text-orange-500"} /> },
  { text: "Live", icon: <BsCameraVideo className={"text-red-500"} /> },
  { text: "Hashtag", icon: <CiHashtag className={"text-green-500"} /> },
  { text: "Mention", icon: <GoMention /> },
];

export const CreatePost = () => {
  const [image, setImage] = useState<File>();
  const [prevImage, setPrevImage] = useState();
  const [description, setDescription] = useState("");

  const imageRef = useRef<HTMLInputElement>(null);
  const openFormRef = useRef<HTMLDialogElement>(null);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { dispatch, userLogged } = useRedux();

  const closeDialog = (e: any) => {
    const dialogDimensions = openFormRef.current?.getBoundingClientRect();
    if (
      e.clientX > dialogDimensions!.right ||
      e.clientY > dialogDimensions!.bottom ||
      e.clientX < dialogDimensions!.left ||
      e.clientY < dialogDimensions!.top
    ) {
      openFormRef.current!.close();
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("image", image! || "");
      formData.append("author", userLogged!.id.toString());

      const newPost = await createPost(formData);
      console.log(newPost);
      dispatch(addPostRedux(newPost));
      toast.success("Post created successfully", { duration: 2500 });
      setDescription("");
      setImage(undefined);
      setPrevImage(undefined);
      

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { duration: 2500 });
    }
  };

  const fileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files![0]);

    const reader: any = new FileReader();
    reader.readAsDataURL(e.target.files![0]);

    reader.onloadend = () => {
      setPrevImage(reader.result);
    };
  };

  return (
    <div className="w-full pt-0 bg-white drop-shadow-custom rounded-xl flex dark:bg-dark-50 p-[20px] transition-colors duration-300 ease-in dark:bg-neutral-800">
      <Head
        id={userLogged!.id}
        image={userLogged!.image}
        author={userLogged!.username}
      />

      <div className="px-[15px] pt-[20px] w-full">
        <button
          className="w-full block bg-zinc-200/50 rounded-full px-4 py-3 items-center text-slate-900/70 dark:text-white/80 border-slate-700/50 pb-3 text-[15px] cursor-pointer text-start my-3 dark:bg-neutral-700"
          // onClick={() => openFormRef.current!.showModal()}
          onClick={onOpen}
        >
          What's on your mind?
        </button>
        <Multimedia/>
      </div>
      <Modal
        size="2xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
        backdrop="opaque"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="pt-10 ">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Textarea
                    minRows={10}
                    maxRows={10}
                    className="input resize-none"
                    name="description"
                    placeholder="What is your mind?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />

                  <div className="flex space-x-4 items-center">
                    <p className="text-xs">Add to your post</p>
                    <div className="flex">
                      {logos.map((logo, index) => (
                        <div
                          onClick={() => imageRef.current!.click()}
                          className="items-center cursor-pointer flex mr-5 text-[13px] text-slate-500 gap-1"
                          key={index}
                        >
                          {logo.icon} {logo.text}
                        </div>
                      ))}
                    </div>
                  </div>

                  <input
                    type="file"
                    className="hidden"
                    ref={imageRef}
                    onChange={fileSelected}
                  />

                  {prevImage && (
                    <div className="w-[600px] max-w-[620px] h-[300px] mx-auto relative cursor-pointer">
                      <Image
                        src={prevImage}
                        alt="#"
                        fill
                        loading="lazy"
                        className="object-top object-cover"
                        sizes="(max-width: 620px) 100vw, 550px"
                        onClick={() => imageRef.current!.click()}
                      />
                    </div>
                  )}
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                onClick={handleSubmit}
                  fullWidth
                  variant="flat"
                  color="primary"
                  onPress={onClose}
                >
                  Share
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
