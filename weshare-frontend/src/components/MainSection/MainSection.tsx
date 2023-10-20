import React from 'react'
import { CreatePost } from './CreatePost'
import { PostsContainer } from './PostContainer'

export const MainSection = () => {
  return (
    <div className='basic-[47%] w-[44%]'>
      <CreatePost />
      <PostsContainer />
    </div>
  )
}
