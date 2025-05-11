import {api, Product} from "./api";

export const token = localStorage.getItem("token");

export interface User {
    id: number,
    email: string,
    password: string,
    username: string,
    phone: string,
    roles: [{name: string}]
}

export const userApi = api.injectEndpoints({
    endpoints: builder => ({
        getCurrentUser: builder.query<User, void>({
            query: () => ({
                url: `/user`,
                headers: {"Authorization": `Bearer ${token}`}
            })
        })
    })
})

export const {useGetCurrentUserQuery} = userApi

