import { api } from "./index";

const getProductsApi = api.injectEndpoints({
	endpoints: (build) => ({
		getProducts: build.query({
			query: () => ({
				url: "/products",
			}),

			providesTags: ["PRODUCTS"],
		}),
		editProduct: build.mutation({
			query: ({ id, title, description, price }) => ({
				url: `/products/${id}`,
				method: "PUT",
				body: {
					title,
					description,
					price,
				},
			}),

			invalidatesTags: ["PRODUCTS"],
		}),
		getSingleProduct: build.query({
			query: (id) => ({
				url: `/products/${id}`,
			}),
			invalidatesTags: ["PRODUCTS"],
		}),
	}),
});

export const {
	useGetProductsQuery,
	useEditProductMutation,
	useGetSingleProductQuery,
} = getProductsApi;
