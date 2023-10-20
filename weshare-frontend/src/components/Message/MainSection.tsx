import React from 'react'
import { MessageList } from './MessageList'
import { MessageDetail } from './MessageDetail'
import { getMessageUser } from '@/services/message'

export const MainSection = () => {
    
  return (
    <div className='flex px-[3%] w-full '>
        <MessageList/>
        <MessageDetail/>
    </div>
  )
}
