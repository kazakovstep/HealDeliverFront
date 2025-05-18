import { api, Product } from './api'

export interface User {
	id: number
	email: string
	password: string
	username: string
	phone: string
	roles: { name: string }[]
}

export const userApi = api.injectEndpoints({
	endpoints: builder => ({
		getCurrentUser: builder.query<User, void>({
			// query — функция, выполняющаяся при вызове хука в браузере
			query: () => {
				// безопасно — внутри функции, на клиенте
				const token =
					typeof window !== 'undefined'
						? window.localStorage.getItem('token')
						: null

				return {
					url: `http://localhost:8080/api/user`,
					headers: token ? { Authorization: `Bearer ${token}` } : {},
				}
			},
		}),
	}),
})

export const { useGetCurrentUserQuery } = userApi
