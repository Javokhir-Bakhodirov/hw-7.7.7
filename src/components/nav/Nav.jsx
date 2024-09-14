import React from "react";
import Container from "../../utils/container";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import DropDownCart from "../dropdown/DropDownCart";

const Nav = () => {
	const user = useSelector((state) => state.auth.user);
	console.log(user);

	return (
		<header className="header bg-white z-10 sticky inset-x-0 top-0 shadow-lg shadow-slate-200">
			<Container>
				<div className="flex justify-between items-center">
					<div className="logo-wrapper">
						<Link to="/">
							<p className="logo"> Redux Toolkit </p>
						</Link>
					</div>
					<div className="profile-wrapper">
						{localStorage.getItem("token") ? (
							<div className="flex items-center justify-center space-x-4">
								<DropDownCart />
								<Link to="/profile">
									{" "}
									<img
										className="avatar "
										width={50}
										alt="avatar"
										height={50}
										src={user?.user.avatar}
									/>{" "}
								</Link>
							</div>
						) : (
							<Link to="/auth/login"> Login </Link>
						)}
					</div>
				</div>
			</Container>
		</header>
	);
};

export default Nav;
