import { API } from "./axios";

export const getMessageUser = async (id: number) => {
  const { data } = await API.get(`user-message/${id}/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });
  return data
};

export const getMessageParticipants = async (user1_id: number, user2_id: number) => {
  const { data } = await API.get(`participants-message/${user1_id}/${user2_id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });
  return data
};

export const createMessage = async (message: any) => {
  const { data } = await API.post('messages/', message, {
     headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
     },
  });
  return data;
};