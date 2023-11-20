import Image from 'next/image';
import toast from 'react-hot-toast';
import { useRedux } from '@/hooks/useRedux';
import { updatePost } from '@/services/post';
import { Post } from '@/interfaces/interface';
import { BsFillImageFill } from 'react-icons/bs';
import { ChangeEvent, FormEvent, useRef } from 'react';
import { updatePostRedux } from '@/redux/reducers/post.slice';
import { updateProfilePost } from '@/redux/reducers/profilePosts.slice';
import { Button, Textarea } from '@nextui-org/react';

interface Props {
   post: Post;
   description: string;
   image: File | undefined;
   prevImage: string | undefined;
   setImage: (image: File | undefined) => void;
   setDescription: (description: string) => void;
   setPrevImage: (newPrevImage: string | undefined) => void;
   handleCloseUpdateModal: any;
}

export const ModalUpdate = ({ image, prevImage, description, setImage, setDescription, setPrevImage, handleCloseUpdateModal, post }: Props) => {
   const imageRef = useRef<HTMLInputElement>(null);
   const { dispatch, posts: postsRedux } = useRedux();

   const fileSelected = (e: ChangeEvent<HTMLInputElement>) => {
      setImage(e.target.files![0]);
      const newPrev = URL.createObjectURL(e.target.files![0]);
      setPrevImage(newPrev);
   };

   const handleSubmit = async (e: FormEvent, postId: number) => {
      e.preventDefault();
      try {
         const formData = new FormData();
         formData.append('description', description || '');
         formData.append('image', image || '');

         const { data: postUpdated, message } = await updatePost(formData, postId);
         console.log(postUpdated);
         toast.success(message, { duration: 2500 });

         if (postsRedux.length > 0) dispatch(updatePostRedux(postUpdated));
         else dispatch(updateProfilePost(postUpdated));

         setDescription('');
         setImage(undefined);
         setPrevImage(undefined);
         handleCloseUpdateModal();
      } catch (error) {
         console.log(error);
      }
   };
   return (
            <form
            className='space-y-4'
               onSubmit={(e) => handleSubmit(e, post.id)}
            >
               <Textarea
                  autoFocus
                  rows={5}
                  name="description"
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
               />

               <input
                  type="file"
                  className="hidden"
                  ref={imageRef}
                  onChange={fileSelected}
               />

               {image === undefined && prevImage === undefined && (
                  <BsFillImageFill
                     className="inputImage"
                     onClick={() => imageRef.current!.click()}
                  />
               )}

               {prevImage && (
                  <div className="w-[600px] max-w-[620px] h-[300px] mx-auto relative cursor-pointer">
                     <Image
                        src={prevImage.startsWith('blob:') ? prevImage : `${process.env.NEXT_PUBLIC_API_URL}${prevImage}`}
                        alt="#"
                        fill
                        loading="lazy"
                        sizes="(max-width: 620px) 100vw, 500px"
                        className="object-top object-cover"
                        onClick={() => imageRef.current!.click()}
                     />
                  </div>
               )}
               <Button color='primary' fullWidth>
                  <button>Submit</button>
               </Button>
            </form>
   );
};
