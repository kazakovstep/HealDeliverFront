import {createSlice} from "@reduxjs/toolkit";
import {Product} from "@/store/api/api";


const initialState: Product[] = []

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        toggleCart: (state: Product[], {payload: product}) => {
            const isExist = state.some(r => r.id === product.id)
            if (isExist) {
                const index = state.findIndex(item => item.id === product.id)
                if (index !== -1) {
                    state.splice(index, 1)
                }
            } else
                state.push(product)
        },
        removeAll: (state: Product[]) => {
            state.length = 0
        }
    },
})

export const {actions, reducer} = productsSlice