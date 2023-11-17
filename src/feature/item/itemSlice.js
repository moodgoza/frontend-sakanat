import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import itemService from "./itemService";

const initialState = {
  items: [],
  item: null,
  isLoading: false,
  isSuccess: false,
  isErrore: false,
  message: "",
};

export const createItem = createAsyncThunk(
  "item/createItem",
  async (data1, thunkAPI) => {
    try {
      console.log(data1);
      const data = await itemService.createItem(
        data1.item,
        data1.userId,
        thunkAPI.getState().user.user.token
      );
      console.log(data);
      return data;
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

export const getItems = createAsyncThunk('item/getItems', async(thunkAPI) => {
  try{
    return await itemService.getItems();
  }
  catch (error) {
    const message =
    (error.response &&
      error.response.data &&
      error.response.data.message) ||
    error.message ||
    error.toString();
  return thunkAPI.rejectWithValue(message);
  }
})

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    reset: (state) => {
      state.items = [];
      state.item = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isErrore = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createItem.fulfilled, (state) => {
      state.isSuccess = true;
    })
    .addCase(getItems.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getItems.fulfilled, (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.items = action.payload;
      console.log(state.items)
    })
    .addCase(getItems.rejected, (state, action) => {
      state.isSuccess = false;
      state.isErrore = true;
      state.isLoading = false;
      state.message = action.payload

    })
  },
});

export const { reset } = itemSlice.actions;
export default itemSlice.reducer;
