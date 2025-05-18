import { api, Product } from './api'

export const productApi = api.injectEndpoints({
	endpoints: builder => ({
		createProduct: builder.mutation({
			query: product => ({
				body: product,
				url: 'http://localhost:8080/api',
				method: 'POST',
			}),
			invalidatesTags: () => [
				{
					type: 'Product',
				},
			],
		}),
		getImageById: builder.mutation({
			query: id => ({
				url: `http://localhost:8080/api/image/${id}`,
				method: 'POST',
			}),
			invalidatesTags: () => [
				{
					type: 'Product',
				},
			],
		}),
		getProductsCart: builder.query<Product, number>({
			query: id => `http://localhost:8080/api/product?id=${id}`,
		}),
		getProductsByTitle: builder.query<Product[], string>({
			query: title => `http://localhost:8080/api/?title=${title}`,
		}),
		getProductsByCategory: builder.query<Product[], string>({
			query: category => `/api/${category}`,
		}),
	}),
})

export const {
	useCreateProductMutation,
	useGetProductsCartQuery,
	useGetImageByIdMutation,
	useGetProductsByTitleQuery,
	useGetProductsByCategoryQuery,
} = productApi
