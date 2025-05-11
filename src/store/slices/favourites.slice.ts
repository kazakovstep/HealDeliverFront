import {createSlice} from "@reduxjs/toolkit";
import {Product} from "@/store/api/api";

interface FavouritesState {
    favourites: Product[],
    amount: number
}

const initialState: FavouritesState = {
    favourites: [],
    amount: 0
}

export const favouritesSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        toggleFavourite: (state: FavouritesState, {payload: product}) => {
            const isExist = state.favourites.some(r => r.id === product.id)
            if (isExist) {
                const index = state.favourites.findIndex(item => item.id === product.id)
                if (index !== -1) {
                    state.favourites.splice(index, 1)
                    state.amount -= 1
                }
            } else{
                state.favourites.push(product)
                state.amount += 1
            }
        }
    },
})

export const {actions, reducer} = favouritesSlice