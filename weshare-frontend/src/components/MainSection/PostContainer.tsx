"use client";
import Image from "next/image";
import { Likes } from "./Likes";
import Loading from "@/app/loading";
import { ImageModal } from "./ImageModal";
import { getPost } from "@/services/post";
import { Toaster } from "react-hot-toast";
import { usePosts } from "@/hooks/usePosts";
import { useRedux } from "@/hooks/useRedux";
import { useModal } from "@/hooks/useModal";
import { Post } from "@/interfaces/interface";
import { PostDescription } from "./PostDescription";
import { Suspense, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PostHeadContainer } from "./PostHeadContainer";
import {
  getCommentsRedux,
  removeCommentsRedux,
} from "@/redux/reducers/comment.slice";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { CommentsContainer } from "./CommentsContainer";

const variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9 } },
};

export const PostsContainer = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { setPageCallback: setPage } = usePosts();
  const { posts, userLogged, dispatch, hasMore } = useRedux();
  const observerRef = useRef<IntersectionObserver>();

  const uniqueBy = (arr: any, prop: any) => {
    const seen = new Set();
    return arr.filter((obj: any) => {
      const value = obj[prop];
      if (seen.has(value)) {
        return false;
      }
      seen.add(value);
      return true;
    });
  };

  const uniquePost = uniqueBy(posts, "id");

  const [showImageModalIndex, handleOpenImageModal, handleCloseImageModal] =
    useModal();

  /* Modal Image */
  const handleOpenImage = async (id: number) => {
    handleOpenImageModal(id);

    const response: Post = await getPost(id);
    const sortComments = [...response.comments].sort((a, b) => b.id - a.id);
    dispatch(getCommentsRedux(sortComments));
  };

  const handleCloseImage = () => {
    handleCloseImageModal();
    dispatch(removeCommentsRedux());
  };

  /* Infinite Scroll */
  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting && hasMore) {
      setPage((prev: any) => prev + 1);
    }
  };

  const lastPostRef = useCallback(
    (node: HTMLDivElement) => {
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver(handleObserver);
      if (node) observerRef.current.observe(node);
    },
    [hasMore]
  );

  return (
    <>
      <AnimatePresence>
        {uniquePost.map((post: Post, index: number) => {
          return (
            <motion.div
              key={post.id}
              variants={variants}
              initial="hidden"
              animate={"visible"}
              exit={"hidden"}
              className="w-full bg-white drop-shadow-custom rounded-xl dark:bg-dark-50 p-[20px] shadow-md text-gray-400 my-5 transition-colors duration-300 ease-in dark:bg-neutral-800"
              ref={index === posts.length - 1 ? lastPostRef : null}
            >
              <PostHeadContainer
                post={post}
                posts={posts}
                authorId={post.author_id ?? userLogged!.id}
                authorUsername={
                  typeof post.author === "number"
                    ? userLogged!.username
                    : post.author
                }
              />
              <PostDescription description={post.description} />

              {/* Image */}
              <Suspense fallback={<Loading />}>
                {post.image !== null && (
                  <div
                    className="relative w-full h-[500px] mb-[5px]"
                    onClick={() => handleOpenImage(post.id)}
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}${post.image}`}
                      alt="#"
                      fill
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="/blur.svg"
                      sizes="(max-width: 720px) 100vw, 700px, 500px, 300px"
                      className="object-cover object-top cursor-pointer rounded-[5px]"
                    />
                  </div>
                )}
              </Suspense>

              {/* Likes */}
              <div className="pt-4">
                <Likes
                  postId={post.id}
                  likes={post.likes}
                  likesCount={post.likes.length}
                />
              </div>
              

              {/* <ImageModal
                post={post}
                posts={posts}
                showModal={showImageModalIndex === post.id}
                handleCloseImage={handleCloseImage}
              /> */}
              
              <Modal
                isOpen={showImageModalIndex === post.id}
                onOpenChange={onOpenChange}
                size="5xl"
                hideCloseButton
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex justify-end items-center">
                        <Button
                          variant="light"
                          onPress={handleCloseImage}
                          className="text-3xl"
                          isIconOnly
                        >
                          ×
                        </Button>
                      </ModalHeader>
                      <ModalBody>
                        <div className="flex w-full">
                          <div
                            className="relative w-3/5 h-[600px] mb-[5px]"
                            onClick={() => handleOpenImage(post.id)}
                          >
                            <Image
                              src={`${process.env.NEXT_PUBLIC_API_URL}${post.image}`}
                              alt="#"
                              fill
                              loading="lazy"
                              placeholder="blur"
                              blurDataURL="/blur.svg"
                              sizes="(max-width: 720px) 100vw, 700px, 500px, 300px"
                              className="object-cover object-top cursor-pointer rounded-[5px]"
                            />
                          </div>
                          <div className="w-2/5 px-6 py-4 overflow-y-auto modal space-y-2">
                            <div className="mb-6">
                              <PostHeadContainer
                                post={post}
                                posts={posts}
                                authorId={post.author_id ?? userLogged!.id}
                                authorUsername={
                                  typeof post.author === "number"
                                    ? userLogged!.username
                                    : post.author
                                }
                              />
                            </div>

                            {/* Likes */}
                            <Likes
                              likes={post.likes}
                              likesCount={post.likes.length}
                              postId={post.id}
                            />

                            {/* Comments */}
                            <CommentsContainer post={post} />
                          </div>
                        </div>
                      </ModalBody>
                      <ModalFooter></ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </motion.div>
          );
        })}
        <Toaster />
      </AnimatePresence>
    </>
  );
};
