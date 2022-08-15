import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSortType, setReversedSort } from "../redux/filter/slice";

export function Sort() {
	const { sortType, reversedSort } = useSelector((state) => state.filter);
	const dispatch = useDispatch();

	const sortEl = React.useRef();

	const [activePopup, setActivePopup] = React.useState(false);
	const sorts = [
		{ name: "умолчанию", sort: "id" },
		{ name: "популярности", sort: "rating" },
		{ name: "цене", sort: "price" },
		{ name: "алфавиту", sort: "title" },
	];
	const onClickLi = (e) => {
		dispatch(setSortType(e));
		setActivePopup(false);
	};

	React.useEffect(() => {
		const handleClick = (event) => {
			if (!event.composedPath().includes(sortEl.current)) {
				setActivePopup(false);
			}
		};
		document.body.addEventListener("click", handleClick);
		return () => document.body.removeEventListener("click", handleClick);
	}, []);

	return (
		<div ref={sortEl} className="sort">
			<div className="sort__label">
				<svg
					onClick={() => dispatch(setReversedSort(!reversedSort))}
					className={reversedSort ? "reversed" : ""}
					width={10}
					height={6}
					viewBox="0 0 10 6"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
						fill="#2C2C2C"
					/>
				</svg>
				<b>Сортировка по:</b>
				<span onClick={() => setActivePopup(!activePopup)}>
					{sortType.name}
				</span>
			</div>
			{activePopup && (
				<div className="sort__popup">
					<ul>
						{sorts.map((e) => (
							<li
								key={e.name}
								onClick={() => onClickLi(e)}
								className={sortType.sort === e.sort ? "active" : ""}>
								{e.name}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
