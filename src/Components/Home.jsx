import React, { useEffect, useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { productItems } from "./ProductItems";
import ProductList from "./ProductList";
import { Link } from "react-router-dom";

export default function Home(props) {
	const [searchText, setSearchText] = useState("");
	const [filteredProducts, setFilteredProducts] = useState([]);

	useEffect(() => {
		// Update filteredProducts based on searchText
		if (searchText === "") {
			setFilteredProducts(productItems); // Display all products if searchText is empty
		} else {
			setFilteredProducts(
				productItems.filter((product) =>
					product.name
						.toLowerCase()
						.includes(searchText.toLowerCase())
				)
			);
		}
	}, [searchText]);

	function handleSearchText(event) {
		setSearchText(event.target.value);
	}

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
			<div className="search-bar">
				<input
					type="text"
					placeholder="Search product"
					value={searchText}
					onChange={handleSearchText}
				/>
				<button>Search</button>
			</div>
			<div className="product-list">
				{filteredProducts.map((item) => {
					return (
						<ProductList
							item={item}
							addCartProductList={props.addCartProductList}
						/>
					);
				})}
			</div>
		</>
	);
}
