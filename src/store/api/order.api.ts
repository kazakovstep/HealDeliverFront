import { api, Product } from './api'
import { User } from '@/store/api/user.api'

export interface Order {
	id: number
	orderProducts: [{ id: number; product: Product; quantity: number }]
	cost: number
	user: User
	date: Date
	amount: number
	deliveryAddress: string
	deliveryPerson: {
		name: string
		phone: string
	}
}

export const orderApi = api.injectEndpoints({
	endpoints: builder => ({
		getUserOrders: builder.query<Order[], void>({
			query: () => {
				const token =
					typeof window !== 'undefined'
						? window.localStorage.getItem('token')
						: null

				return {
					url: '/api/orders/history',
					headers: token ? { Authorization: `Bearer ${token}` } : {},
				}
			},
		}),
		getOrderById: builder.query<Order, number>({
			query: orderId => {
				const token =
					typeof window !== 'undefined'
						? window.localStorage.getItem('token')
						: null

				return {
					url: `/api/orders/history/${orderId}`,
					headers: token ? { Authorization: `Bearer ${token}` } : {},
				}
			},
		}),
		getCurrentOrder: builder.query<Order, number>({
			query: userId => {
				const token =
					typeof window !== 'undefined'
						? window.localStorage.getItem('token')
						: null

				return {
					url: `/api/orders/current`,
					method: 'GET',
					params: { userId },
					headers: token ? { Authorization: `Bearer ${token}` } : {},
				}
			},
		}),
	}),
})

export const {
	useGetUserOrdersQuery,
	useGetOrderByIdQuery,
	useGetCurrentOrderQuery,
} = orderApi
