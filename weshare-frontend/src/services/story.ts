import { API } from './axios';

export const getUserHasStory= async () => {
    const { data } = await API.get(`user-has-story/`, {
       headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
       },
    });
    return data;
 };

export const getUserStories= async (user_id: any) => {
    const { data } = await API.get(`user-story/${user_id}/`, {
       headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
       },
    });
    return data;
 };