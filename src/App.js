import React from "react";
import { Route, Routes } from "react-router-dom";
import "./scss/app.scss";
import { Header } from "./components";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

export const AppContext = React.createContext({});

export default function App() {
	const [pizzas, setPizzas] = React.useState([]);
	const db = "http://localhost:3001";

	return (
		<div className="wrapper">
			<AppContext.Provider value={{ db }}>
				<Header />
				<Routes>
					<Route
						index
						element={<Home pizzas={pizzas} setPizzas={setPizzas} />}></Route>
					<Route path="/cart" element={<Cart />}></Route>
					<Route path="*" element={<NotFound />}></Route>
				</Routes>
			</AppContext.Provider>
		</div>
	);
}
