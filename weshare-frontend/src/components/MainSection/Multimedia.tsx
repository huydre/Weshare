import { BsCameraVideo, BsImage } from 'react-icons/bs';
import {BiLinkAlt} from 'react-icons/bi'
import {CiHashtag} from 'react-icons/ci'
import {GoMention} from 'react-icons/go'

const logos = [
   { text: 'Image/Video', icon: <BsImage className={'text-blue-500'} /> },
   { text: 'Attachment', icon: <BiLinkAlt className={'text-orange-500'}/> },
   { text: 'Live', icon: <BsCameraVideo className={'text-red-500'}/> },
   { text: 'Hashtag', icon: <CiHashtag className={'text-green-500'}/> },
   { text: 'Mention', icon: <GoMention /> },
];

export const Multimedia = () => {
   return (
      <div className="flex">
         {logos.map((logo, index) => (
            <div
               className="items-center flex mr-5 text-[13px] text-slate-500 gap-1 dark:text-gray-200"
               key={index}
            >
               {logo.icon} {logo.text}
            </div>
         ))}
      </div>
   );
};
