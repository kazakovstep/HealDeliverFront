import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const BASE_URL = 'http://localhost:8080'

export const api = createApi({
	reducerPath: 'api',
	tagTypes: ['Product'],
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
	}),
	endpoints: builder => ({
		getProducts: builder.query<Product[], void>({
			query: () => '',
			providesTags: () => [
				{
					type: 'Product',
				},
			],
		}),
	}),
})
export const { useGetProductsQuery } = api

export interface Product {
	id: number
	title: string
	description: string
	price: number
	country: string
	amount: number
	category: string
	image: string
	calories: number
	cellulose: number
	fats: number
	proteins: number
	carbohydrates: number
}
