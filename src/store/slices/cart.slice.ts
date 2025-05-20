import { createSlice } from '@reduxjs/toolkit'

interface CartState {
	totalCost: number
	totalItems: number
	quantities: Record<number, number>
}

const initialState: CartState = {
	totalCost: 0,
	totalItems: 0,
	quantities: {},
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state: CartState, { payload: { price, productId } }) => {
			state.totalCost += price
			state.totalItems += 1
			state.quantities[productId] = (state.quantities[productId] || 0) + 1
		},
		removeFromCart: (state: CartState, { payload: { price, productId } }) => {
			state.totalCost -= price
			state.totalItems -= 1
			delete state.quantities[productId]
		},
		addToCartSum: (state: CartState, { payload: { price, productId } }) => {
			state.totalCost += price
			state.quantities[productId] = (state.quantities[productId] || 0) + 1
		},
		removeFromCartSum: (
			state: CartState,
			{ payload: { price, productId } }
		) => {
			state.totalCost -= price
			if (state.quantities[productId] > 1) {
				state.quantities[productId] -= 1
			}
		},
		removeAll: (state: CartState) => {
			state.totalCost = 0
			state.totalItems = 0
			state.quantities = {}
		},
		updateQuantity: (state: CartState, { payload: { productId, amount } }) => {
			state.quantities[productId] = amount
		},
		deleteQuantity: (state: CartState, { payload: { productId } }) => {
			delete state.quantities[productId]
		},
	},
})

export const { actions, reducer } = cartSlice
