import { createSlice } from '@reduxjs/toolkit'

const items =
  localStorage.getItem('cartItems') !== null
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []

const initialState = {
  cartItems: items,
  quantity: 0,
  cartTotal: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart (state, action) {
      const { productId, quantity } = action.payload
      const indexProductId = state.cartItems.findIndex(
        p => p.productId === productId
      )

      if (indexProductId >= 0) {
        state.cartItems[indexProductId].quantity += quantity
      } else {
        state.cartItems.push(action.payload)
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    removeFromCart (state, action) {
      console.log(action.payload)
      const nextCartItems = state.cartItems.filter(
        item => item.productId !== action.payload
      )
      state.cartItems = nextCartItems
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    cartQuantityIncrement (state, action) {
      const itemIndex = state.cartItems.findIndex(
        item => item.productId === action.payload.id
      )
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity = action.payload.quantity
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
      }
    },
    cartQuantityDecrement (state, action) {
      const itemIndex = state.cartItems.findIndex(
        item => item.productId === action.payload.id
      )
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity = action.payload.quantity
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
      }
    },
    clearCart (state) {
      state.cartItems = []
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    }
  }
})

export const {
  addToCart,
  removeFromCart,
  cartQuantityDecrement,
  cartQuantityIncrement,
  clearCart
} = cartSlice.actions

export default cartSlice.reducer
