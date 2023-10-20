import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { Comment } from './Comment';
import { Button } from '@nextui-org/react';

interface Props {
   liked: boolean;
   likesCount: number;
}

export const ButtonLike = ({ liked, likesCount }: Props) => {
   return (
      <div className="inline-flex items-center mr-[30px] cursor-pointer">
         {liked ? <AiFillHeart className="mr-2 text-[20px] text-red-500 " /> : <AiOutlineHeart className="mr-2 text-[20px] text-gray-500" />}
         
         <span className={`${likesCount === 0 ? 'text-gray-500' : 'text-red-500'}`}>{likesCount}</span>

         <div onClick={(e) => e.stopPropagation()}>
            <Comment />
         </div>
      </div>
   );
};
