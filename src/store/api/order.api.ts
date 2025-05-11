import { api, Product } from './api'
import { token, User } from '@/store/api/user.api'

export interface Order {
	id: number
	orderProducts: [{ id: number; product: Product; quantity: number }]
	cost: number
	user: User
	date: Date
	amount: number
	deliveryAddress: string
}

export const orderApi = api.injectEndpoints({
	endpoints: builder => ({
		getUserOrders: builder.query<Order[], void>({
			query: () => ({
				url: `/orders/history`,
				headers: { Authorization: `Bearer ${token}` },
			}),
		}),
		getOrderById: builder.query<Order, number>({
			query: orderId => `/orders/history/${orderId}`,
		}),
	}),
})

export const { useGetUserOrdersQuery, useGetOrderByIdQuery } = orderApi
