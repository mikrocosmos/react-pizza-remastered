import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	totalPrice: 0,
	cartItems: [],
};

const cart = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addPizza(state, action) {
			const findItem = state.cartItems.find(
				(obj) => obj.id === action.payload.id
			);
			if (findItem) {
				findItem.count++;
			} else {
				state.cartItems.push({ ...action.payload, count: 1 });
			}
			state.totalPrice = state.cartItems.reduce((sum, e) => {
				return e.price * e.count + sum;
			}, 0);
		},
		removePizza(state, action) {
			state.cartItems = state.cartItems.filter((e) => e.id !== action.payload);
		},
		clearPizza(state) {
			state.cartItems = [];
		},
	},
});

export const { addPizza, removePizza, clearPizza } = cart.actions;

export default cart.reducer;
