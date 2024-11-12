import React from "react";
import Navbar from "./Navbar";
import CartProduct from "./CartProduct";

export default function Cart(props) {
	return (
		<>
			<Navbar cartCount={props.cartCount} />
			<div>
				<p>Cart Items</p>
			</div>
			<div className="cart-product-list">
				{props.cartProductList.map((item) => (
					<CartProduct item={item} />
				))}
			</div>
		</>
	);
}
