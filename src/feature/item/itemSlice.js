import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import itemService from "./itemService";

const initialState = {
  items: [],
  item: null,
  isLoading: false,
  isSuccess: false,
  isErrore: false,
  message: "",
  filterdItems: [],
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

export const getItems = createAsyncThunk("item/getItems", async (thunkAPI) => {
  try {
    return await itemService.getItems();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getItem = createAsyncThunk(
  "item/getItem",
  async (itemId, thunkAPI) => {
    try {
      return await itemService.getItem(
        itemId,
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
    filterItem: (state, action) => {
      let { type, value } = action.payload;
      
      state.filterdItems = state.items.filter((fi) => {
        
        type = parseInt(type);
        
        console.log(type, value)
        if (type === 1) {
          return fi.price === parseInt(value) || value === "";
        }

        if (type === 2) {
          return fi.city.includes(value) || value === "";
        }

        if (type === 3) {
          return fi.type === '1';
        }

        if (type === 4) {
          console.log(type)
          return fi.type === '2';
        }

        if (type === 5) {
          return true;
        }
      });
      console.log(state.filterdItems);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createItem.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.items.push(action.payload);
      })
      .addCase(getItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.items = action.payload;
        state.filterdItems = action.payload;
      })
      .addCase(getItems.rejected, (state, action) => {
        state.isSuccess = false;
        state.isErrore = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(getItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getItem.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.item = action.payload;
        console.log(state.item);
      })
      .addCase(getItem.rejected, (state, action) => {
        state.isSuccess = false;
        state.isErrore = true;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export const { reset, filterItem } = itemSlice.actions;
export default itemSlice.reducer;
