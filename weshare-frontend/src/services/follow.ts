import { API } from './axios';

export const following = async(follow: any) => {
    const {data} = await API.post('follows', follow, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
         },
    })
    return data;
}

export const getFollow = async(id: any) => {
    const {data} = await API.get(`followlist/${id}/`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
         },
    })
    return data;
}

export const unFollow = async(follower: any, following:any) => {
    const {data} = await API.post(`followlist/${follower}/${following}/`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
         },
    })
    return data;
}