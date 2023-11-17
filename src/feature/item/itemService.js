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

export default {
  createItem,
  getItems
};
