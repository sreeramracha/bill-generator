import React from "react";

export default function ProductList(props) {
	function handleCartProductList() {
		props.addCartProductList(props.item);
	}

	return (
		<>
			<div className="product">
				<img src={props.item.image} alt="Loading" />
				<p>{props.item.name}</p>
				<p>Price: ₹{props.item.price}</p>
				<button onClick={handleCartProductList}>Add to Cart</button>
			</div>
		</>
	);
}
