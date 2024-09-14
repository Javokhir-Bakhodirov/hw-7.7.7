import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Dropdown, Space } from "antd";
import { addToCart, removeFromCart } from "../../redux/slices/cartSlice";

const DropDownCart = () => {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.cart.products);
	const [localProducts, setLocalProducts] = useState(products);

	useEffect(() => {
		setLocalProducts(products);
	}, [products]);

	const handleAddToCart = (product, e) => {
		e.stopPropagation();
		dispatch(addToCart({ ...product, quantity: 1 }));
	};

	const handleRemoveFromCart = (product, e) => {
		e.stopPropagation();
		dispatch(removeFromCart(product));
	};

	return (
		<Dropdown
			className=""
			menu={{
				items: localProducts.map((product) => ({
					key: product.id,
					label: (
						<div className="flex items-center space-x-2 p-2 border-b border-gray-200">
							<img
								className="w-16 h-16 object-cover"
								src={product.images[0]}
								alt={product.title}
							/>
							<div className="flex-1">
								<p className="text-sm font-medium text-gray-900 line-clamp-1">
									{product.title}
								</p>
								<p className="text-sm text-gray-600">
									${(product.price * product.quantity).toFixed(2)}
								</p>
								<div className="flex items-center space-x-2 mt-2">
									<button
										className="px-3 py-1 bg-blue-600 text-white rounded-md text-xs"
										onClick={(e) => handleRemoveFromCart(product, e)}
									>
										-
									</button>
									<p className="text-xs">{product.quantity}</p>
									<button
										className="px-3 py-1 bg-blue-600 text-white rounded-md text-xs"
										onClick={(e) => handleAddToCart(product, e)}
									>
										+
									</button>
								</div>
							</div>
						</div>
					),
				})),
			}}
		>
			<a onClick={(e) => e.preventDefault()}>
				<Space>
					<Link to="/cart">
						<div className="relative">
							<AiOutlineShoppingCart className="text-3xl  text-gray-800" />
							{products.length > 0 && (
								<span className="absolute top-[-13px] right-[-13px] bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
									{products.length}
								</span>
							)}
						</div>
					</Link>
				</Space>
			</a>
		</Dropdown>
	);
};

export default DropDownCart;
