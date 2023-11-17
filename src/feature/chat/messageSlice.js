import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chatService from "./chatService";

const initialState = {
  messages: [],
  messageIsLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};



export const createMessage = createAsyncThunk(
  "message/createMessage",
  async (message, thunkAPI) => {
    console.log(message.chat, message.sender, message.receiver, message.value);
    try {
      return await chatService.createMessage(
        message.chat,
        message.sender,
        message.receiver,
        message.value,
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

export const getChatMessages = createAsyncThunk(
  "message/getChatMessages",
  async (chat, thunkAPI) => {
    try {
      return await chatService.getChatMessages(
        chat,
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

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    reset: (state) => {
      state.messages = [];
      state.messageIsLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    changeMessagesBySocket: (state, message) => {
        console.log(state.message, message)
        state.messages.push(message.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMessage.pending, (state) => {
        state.messageIsLoading = true;
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        state.messageIsLoading = false;
        state.messages.push(action.payload);
        state.isSuccess = true;
      })
      .addCase(createMessage.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getChatMessages.pending, (state) => {
        state.messageIsLoading = true;
      })
      .addCase(getChatMessages.fulfilled, (state, action) => {
        state.messageIsLoading = false;
        state.messages = action.payload;
        state.isSuccess = true;
      })
      .addCase(getChatMessages.rejected, (state, action) => {
        state.isError = true;
        state.messages = null;
        state.message = action.payload;
      });
  },
});
export const { reset, changeMessagesBySocket } = messageSlice.actions;
export default messageSlice.reducer;
