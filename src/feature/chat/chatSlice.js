import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chatService from "./chatService";

const initialState = {
  chats: [],
  chat: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const createChat = createAsyncThunk(
  "chat/createChat",
  async (data, thunkAPI) => {
    try {
      return await chatService.createChat(
        data.firstUser,
        data.secondUser,
        thunkAPI.getState().user.user.token
      );
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getChats = createAsyncThunk(
  "chat/getChats",
  async (userId, thunkAPI) => {
    try {
      return await chatService.getChats(
        userId,
        thunkAPI.getState().user.user.token
      );
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getChat = createAsyncThunk(
  "chat/getChat",
  async (chat, thunkAPI) => {
    try {
      return chat;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    reset: (state) => {
      state.chats = [];
      state.chat = null;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chat = action.payload;
        state.chats.push(state.chat);
        state.isSuccess = true;
      })
      .addCase(createChat.rejected, (state, action) => {
        state.isError = true;
        state.chat = null;
        state.message = action.payload;
      })
      .addCase(getChats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getChats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chats = action.payload;
        state.isSuccess = true;
      })
      .addCase(getChats.rejected, (state, action) => {
        state.isError = true;
        state.chats = null;
        state.message = action.payload;
      })
      .addCase(getChat.fulfilled, (state, action) => {
        console.log(action.payload);
        state.chat = action.payload;
      });
  },
});
export const { reset } = chatSlice.actions;
export default chatSlice.reducer;
