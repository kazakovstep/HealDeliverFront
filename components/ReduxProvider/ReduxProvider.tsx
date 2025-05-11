'use client'
import {ReactNode} from "react";
import {Provider} from "react-redux"
import {persistor, store} from "@/store/store";
import { PersistGate } from 'redux-persist/integration/react';


interface IReduxProvider {
    children: ReactNode
}

export const ReduxProvider = ({children}: IReduxProvider) => {
    return <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
            {children}
        </PersistGate>
    </Provider>
}