import React, { useState } from "react"; //-
import { TiShoppingCart } from "react-icons/ti";
import { Link } from "react-router-dom";

export default function Cart(props) {
	return (
		<>
			<div className="cart-container">
				<div className="cart-heading">
					{/* <p>TEJASWINI SALES CORPORATION</p> */}
					<p>TESTING TESTING</p>
				</div>
				<div className="cart-body">
					<Link to="/cart" className="cart-box">
						<TiShoppingCart size={50} />
						<span className="cart-notification">
							{props.cartCount}
						</span>
					</Link>
				</div>
			</div>
		</>
	);
}
