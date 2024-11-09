import React from "react";

export default function ProductList(props) {
	return (
		<>
			<div className="product">
				<img src={props.item.image} alt="Loading" />
				<p>{props.item.name}</p>
				<p>Price: ₹{props.item.price}</p>
			</div>
		</>
	);
}
