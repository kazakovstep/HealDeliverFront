import {createSlice} from "@reduxjs/toolkit"


interface CartState {
    totalCost: number;
    totalItems: number;
    quantities: number[];
}

const initialState: CartState = {
    totalCost: 0,
    totalItems: 0,
    quantities: []
};

export const cartSlice = createSlice({
        name: 'cart',
        initialState,
        reducers: {
            addToCart: (state: CartState, {payload: price}) => {
                state.totalCost += price;
                state.totalItems += 1;
                state.quantities.push(1)
            },
            removeFromCart: (state: CartState, {payload: price}) => {
                state.totalCost -= price;
                state.totalItems -= 1;
            },
            addToCartSum: (state: CartState, {payload: price}) => {
                state.totalCost += price;
            },
            removeFromCartSum: (state: CartState, {payload: price}) => {
                state.totalCost -= price;
            },
            removeAll: (state: CartState) => {
                state.totalCost = 0
                state.totalItems = 0
                state.quantities.length = 0;
            },
            updateQuantity: (state: CartState, {payload: {index, amount}}) => {
                state.quantities[index] = amount;
            },
            deleteQuantity: (state: CartState, {payload: {index}}) => {
                state.quantities.splice(index, 1);
            }
        },
    })
;


export const {actions, reducer} = cartSlice