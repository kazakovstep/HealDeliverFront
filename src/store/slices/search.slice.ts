import {createSlice} from "@reduxjs/toolkit";
import {Product} from "@/store/api/api";


interface SearchState {
    products: Product[];
}

const initialState: SearchState = {
    products: []
};

export const searchSlice = createSlice({
        name: 'search',
        initialState,
        reducers: {
            addToSearch: (state : SearchState, {payload: product}) => {
                state.products.length = 0
                state.products.push(product)
            }
        },
    })
;


export const {actions, reducer} = searchSlice