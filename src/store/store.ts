import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {api} from "./api/api";
import {reducer as productsSliceReducer} from "@/store/slices/products.slice";
import {reducer as cartSliceReducer} from "@/store/slices/cart.slice";
import {reducer as favSliceReducer} from "@/store/slices/favourites.slice"
import {reducer as searchSliceReducer} from "@/store/slices/search.slice"

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: [api.reducerPath]
}

const reducers = combineReducers({
    search: searchSliceReducer,
    favourites: favSliceReducer,
    cart: cartSliceReducer,
    products: productsSliceReducer,
    [api.reducerPath]: api.reducer
})

const persistRedusers = persistReducer(persistConfig, reducers)
export const store = configureStore({
    reducer: persistRedusers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(api.middleware)
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>