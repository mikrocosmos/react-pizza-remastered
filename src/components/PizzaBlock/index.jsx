import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addPizza } from "../../redux/cart/slice";
import { AppContext } from "../../App";

export function PizzaBlock({ id, title, price, imageUrl, sizes, types }) {
	const pizzaTypes = ["тонкое", "традиционное"];
	const [activeType, setActiveType] = React.useState(0);
	const [activeSize, setActiveSize] = React.useState(0);
	const [pizzaPrice, setPizzaPrice] = React.useState(price);
	const { db } = React.useContext(AppContext);

	const dispatch = useDispatch();
	const cartItem = useSelector((state) =>
		state.cart.cartItems.find((e) => e.id === id)
	);
	const count = cartItem ? cartItem.count : 0;

	function onAdd() {
		const item = {
			id,
			title,
			price: pizzaPrice,
			imageUrl,
			size: activeSize,
			type: pizzaTypes[activeType],
		};
		dispatch(addPizza(item));
		axios.post(`${db}/cart`, item);
	}

	React.useEffect(
		(elementPrice) => {
			elementPrice = price + sizes[activeSize] * 2 + activeType * 20;
			setPizzaPrice(elementPrice);
		},
		[activeSize, activeType, price, sizes]
	);

	return (
		<div className="pizza-block">
			<img className="pizza-block__image" src={imageUrl} alt={title} />
			<h4 className="pizza-block__title">{title}</h4>
			<div className="pizza-block__selector">
				<ul>
					{types.map((e) => (
						<li
							className={activeType === e ? "active" : ""}
							onClick={() => setActiveType(e)}
							key={e}>
							{pizzaTypes[e]}
						</li>
					))}
				</ul>
				<ul>
					{sizes.map((e, index) => (
						<li
							className={activeSize === index ? "active" : ""}
							onClick={() => setActiveSize(index)}
							key={e}>
							{e} см.
						</li>
					))}
				</ul>
			</div>
			<div className="pizza-block__bottom">
				<div className="pizza-block__price">{pizzaPrice} ₽</div>
				<button
					onClick={() => onAdd()}
					className="button button--outline button--add">
					<svg
						width={12}
						height={12}
						viewBox="0 0 12 12"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
							fill="white"
						/>
					</svg>
					<span>Добавить</span>
					{count > 0 && <i>{count}</i>}
				</button>
			</div>
		</div>
	);
}
