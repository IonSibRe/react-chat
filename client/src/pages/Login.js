import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { UsersContext } from "../context/UsersContext";
import "../styles/Auth.scss";

const Login = () => {
	const { login, loggedIn } = useContext(UsersContext);
	const [userInfo, setUserInfo] = useState({
		email: "",
		password: "",
	});

	// TODO refactor email, username, password to single object
	const submitHandler = (e) => {
		e.preventDefault();

		login(userInfo);
		setUserInfo({});
	};

	if (loggedIn) return <Redirect to="/" />;

	return (
		<section className="sectionCenter flexCenter">
			<div className="authCard">
				<div className="authCardHeaderWrap">
					<h2 className="authCardHeaderTitle">Sign In</h2>
				</div>
				<div className="authCardInputWrap">
					<form className="authCardForm" onSubmit={submitHandler}>
						<div className="authCardInputItem">
							<label htmlFor="email" className="authCardLabel">
								Email
							</label>
							<input
								type="email"
								className="authCardInput"
								placeholder="Enter email..."
								value={userInfo.email ?? ""}
								required
								onChange={(e) =>
									setUserInfo({
										...userInfo,
										email: e.target.value,
									})
								}
							/>
						</div>
						<div className="authCardInputItem">
							<label htmlFor="" className="authCardLabel">
								Password
							</label>
							<input
								type="password"
								className="authCardInput"
								placeholder="Enter password..."
								value={userInfo.password ?? ""}
								required
								onChange={(e) =>
									setUserInfo({
										...userInfo,
										password: e.target.value,
									})
								}
							/>
						</div>

						<button type="submit" className="authCardSubmitBtn">
							Log In
						</button>

						<Link to="/register" className="authCardAccText">
							Create an Account Here
						</Link>
					</form>
				</div>
			</div>
		</section>
	);
};

export default Login;
