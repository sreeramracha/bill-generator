import { IoMdAddCircleOutline } from "react-icons/io";
import { GrSubtractCircle } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import axios from "axios";
import { getProductImageRoute } from "../utils/APIRoutes";

export default function CartProduct(props) {
	const [image, setImage] = useState(null);
	const [productQuantity, setProductQuantity] = useState();

	function handleProductQuantity(event) {
		setProductQuantity(Number(event.target.value));
	}

	function handleAddCartProduct() {
		props.addCartProductList(props.item);
	}

	function handleSubtractCartProduct() {
		props.subtractCartProductList(props.item);
	}

	function handleChangeCartProduct() {
		if (productQuantity > 0) {
			props.changeCartProductList(props.item, productQuantity);
		}
		setProductQuantity("");
	}

	function handleRemoveCartProduct() {
		props.removeCartProductList(props.item);
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
			<div className="cart-product">
				<div className="cart-product-image">
					<img src={image} alt="Loading" />
				</div>
				<div className="cart-product-name">
					<p>{props.item.name}</p>
					<p>
						Quantity:
						<div className="cart-product-quantity">
							{props.item.quantity === 1 ? (
								<RiDeleteBin6Line
									className="cart-icon"
									onClick={handleRemoveCartProduct}
								/>
							) : (
								<GrSubtractCircle
									className="cart-icon"
									onClick={handleSubtractCartProduct}
								/>
							)}

							<input
								type="text"
								placeholder={props.item.quantity}
								value={productQuantity}
								onChange={handleProductQuantity}
								onBlur={handleChangeCartProduct}
							/>

							<IoMdAddCircleOutline
								className="cart-icon"
								onClick={handleAddCartProduct}
							/>
						</div>
					</p>
					<div className="cart-product-remove">
						<button onClick={handleRemoveCartProduct}>
							Remove from Cart
						</button>
					</div>
				</div>
				<div className="cart-prodcut-price">₹{props.item.price}</div>
			</div>
		</>
	);
}
