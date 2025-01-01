import React, { useEffect, useState } from "react";
// import { productItems } from "./ProductItems";
import ProductList from "../Components/ProductList";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { getAllProductsRoute } from "../utils/APIRoutes";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";

export default function Home(props) {
	const [searchText, setSearchText] = useState("");
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [productItems, setProductItems] = useState([]);
	const [isAdmin, setIsAdmin] = useState(false);
	const [isEdit, setIsEdit] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		axios.get(getAllProductsRoute).then(function (response) {
			setProductItems(response.data);
			setFilteredProducts(response.data);
			// console.log(response);
		});
	}, []);

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

	const handleEdit = () => {
		setIsAdmin(true);
		setIsEdit(!isEdit);
		navigate("/");
	};

	return (
		<>
			<Navbar cartCount={props.cartCount} />

			<div className="search-bar">
				<input
					type="text"
					placeholder="Search product"
					value={searchText}
					onChange={handleSearchText}
				/>
				<button className="search-button">Search</button>

				<button className="edit-products" onClick={handleEdit}>
					{isEdit ? "Edit Products" : "Save Changes"}
				</button>
			</div>
			<div className="product-list">
				{filteredProducts.map((item) => {
					return (
						<ProductList
							key={item._id}
							item={item}
							addCartProductList={props.addCartProductList}
							isEdit={isEdit}
						/>
					);
				})}
			</div>
		</>
	);
}
