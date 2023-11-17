import axios from "axios";

const createChat = async (firstUser, secondUser, token) => {
  const response = await axios.post(`/chat/${firstUser}/${secondUser}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getChats = async (userId, token) => {
  const response = await axios.get(`/chat/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const createMessage = async (chat, sender, receiver, value, token) => {
  console.log(chat, sender, receiver, value, token);
  const response = await axios.post(
    `/chat/message/${chat}/${sender}/${receiver}`,
    {
      value
    }
     
    , {headers: {
        Authorization: `Bearer ${token}`,
      },}
  );
  return response.data;
};

const getChatMessages = async (chat, token) => {
  const response = await axios.get(`/chat/message/${chat}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export default {
  createChat,
  createMessage,
  getChats,
  getChatMessages,
};
