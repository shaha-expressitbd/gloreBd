// src/stores/cart.js
import { createSlice } from "@reduxjs/toolkit";

const items =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const initialState = {
  cartItems: items,
  quantity: 0,
  cartTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { productId, quantity, variationId } = action.payload;
      const idx = state.cartItems.findIndex((p) => p.productId === productId);
      console.log(variationId);
      if (idx >= 0) {
        // already in cart → just bump quantity
        state.cartItems[idx].quantity += quantity;
      } else {
        state.cartItems.push({ productId, quantity, variationId });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart(state, action) {
      // payload is productId
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    cartQuantityIncrement(state, action) {
      // payload: { productId, quantity }
      const { productId, quantity } = action.payload;
      const idx = state.cartItems.findIndex(
        (item) => item.productId === productId
      );
      if (idx >= 0) {
        state.cartItems[idx].quantity = quantity;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },

    cartQuantityDecrement(state, action) {
      // payload: { productId, quantity }
      const { productId, quantity } = action.payload;
      const idx = state.cartItems.findIndex(
        (item) => item.productId === productId
      );
      if (idx >= 0) {
        state.cartItems[idx].quantity = quantity;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },

    clearCart(state) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  cartQuantityIncrement,
  cartQuantityDecrement,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
