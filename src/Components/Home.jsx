import React, { useState } from "react";
import { productItems } from "./ProductItems";
import ProductList from "./ProductList";

export default function Home() {
	console.log(productItems);

	const [searchText, setSearchText] = useState("");

	function handleSearchText(event) {
		setSearchText(event.target.value);
	}

	return (
		<>
			<div className="search-bar">
				<input
					type="text"
					placeholder="Enter an item you want to select"
					value={searchText}
					onChange={handleSearchText}
				/>
				<button>Search</button>
			</div>
			<div className="product-list">
				{productItems.map((item) => {
					return <ProductList item={item} />;
				})}
			</div>
		</>
	);
}
