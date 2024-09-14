import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Button, Modal, Form, Input } from "antd";
import { useState } from "react";
import { useEditProductMutation } from "../../redux/api/productsApi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";

const Card = ({ product }) => {
	const dispatch = useDispatch();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [form] = Form.useForm();
	const [editProduct] = useEditProductMutation();

	const showModal = () => {
		setIsModalOpen(true);
		form.setFieldsValue({
			title: product.title,
			description: product.description,
			price: product.price,
		});
	};

	const handleAddToCart = (product) => {
		dispatch(addToCart({ ...product, quantity: 1 }));
	};

	const handleOk = async () => {
		try {
			const values = await form.validateFields();
			await editProduct({ id: product.id, ...values });
			setIsModalOpen(false);
		} catch (error) {
			console.error("Validation failed:", error);
		}
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
			<div className="img-wrapper">
				<Link to={`/products/${product.id}`}>
					<img
						src={product.images[0]}
						alt={product.title}
						className="w-full h-64 object-cover"
					/>
				</Link>
			</div>
			<div className="p-4 flex justify-between items-end">
				<div className="space-y-auto">
					<h3 className="text-lg font-semibold mb-4 line-clamp-1 ">
						{product.title}
					</h3>
					<p className="text-gray-600 text-sm mb-4 line-clamp-6">
						{product.description}
					</p>
					<p className="text-lg font-bold text-blue-600 mb-4">
						${product.price}
					</p>
				</div>
				{localStorage.getItem("token") && (
					<div className="p-4">
						<Button
							type="primary"
							className="flex justify-center items-center"
							onClick={showModal}
						>
							<AiOutlineEdit className="text-2xl" />
						</Button>

						<button className="" onClick={() => handleAddToCart(product)}>
							<AiOutlineShoppingCart className="text-2xl" />
						</button>
						<Modal
							title="Edit Product"
							open={isModalOpen}
							onOk={handleOk}
							onCancel={handleCancel}
						>
							<Form
								form={form}
								name="editProduct"
								labelCol={{ span: 8 }}
								wrapperCol={{ span: 16 }}
								autoComplete="off"
							>
								<Form.Item
									label="Title"
									name="title"
									rules={[
										{ required: true, message: "Please enter the title!" },
									]}
								>
									<Input />
								</Form.Item>

								<Form.Item
									label="Description"
									name="description"
									rules={[
										{
											required: true,
											message: "Please enter the description!",
										},
									]}
								>
									<Input.TextArea rows={4} />
								</Form.Item>

								<Form.Item
									label="Price"
									name="price"
									rules={[
										{ required: true, message: "Please enter the price!" },
									]}
								>
									<Input type="number" />
								</Form.Item>
							</Form>
						</Modal>
					</div>
				)}
			</div>
		</div>
	);
};

export default Card;
