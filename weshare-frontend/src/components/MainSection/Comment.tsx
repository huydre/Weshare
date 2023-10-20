import { Post } from '@/interfaces/interface';
import { BiComment } from 'react-icons/bi';
import { CommentIcon } from '../icon/CommentIcon';

export const Comment = () => {
   return (
      <div className="inline-flex gap-x-2 ml-6 items-center mt-2">
         <CommentIcon/> 
         <p className='text-[0.8rem] text-gray-400 font-medium'>Commnent</p>
      </div>
   );
};
