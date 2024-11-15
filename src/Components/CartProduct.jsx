import { IoMdAddCircleOutline } from "react-icons/io";
import { GrSubtractCircle } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";

export default function CartProduct(props) {
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

	return (
		<>
			<div className="cart-product">
				<div className="cart-product-image">
					<img src={props.item.image} alt="Loading" />
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
