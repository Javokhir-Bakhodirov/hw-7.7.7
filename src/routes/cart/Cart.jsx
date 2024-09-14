import React from "react";
import Container from "../../utils/container";
import { useSelector, useDispatch } from "react-redux";
import Card from "../../components/card/Card";
import { clearCart } from "../../redux/slices/cartSlice";

const Cart = () => {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.cart.products);

	const handleCleatCart = () => {
		dispatch(clearCart());
	};

	const calculateTax = (subtotal) => {
		return (subtotal * 0.12).toFixed(2);
	};

	const calculateTotal = () => {
		const subtotal = calculateSubtotal();
		const tax = calculateTax(subtotal);
		return (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);
	};
	return (
		<section className="cart-section pt-[50px]  pb-[150px] h-[100vh] ">
			<Container>
				<div className="cart-title-wrapper flex justify-between">
					<h1 className="cart-title text-3xl ">Cart</h1>
					<button
						onClick={() => handleCleatCart()}
						className="clear-cart text-2xl py-2 px-4 rounded-md bg-red-600"
					>
						Clear Cart
					</button>
				</div>

				<ul className="grid grid-cols-4 gap-10 mt-10">
					{products.map((product) => (
						<Card key={product.id} product={product} cardType="cart" />
					))}
				</ul>
			</Container>
		</section>
	);
};

export default Cart;
