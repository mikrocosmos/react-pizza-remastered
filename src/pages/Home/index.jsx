import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { AppContext } from "../../App";

import {
	Categories,
	Sort,
	PizzaBlock,
	Skeleton,
	Search,
	Pagination,
} from "../../components";

export default function Home({ pizzas, setPizzas }) {
	const { db } = React.useContext(AppContext);

	const { category, sortType, reversedSort } = useSelector(
		(state) => state.filter
	);

	const [allPizzas, setAllPizzas] = React.useState([]); // All pizzas array, for paginate
	const [loading, setLoading] = React.useState(true);
	const [page, setPage] = React.useState(1);
	const [searchValue, setSearchValue] = React.useState("");

	React.useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const [pizzasResponse, allPizzasResponse] = await Promise.all([
					axios.get(
						`
						${db}/pizzas?_sort=${sortType.sort}
						${category ? `&category=${category}` : ""}
						${reversedSort ? "&_order=desc" : "&_order=asc"}
						${searchValue ? `&q=${searchValue}` : ""}
						&_page=${page}&_limit=4
						`
						// Backend Search
					),
					axios.get(
						`
						${db}/pizzas?_sort=${sortType.sort}
						${category ? `&category=${category}` : ""}
						${reversedSort ? "&_order=desc" : "&_order=asc"}
						${searchValue ? `&q=${searchValue}` : ""}
						`
						// All pizzas response, for paginate
					),
				]);
				setPizzas(pizzasResponse.data);
				setAllPizzas(allPizzasResponse.data);
				setLoading(false);
			} catch (error) {
				alert("Ошибка: нет доступа к серверу.");
				console.error(error);
			}
		})();
	}, [setPizzas, category, sortType, reversedSort, searchValue, page, db]);

	return (
		<div className="container">
			<div className="content__top">
				<Search setSearchValue={setSearchValue} setPage={setPage} />
				<Categories setPage={setPage} />
				<Sort />
			</div>
			<main className="content">
				<h2 className="content__title">
					{searchValue ? `Ищем "${searchValue}"` : "Все пиццы"}
				</h2>
				<div className="content__items">
					{loading
						? [...new Array(10)].map(($, index) => <Skeleton key={index} />)
						: pizzas
								// .filter((item) =>
								// 	item.title.toLowerCase().includes(searchValue.toLowerCase())
								// )
								// Frontend Search
								.map((e) => <PizzaBlock key={e.id} elementID={e.id} {...e} />)}
				</div>
				{allPizzas.length > 4 && (
					<Pagination allPizzas={allPizzas} setPage={setPage} />
				)}
			</main>
		</div>
	);
}
