import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import productsReducer from "../slices/productsSlice";
import cartReducer from "../slices/cartSlice";
import { api } from "../api";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		[api.reducerPath]: api.reducer,
		products: productsReducer,
		cart: cartReducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
});
