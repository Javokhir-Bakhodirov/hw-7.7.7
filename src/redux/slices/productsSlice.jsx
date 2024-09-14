import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentProducts: [],
};

const currentProductsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		setProducts: (state, action) => {
			state.currentProducts = action.payload;
		},
	},
});

export const { setProducts } = currentProductsSlice.actions;
export default currentProductsSlice.reducer;
