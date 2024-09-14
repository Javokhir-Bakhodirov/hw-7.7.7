import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../../redux/api/productsApi";
import Container from "../../utils/container";

const SinglePage = () => {
	const { id } = useParams();
	const {
		data: product,
		isLoading,
		isError,
		isSuccess,
	} = useGetSingleProductQuery(id);

	if (isLoading) {
		return (
			<Container>
				<p>Loading...</p>
			</Container>
		);
	}

	if (isError) {
		return (
			<Container>
				<p>Error loading product data.</p>
			</Container>
		);
	}

	if (isSuccess && product) {
		return (
			<Container>
				<div className="p-4 max-w-3xl mx-auto">
					<h1 className="text-3xl font-bold mb-4">{product.title}</h1>

					{/* Display Product Images */}
					<div className="mb-4">
						{product.images && product.images.length > 0 && (
							<div className="relative">
								{product.images.map((imgUrl, index) => (
									<img
										key={index}
										src={imgUrl}
										alt={`Product Image ${index + 1}`}
										className={`w-full h-64 object-cover rounded-lg mb-4 ${
											index !== 0 && "hidden"
										}`}
										// Only the first image is shown by default
									/>
								))}
							</div>
						)}
					</div>

					<p className="text-lg text-gray-700 mb-4">{product.description}</p>
					<p className="text-xl font-semibold text-gray-800 mb-4">
						Price: ${product.price}
					</p>

					{/* Category Information */}
					{product.category && (
						<div className="mb-4">
							<h2 className="text-xl font-semibold">Category:</h2>
							<p className="text-lg text-gray-700">{product.category.name}</p>
							<img
								src={product.category.image}
								alt={product.category.name}
								className="w-32 h-32 object-cover rounded-lg mt-2"
							/>
						</div>
					)}
				</div>
			</Container>
		);
	}

	return null; // Handle any edge cases
};

export default SinglePage;
