import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/redux/reducers/auth.slice';
import userReducer from '@/redux/reducers/user.slice';
import postReducer from '@/redux/reducers/post.slice';
import hasMoreReducer from '@/redux/reducers/hasMore';
import commentReducer from '@/redux/reducers/comment.slice';
import profilePostsReducer from '@/redux/reducers/profilePosts.slice';
import messageReducer from '@/redux/reducers/message.slice'

const store = configureStore({
   reducer: {
      auth: authReducer,
      user: userReducer,
      post: postReducer,
      hasMore: hasMoreReducer,
      comment: commentReducer,
      profilePosts: profilePostsReducer,
      message: messageReducer,
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
