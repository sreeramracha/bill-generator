import React, { useEffect } from "react";
import Navbar from "./Navbar";
import CartProduct from "./CartProduct";

export default function Cart(props) {
	return (
		<>
			<Navbar cartCount={props.cartCount} />
			<div className="cart-items-header">
				<p>Cart Items</p>
				<hr />
			</div>
			<div className="cart-product-list">
				{props.cartProductList.map((item) => (
					<CartProduct
						item={item}
						addCartProductList={props.addCartProductList}
						subtractCartProductList={props.subtractCartProductList}
						changeCartProductList={props.changeCartProductList}
					/>
				))}
			</div>
		</>
	);
}
