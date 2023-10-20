import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
   return (
      <Link href={'/'}>
         <div className="flex items-center py-1 cursor-pointer ">
            <div className="max-w-[50px] h-[40px] w-[40px] relative aspect-auto ">
               <Image
                  src={'/weshare_logo.png'}
                  alt="Logo"
                  fill
                  sizes="(max-width: 50px) 100vw"
                  loading="lazy"
               />
            </div>
            <h2 className="text-[18px] font-semibold ml-3 dark:text-white text-black">WeShare</h2>
         </div>
      </Link>
   );
};
