import axios from "axios";

const createItem = async (item, userId, token) => {
  const response = await axios.post(
    `/item/${userId}`,
     item ,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const getItems = async() => {
  const response = await axios.get('/item');
  console.log(response.data);
  return response.data;
}

const getItem = async(itemId, token) => {
  const response = await axios.get(`/item/${itemId}`);
  console.log(response.data);
  return response.data;
}

const getUserItem = async(userId, token) => {
  const response = await axios.get(`/item/user/${userId}`);
  console.log(response.data);
  return response.data;
}

const updateItem = async(itemId, newItem) => {
  console.log(itemId, newItem);
  const response = await axios.put(`/item/${itemId}`, {newItem});
  return response.data;
}

const deleteItem = async(itemId) => {
  const response = await axios.delete(`/item/${itemId}`);
  return response.data;
}

export default {
  createItem,
  getItems,
  getItem,
  getUserItem,
  updateItem,
  deleteItem
};
