import { useRef, FormEvent, useCallback } from "react";
import toast from "react-hot-toast";
import { formatDistance, parseISO } from "date-fns";
import Image from "next/image";
import { useRedux } from "@/hooks/useRedux";
import { Comment, Post } from "@/interfaces/interface";
import { createComment, getComment } from "@/services/comment";
import { addCommentRedux } from "@/redux/reducers/comment.slice";
import { Button, Textarea } from "@nextui-org/react";
import { RiSendPlaneFill } from "react-icons/ri";

interface Props {
  post: Post;
}

export const CommentsContainer = ({ post }: Props) => {
  const { comments: CommentsRedux, userLogged, dispatch } = useRedux();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleComment = useCallback(
    async (
      e: FormEvent<HTMLFormElement> | any,
      authorId: number,
      postId: number
    ) => {
      e.preventDefault();
      try {
        const { id } = await createComment({
          text: e.target.elements![0].value,
          author: authorId,
          post: postId,
        });
        const commentCreated = await getComment(id);
        dispatch(addCommentRedux(commentCreated));

        toast.success("Comment created successfully", { duration: 2500 });
        textareaRef.current!.value = "";
        textareaRef.current!.blur();
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  return (
    <>
      <div className="w-full">
        <div className="overflow-y-scroll h-[400px] no-scrollbar">
          {CommentsRedux.map((comment: Comment, index) => {
            const date = formatDistance(
              parseISO(comment.updated_at.toString()),
              Date.now(),
              { addSuffix: true }
            );
            return (
              <div className="bg-zinc-00 dark:bg-dark-150 px-2 pt-[1px] pb-2 mt-2 h-fit">
                <div className="my-2 flex items-center gap-2">
                  <div className="w-[50px] h-[50px] aspect-square relative">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}${comment.author_image}`}
                      alt="#"
                      fill
                      sizes="(max-width: 50px) 100vw"
                      loading="lazy"
                      className="object-cover object-top rounded-full"
                    />
                  </div>

                  <div>
                    <div className="flex space-x-2 items-center ">
                      <h4 className="font-semibold text-black/70 dark:text-white/80 capitalize text-sm">
                        {comment.author}
                      </h4>
                      <p className="text-sm text-black/70 dark:text-white/70 truncate w-[180px]">
                        {comment.text}
                      </p>
                    </div>

                    <small className="text-xs text-black/50 dark:text-white/50">
                      {date}
                    </small>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <form
          className="w-full flex items-center space-x-2"
          onSubmit={(e) => handleComment(e, userLogged!.id, post.id)}
        >
          <Textarea
            minRows={1}
            maxRows={4}
            placeholder="Add a comment"
            className="no-scrollbar resize-none textarea-transition placeholder:dark:text-gray-200 text-gray-700 dark:text-gray-200 placeholder:text-gray-600 border-b-gray-400 "
            name="text"
            ref={textareaRef}
          />

          {/* <button className="bg-transparent self-end border-gray-500 border px-3 rounded-md py-[2px]">Submit</button> */}
          <Button isIconOnly>
            <button><RiSendPlaneFill /></button>
          </Button>
        </form>
      </div>
    </>
  );
};
