import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { UsersContext } from "../context/UsersContext";

const Register = () => {
	const { register, loggedIn } = useContext(UsersContext);
	const [userInfo, setUserInfo] = useState({
		email: "",
		username: "",
		password: "",
	});

	// TODO refactor email, username, password to single object
	const submitHandler = (e) => {
		e.preventDefault();

		register(userInfo);
		setUserInfo({});
	};

	if (loggedIn) return <Redirect to="/" />;

	return (
		<section className="sectionCenter flexCenter">
			<div className="authCard">
				<div className="authCardHeaderWrap">
					<h2 className="authCardHeaderTitle">Register</h2>
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
							<label htmlFor="username" className="authCardLabel">
								Username
							</label>
							<input
								type="text"
								className="authCardInput"
								placeholder="Enter username..."
								value={userInfo.username ?? ""}
								required
								onChange={(e) =>
									setUserInfo({
										...userInfo,
										username: e.target.value,
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
							Sign Up
						</button>

						<Link to="/login" className="authCardAccText">
							Sign In Here
						</Link>
					</form>
				</div>
			</div>
		</section>
	);
};

export default Register;
