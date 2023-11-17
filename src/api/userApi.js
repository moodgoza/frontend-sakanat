import axios from "axios";
export const register = async (user) => {
    try{
        const data = await axios.post("/signup", user)
    console.log(data);
    return data;
    }
    catch(e) {
        return e.message
    }
    
};
