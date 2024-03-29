import React from "react";
import styles from "./NotFound.module.scss";
import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<div className={styles.root}>
			<h2>
				<b>404:</b> Ничего не найдено.
			</h2>
			<p>
				Этой страницы не существует.
				<br />
				<Link className={styles.link} to="/">
					Вернуться на главную.
				</Link>
			</p>
		</div>
	);
}
