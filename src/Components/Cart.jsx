import React from "react";
import Navbar from "./Navbar";

export default function Cart(props) {
	return (
		<>
			<Navbar cartCount={props.cartCount} />
		</>
	);
}
