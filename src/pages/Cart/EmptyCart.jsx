import React from "react";
import { Link } from "react-router-dom";

export default function EmptyCart() {
	return (
		<div className="cart content cart--empty">
			<h2>
				Корзина пустая <icon>😕</icon>
			</h2>
			<p>
				Вероятнее всего, вы не заказывали ещё пиццу.
				<br />
				Для того, чтобы заказать пиццу, перейдите на главную страницу.
			</p>
			<img src="/img/empty-cart.png" alt="Empty cart" />
			<Link to="/" className="button button--black">
				<span>Вернуться назад</span>
			</Link>
		</div>
	);
}
