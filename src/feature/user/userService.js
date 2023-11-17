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

export default {
    register,
    logout,
    login
}