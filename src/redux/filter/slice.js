import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	category: 0,
	sortType: { name: "умолчанию", sort: "id" },
	reversedSort: false, // Initial value: ascending
};

export const filterSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {
		setCategory(state, action) {
			state.category = action.payload;
		},
		setSortType(state, action) {
			state.sortType = action.payload;
		},
		setReversedSort(state, action) {
			state.reversedSort = action.payload;
		},
	},
});

export const { setCategory, setSortType, setReversedSort } =
	filterSlice.actions;

export default filterSlice.reducer;
