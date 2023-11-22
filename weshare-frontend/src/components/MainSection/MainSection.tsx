import React from 'react'
import { CreatePost } from './CreatePost'
import { PostsContainer } from './PostContainer'
import Story from './Story'

export const MainSection = () => {
  return (
    <div className='basic-[47%] w-[44%]'>
      <Story />
      <CreatePost />
      <PostsContainer />
    </div>
  )
}
