import React, { useEffect, useState } from "react";
import {
	deleteProductRoute,
	getProductImageRoute,
	updateProductRoute,
} from "../utils/APIRoutes";
import axios from "axios";
import { toast } from "react-toastify";

export default function ProductList(props) {
	const [image, setImage] = useState(null);
	const [productInfo, setProductInfo] = useState({
		company: props.item.company,
		category: props.item.category,
		name: props.item.name,
		price: props.item.price,
		image: null,
		// imagePath
		// imageFileName
	});

	useEffect(() => {
		try {
			axios
				.get(`${getProductImageRoute}/${props.item.imageFileName}`, {
					responseType: "arraybuffer", // Fetch as binary data
				})
				.then(function (response) {
					// Convert the binary data to a Blob
					const blob = new Blob([response.data], {
						type: "image/jpeg",
					});

					// Generate a URL for the Blob
					const imageUrl = URL.createObjectURL(blob);

					// Set the image source
					setImage(imageUrl);
				});
		} catch (error) {
			console.error("Error fetching image:", error);
			toast.error("Error fetching image:");
		}
	}, [props.item]);

	function handleCartProductList() {
		props.addCartProductList(props.item);
	}

	const handleUpdate = () => {
		console.log(productInfo);

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
				.put(updateProductRoute, formData, {
					headers: {
						"Content-Type": "multipart/form-data", // Set the correct header
					},
				})
				.then(function (response) {
					// console.log("Response:", response.data); // Log the server's response
					toast.success("Product Updated Successfully");
				})
				.catch(function (error) {
					// console.log(error);
					toast.error("Error in updating product");
				});
		} else {
			axios
				.put(
					updateProductRoute,
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
					toast.success("Product Updated Successfully");
				})
				.catch(function (error) {
					// console.log(error);
					toast.error("Error in updating product");
				});
		}
	};

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

	const handleDelete = () => {
		props.handleDeleteVariable();
		axios
			.post(deleteProductRoute, {
				id: props.item._id,
			})
			.then(function (response) {
				console.log("Response:", response.data); // Log the server's response
				toast.success("Product Deleted Successfully");
			})
			.catch(function (error) {
				console.log(error);
				toast.error("Error in deleting product");
			});
	};

	return (
		<>
			{!props.isEdit ? (
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
						<input
							type="file"
							name="image"
							onChange={handleChange}
						/>
					</div>
					<button onClick={handleUpdate}>Update Product</button>
					<button onClick={handleDelete}>Delete Product</button>
				</div>
			) : (
				<div className="product">
					<img src={image} alt="Loading" />
					<p>{props.item.name}</p>
					<p>Price: ₹{props.item.price}</p>
					{props.isAdmin ? (
						<button>Edit</button>
					) : (
						<button onClick={handleCartProductList}>
							Add to Cart
						</button>
					)}
				</div>
			)}
		</>
	);
}
