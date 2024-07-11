import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItemToCart(state, { payload }) {
      state.totalQuantity += payload.quantity || 1;
      state.items.push({ ...payload, quantity: payload.quantity || 1 });
    },
    decreaseEl(state, { payload }) {
      const id = payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        state.totalQuantity--;
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          existingItem.quantity--;
        }
      }
    },
    increaseEl(state, { payload }) {
      const id = payload;
      const exitingItem = state.items.find((item) => item.id === id);
      state.totalQuantity++;
      if (exitingItem) {
        exitingItem.quantity++;
      }
    },
    clear(state) {
      state.items = [];
      state.totalQuantity = 0;
    },
  },
});

export const { addItemToCart, decreaseEl, increaseEl, clear } =
  cartSlice.actions;
export default cartSlice.reducer;
