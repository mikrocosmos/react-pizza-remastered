import React from "react";
import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";

export function Pagination({ allPizzas, setPage }) {
	return (
		<ReactPaginate
			className={styles.root}
			breakLabel="..."
			nextLabel=">"
			onPageChange={(event) => setPage(++event.selected)}
			pageRangeDisplayed={4}
			pageCount={Math.ceil(allPizzas.length / 4)}
			previousLabel="<"
			renderOnZeroPageCount={null}
			activeClassName={styles.selected}
			activeLinkClassName={styles.selected__link}
		/>
	);
}
