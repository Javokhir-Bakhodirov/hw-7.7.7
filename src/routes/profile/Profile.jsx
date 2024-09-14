import { useEffect } from "react";
import { useGetProfileQuery } from "../../redux/api/authApi";
import { notification } from "antd";
import { FiMail } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { getProfile } from "../../redux/slices/authSlice";

const Profile = () => {
	const { data, isLoading, isError, isSuccess } = useGetProfileQuery();

	const dispatch = useDispatch();

	useEffect(() => {
		if (isSuccess) {
			dispatch(getProfile({ user: data }));
			notification.success({
				message: "Successfully logged in! Go ahead 😊",
			});
		}

		if (isError) {
			notification.error({
				message: "Failed to fetch profile data!",
			});
		}
	}, [isSuccess, isError]);

	return (
		<div className="min-h-screen flex justify-center items-center  bg-gray-100">
			{isLoading && <p className="text-lg text-blue-500">Loading...</p>}

			{isSuccess && (
				<div className="bg-white p-6 mx-auto rounded-lg shadow-lg flex max-w-2xl w-full">
					{/* Left: Avatar */}
					<div className="flex-shrink-0">
						<img
							src={data?.avatar}
							alt="User Avatar"
							className="w-48 h-48 rounded-full object-cover"
						/>
					</div>

					{/* Right: Profile Info */}
					<div className="ml-8 flex flex-col justify-center">
						<p className="text-2xl font-semibold text-gray-800">
							Username: {data?.name}
						</p>

						<div className="flex items-center mt-4 text-lg text-gray-600">
							<FiMail className="mr-2" /> {/* Email icon */}
							<a
								href={`mailto:${data?.email}`}
								className="hover:text-blue-500 transition duration-300"
							>
								{data?.email}
							</a>
						</div>
					</div>
				</div>
			)}

			{isError && (
				<p className="text-red-500 text-lg">Error loading profile data.</p>
			)}
		</div>
	);
};

export default Profile;
