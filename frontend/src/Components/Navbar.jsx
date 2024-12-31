// import React from "react";
import { TiShoppingCart } from "react-icons/ti";
import { Link } from "react-router-dom";

export default function Navbar(props) {
	// const navigate = useNavigate();

	// function handleNavigation() {
	// 	navigate("/cart");
	// }

	return (
		<>
			<div className="cart-container">
				<div className="cart-heading">
					{/* <p>TEJASWINI SALES CORPORATION</p> */}
					<p>TESTING TESTING</p>
				</div>
				<div className="cart-body">
					<Link
						to="/cart"
						className="cart-box"
						// onClick={handleNavigation}
					>
						<TiShoppingCart size={50} />
						{props.cartCount > 0 ? (
							<span className="cart-notification">
								{props.cartCount}
							</span>
						) : null}
					</Link>
				</div>
			</div>
		</>
	);
}
