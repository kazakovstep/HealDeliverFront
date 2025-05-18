import { api } from './api'
import { User } from './user.api'
import { Order } from './order.api'

export const adminApi = api.injectEndpoints({
	endpoints: builder => ({
		getAllUsers: builder.query<User[], void>({
			query: () => {
				const token =
					typeof window !== 'undefined'
						? window.localStorage.getItem('token')
						: null
				return {
					url: 'http://localhost:8080/api/admin/users',
					headers: token ? { Authorization: `Bearer ${token}` } : {},
				}
			},
		}),
		getAllOrders: builder.query<Order[], void>({
			query: () => {
				const token =
					typeof window !== 'undefined'
						? window.localStorage.getItem('token')
						: null
				return {
					url: 'http://localhost:8080/api/admin/orders',
					headers: token ? { Authorization: `Bearer ${token}` } : {},
				}
			},
		}),
		getAllDeliveryPeople: builder.query<any[], void>({
			query: () => {
				const token =
					typeof window !== 'undefined'
						? window.localStorage.getItem('token')
						: null
				return {
					url: 'http://localhost:8080/api/admin/delivery_person',
					headers: token ? { Authorization: `Bearer ${token}` } : {},
				}
			},
		}),
	}),
})

export const {
	useGetAllUsersQuery,
	useGetAllOrdersQuery,
	useGetAllDeliveryPeopleQuery,
} = adminApi
