import Image from 'next/image';
import Link from 'next/link';
import { AiFillCaretDown } from 'react-icons/ai';

interface Props {
   image: string;
   id: number;
   author: string;
}

export const Head = ({ image, id, author }: Props) => {
   return (
      <div className="flex items-center">
         <Link href={`/profile/${id}`}>
            <div className="relative w-fit max-w-[40px] h-[40px] aspect-square">
               <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${image}`}
                  alt="#"
                  fill
                  loading="lazy"
                  sizes="(max-width: 40px) 100vw"
                  className="object-cover rounded-full"
               />
            </div>
         </Link>
      </div>
   );
};
