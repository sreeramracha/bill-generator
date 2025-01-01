import React, { useEffect, useState } from "react";
import { getProductImageRoute } from "../utils/APIRoutes";
import axios from "axios";

export default function ProductList(props) {
	const [image, setImage] = useState(null);

	function handleCartProductList() {
		props.addCartProductList(props.item);
	}

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
		}
	}, [props.item]);

	return (
		<>
			<div className="product">
				<img src={image} alt="Loading" />
				<p>{props.item.name}</p>
				<p>Price: ₹{props.item.price}</p>
				<button onClick={handleCartProductList}>Add to Cart</button>
			</div>
		</>
	);
}
