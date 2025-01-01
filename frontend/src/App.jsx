import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "./Pages/Cart";
import Home from "./Pages/Home";
import Login from "./Pages/Login";

function Routing() {
	const [cartCount, setCartCount] = useState(0);
	const [cartProductList, setCartProductList] = useState([]);

	useEffect(() => {
		setCartCount(cartProductList.length);
	}, [cartProductList]);

	function addCartProductList(newProduct) {
		const existingProduct = cartProductList.find(
			(product) => newProduct._id === product._id
		);

		if (existingProduct) {
			setCartProductList((prevValue) => {
				return prevValue.map((item) => {
					return item._id === newProduct._id
						? { ...item, quantity: item.quantity + 1 }
						: item;
				});
			});
		} else {
			setCartProductList((prevValue) => {
				return [...prevValue, { ...newProduct, quantity: 1 }];
			});
		}

		// setCartCount(cartProductList.length);

		// console.log(`Cart Count=${cartCount}`);
		// console.log(cartProductList);
	}

	function subtractCartProductList(newProduct) {
		const existingProduct = cartProductList.find(
			(product) => newProduct._id === product._id
		);

		if (existingProduct) {
			setCartProductList((prevValue) => {
				return prevValue.map((item) => {
					return item._id === newProduct._id
						? { ...item, quantity: item.quantity - 1 }
						: item;
				});
			});
		} else {
			setCartProductList((prevValue) => {
				return [...prevValue, { ...newProduct, quantity: 1 }];
			});
		}

		// setCartCount(cartProductList.length);
	}

	function changeCartProductList(newProduct, changeQuantity) {
		const existingProduct = cartProductList.find(
			(product) => newProduct._id === product._id
		);

		if (existingProduct) {
			setCartProductList((prevValue) => {
				return prevValue.map((item) => {
					return item._id === newProduct._id
						? { ...item, quantity: changeQuantity }
						: item;
				});
			});
		} else {
			setCartProductList((prevValue) => {
				return [
					...prevValue,
					{ ...newProduct, quantity: changeQuantity },
				];
			});
		}

		// setCartCount(cartProductList.length);
	}

	function removeCartProductList(newProduct) {
		const updatedProductList = cartProductList.filter(
			(item) => item._id !== newProduct._id
		);

		setCartProductList(updatedProductList);
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
						addCartProductList={addCartProductList}
						subtractCartProductList={subtractCartProductList}
						changeCartProductList={changeCartProductList}
						removeCartProductList={removeCartProductList}
					/>
				}
			/>
			<Route path="/login" element={<Login />} />
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
