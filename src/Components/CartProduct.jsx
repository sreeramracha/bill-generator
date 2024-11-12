export default function CartProduct(props) {
	return (
		<>
			<div className="cart-product">
				<div>
					<img src={props.item.image} alt="Image" />
				</div>
				<div>
					<p>{props.item.name}</p>
					<p>
						Quantity:
						<div>
							<button>-</button>
							{props.item.quantity}
							<button>+</button>
						</div>
					</p>
				</div>
				<div></div>
			</div>
		</>
	);
}
