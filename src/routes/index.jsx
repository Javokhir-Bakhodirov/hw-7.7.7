import { useRoutes } from "react-router-dom";
import { lazy } from "react";
import Suspense from "../utils";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Home = lazy(() => import("../routes/home/Home"));
const Profile = lazy(() => import("../routes/profile/Profile"));
const Auth = lazy(() => import("../routes/auth/Auth"));
const Login = lazy(() => import("../routes/auth/login/Login"));
const SignUp = lazy(() => import("../routes/auth/signup/SignUp"));
const NotFound = lazy(() => import("../routes/not-found/NotFound"));
const Private = lazy(() => import("../routes/private/Private"));
const SinglePage = lazy(() => import("../routes/single-page/SinglePage"));
const Cart = lazy(() => import("../routes/cart/Cart"));

const RouteController = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scroll(0, 0);
	}, [pathname]);

	return useRoutes([
		{
			path: "/",
			element: (
				<Suspense>
					<Home />
				</Suspense>
			),
		},
		{
			path: "/profile",
			element: (
				<Suspense>
					<Private />
				</Suspense>
			),
			children: [
				{
					path: "/profile/",
					element: (
						<Suspense>
							<Profile />
						</Suspense>
					),
				},
			],
		},
		{
			path: "/auth",
			element: (
				<Suspense>
					<Auth />
				</Suspense>
			),
			children: [
				{
					path: "/auth/login",
					element: (
						<Suspense>
							<Login />
						</Suspense>
					),
				},
				{
					path: "/auth/signup",
					element: (
						<Suspense>
							<SignUp />
						</Suspense>
					),
				},
			],
		},
		{
			path: "*",
			element: (
				<Suspense>
					<NotFound />
				</Suspense>
			),
		},

		{
			path: "/products/:id",
			element: (
				<Suspense>
					<SinglePage />
				</Suspense>
			),
		},

		{
			path: "/cart",
			element: (
				<Suspense>
					<Cart />
				</Suspense>
			),
		},
	]);
};

export default RouteController;
