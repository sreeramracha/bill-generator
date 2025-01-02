import axios from "axios";
import { useState } from "react";
import { addProductRoute } from "../utils/APIRoutes";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "../styles/addProduct.css";

export default function AddProduct() {
	const [productInfo, setProductInfo] = useState({
		company: "",
		category: "",
		name: "",
		price: "",
		image: null,
		// imagePath
		// imageFileName
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		if (name === "image") {
			setProductInfo((prevValue) => {
				return {
					...prevValue,
					image: event.target.files[0],
				};
			});
		} else {
			setProductInfo((prevValue) => {
				return {
					...prevValue,
					[name]: value,
				};
			});
		}
	};

	const handleAdd = () => {
		// console.log(productInfo);

		if (productInfo.image) {
			// Create a FormData object
			const formData = new FormData();
			formData.append("company", productInfo.company);
			formData.append("category", productInfo.category);
			formData.append("name", productInfo.name);
			formData.append("price", productInfo.price);
			formData.append("image", productInfo.image);

			// Make the Axios request
			axios
				.post(addProductRoute, formData, {
					headers: {
						"Content-Type": "multipart/form-data", // Set the correct header
					},
				})
				.then(function (response) {
					// console.log("Response:", response.data); // Log the server's response
					toast.success("Product Added Successfully");
				})
				.catch(function (error) {
					// console.log(error);
					toast.error("Error in adding product");
				});
		} else {
			axios
				.post(
					addProductRoute,
					{
						company: productInfo.company,
						category: productInfo.category,
						name: productInfo.name,
						price: productInfo.price,
					},
					{
						headers: { "Content-Type": "application/json" },
					}
				)
				.then(function (response) {
					// console.log("Response:", response.data); // Log the server's response
					toast.success("Product Added Successfully");
				})
				.catch(function (error) {
					// console.log(error);
					toast.error("Error in adding product");
				});
		}
	};

	return (
		<>
			<div className="update-product">
				<div className="update-field">
					<p>Company Name:</p>
					<input
						type="text"
						name="company"
						onChange={handleChange}
						value={productInfo.company}
					/>
				</div>
				<div className="update-field">
					<p>Category Name:</p>
					<input
						type="text"
						name="category"
						onChange={handleChange}
						value={productInfo.category}
					/>
				</div>
				<div className="update-field">
					<p>Product Name:</p>
					<input
						type="text"
						name="name"
						onChange={handleChange}
						value={productInfo.name}
					/>
				</div>
				<div className="update-field">
					<p>Price:</p>
					<input
						type="text"
						name="price"
						onChange={handleChange}
						value={productInfo.price}
					/>
				</div>
				<div className="update-field">
					<p>Product Image:</p>
					<input type="file" name="image" onChange={handleChange} />
				</div>
				<button onClick={handleAdd}>Add Product</button>

				<Link to="/">
					<button className="back-to-home-page">
						Back to Home Page
					</button>
				</Link>
			</div>
		</>
	);
}
