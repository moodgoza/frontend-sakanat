import axios from "axios";
const register = async (user) => {
    console.log(user)
    const response = await axios.post("/signup", user)
    if(response.data)
    {
        localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return  response.data.user;
};

const login = async(user) => {
    console.log("haha")
    const response = await axios.post('/signin', user);
    if(response.data)
    {
        localStorage.setItem('user', JSON.stringify(response.data.user))
    }
    return response.data.user
}
const logout = async () => {
    localStorage.removeItem("user");
};

const getUser = async(userId) => {
    const response = await axios.get(`/user/${userId}`);
    console.log(response.data);
    return response.data;
}

export default {
    register,
    logout,
    login,
    getUser
}