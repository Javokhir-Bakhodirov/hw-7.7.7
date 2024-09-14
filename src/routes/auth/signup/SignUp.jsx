import { Button, Form, Input, Typography, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { useSignUpMutation } from "../../../redux/api/authApi";

const { Title, Text } = Typography;

const SignUp = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [signUpRequest, { data, isLoading, isError, isSuccess, error }] =
		useSignUpMutation();

	// Handle form submit (onFinish)
	const onFinish = (values) => {
		signUpRequest(values);
	};

	console.log(data);

	// Handle successful signup
	useEffect(() => {
		if (isSuccess) {
			notification.success({
				message: "Successfully signed up! Go ahead 😊",
			});
			navigate("/profile");
		}
	}, [isSuccess]);

	// Handle error cases
	useEffect(() => {
		if (isError) {
			notification.error({
				message: "Sign-up failed",
				description:
					error?.data?.message ||
					"Something went wrong during the sign-up process.",
			});
		}
	}, [isError]);

	// Handle form submission failure
	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<Form
			className="p-4"
			name="signUpForm"
			layout="vertical"
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
		>
			<Title level={2} className="text-center">
				Sign Up
			</Title>
			{/* Name Input */}
			<Form.Item
				label="Name"
				name="name"
				rules={[
					{
						required: true,
						message: "Please input your name!",
					},
				]}
			>
				<Input />
			</Form.Item>

			{/* Email Input */}
			<Form.Item
				label="Email"
				name="email"
				rules={[
					{
						required: true,
						type: "email",
						message: "Please input a valid email!",
					},
				]}
			>
				<Input />
			</Form.Item>

			{/* Password Input */}
			<Form.Item
				label="Password"
				name="password"
				rules={[
					{
						required: true,
						message: "Please input your password!",
					},
					{
						min: 6,
						message: "Password must be at least 6 characters long!",
					},
				]}
			>
				<Input.Password />
			</Form.Item>

			{/* Avatar Input */}
			<Form.Item
				label="Avatar"
				name="avatar"
				rules={[
					{
						required: true,
						message: "Please input your avatar URL!",
					},
					{
						type: "url",
						message: "Please enter a valid URL!",
					},
				]}
			>
				<Input />
			</Form.Item>

			{/* Submit Button */}
			<Form.Item>
				<Button
					className="w-full"
					type="primary"
					htmlType="submit"
					loading={isLoading} // Disable button when loading
				>
					Sign Up
				</Button>
			</Form.Item>

			{/* Redirect to Login */}
			<Text>
				Already have an account? <Link to="/auth/login">Log in</Link>
			</Text>
		</Form>
	);
};

export default SignUp;
