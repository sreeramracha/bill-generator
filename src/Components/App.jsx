import React from "react";
import { Routes, Route } from "react-router-dom";
import Cart from "./Cart";
import Home from "./Home";

function Routing() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/cart" element={<Cart />} />
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
