import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./feature/user/userSlice";
import chatSlice from "./feature/chat/chatSlice";
import messageSlice from "./feature/chat/messageSlice";
import itemSlice from "./feature/item/itemSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        chat: chatSlice,
        message: messageSlice,
        item: itemSlice
    },
})