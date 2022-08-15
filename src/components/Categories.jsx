import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../redux/filter/slice";

export function Categories({ setPage }) {
	const categories = [
		"Все",
		"Мясные",
		"Вегетарианские",
		"Гриль",
		"Острые",
		"Закрытые",
	];
	const category = useSelector((state) => state.filter.category);
	const dispatch = useDispatch();
	const onChangeCategory = (index) => {
		dispatch(setCategory(index));
		setPage(1);
	};

	return (
		<div className="categories">
			<ul>
				{categories.map((title, index) => (
					<li
						className={category === index ? "active" : ""}
						onClick={() => onChangeCategory(index)}
						key={title}>
						{title}
					</li>
				))}
			</ul>
		</div>
	);
}
