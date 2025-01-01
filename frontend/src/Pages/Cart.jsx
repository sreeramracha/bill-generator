import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import CartProduct from "../Components/CartProduct";

export default function Cart(props) {
	const [cartPrice, setCartPrice] = useState(0);

	useEffect(() => {
		const tempCartPrice = props.cartProductList.reduce(function (
			sum,
			item
		) {
			return sum + item.price * item.quantity;
		},
		0);

		setCartPrice(tempCartPrice);
	}, [props.cartProductList]);

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
						removeCartProductList={props.removeCartProductList}
					/>
				))}
			</div>

			<div className="break-line">
				<hr />
			</div>

			<div className="cart-items-total-price">
				<p>Total</p>
				<p>₹{cartPrice}</p>
			</div>

			<div className="cart-items-place-order">
				<button>Place Order</button>
			</div>
		</>
	);
}
