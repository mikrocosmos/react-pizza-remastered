import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const db = "http://localhost:3001/cart";

export const fetchCart = createAsyncThunk(
	"cart/fetchCartStatus",
	async (params, thunkAPI) => {
		const { data } = await axios.get(db);
		return data;
	}
);

const initialState = {
	totalPrice: 0,
	cartItems: [],
	status: "loading",
};

const cart = createSlice({
	name: "cart",
	initialState,
	reducers: {
		renderPizza(state, action) {
			state.cartItems = action.payload;
		},
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
		minusItem(state, action) {
			const findItem = state.cartItems.find((obj) => obj.id === action.payload);

			if (findItem) {
				findItem.count--;
			}
		},
		removePizza(state, action) {
			state.cartItems = state.cartItems.filter((e) => e.id !== action.payload);
		},
		clearPizza(state) {
			state.cartItems = [];
			state.totalPrice = 0;
		},
	},
	extraReducers: {
		[fetchCart.pending]: (state) => {
			state.status = "loading";
			state.cartItems = [];
		},
		[fetchCart.fulfilled]: (state, action) => {
			console.log(action, "fulfilled");
			state.cartItems = action.payload;
		},
		[fetchCart.rejected]: (state, action) => {
			console.log(action, "rejected");
			state.status = "error";
			state.cartItems = [];
		},
	},
});

export const selectCart = (state) => state.cartItems;
export const selectCartItemById = (id) => (state) =>
	state.cart.cartItems.find((obj) => obj.id === id);

export const { renderPizza, addPizza, removePizza, clearPizza } = cart.actions;

export default cart.reducer;
