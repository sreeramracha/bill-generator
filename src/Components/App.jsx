import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Cart from "./Cart";
import Home from "./Home";

function Routing() {
	const [cartCount, setCartCount] = useState(0);
	const [cartProductList, setCartProductList] = useState([]);

	function addCartProductList(newProduct) {
		const existingProduct = cartProductList.find(
			(product) => newProduct.id === product.id
		);

		if (existingProduct) {
			setCartProductList((prevValue) => {
				return prevValue.map((item) => {
					return item.id === newProduct.id
						? { ...item, quantity: item.quantity + 1 }
						: item;
				});
			});
		} else {
			setCartProductList((prevValue) => {
				return [...prevValue, { ...newProduct, quantity: 1 }];
			});
		}

		setCartCount(cartCount + 1);

		// console.log(`Cart Count=${cartCount}`);
		// console.log(cartProductList);
	}

	return (
		<Routes>
			<Route
				path="/"
				element={
					<Home
						cartCount={cartCount}
						addCartProductList={addCartProductList}
					/>
				}
			/>
			<Route
				path="/cart"
				element={
					<Cart
						cartCount={cartCount}
						cartProductList={cartProductList}
					/>
				}
			/>
		</Routes>
	);
}

function App() {
	return (
		<>
			<Routing />
		</>
	);
}

export default App;
