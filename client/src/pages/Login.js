import React from "react";
import { Link } from "react-router-dom";
import "../styles/Auth.scss";

const Login = () => {
	return (
		<section className="sectionCenter flexCenter">
			<div className="authCard">
				<div className="authCardHeaderWrap">
					<h2 className="authCardHeaderTitle">Sign In</h2>
				</div>
				<div className="authCardInputWrap">
					<form className="authCardForm">
						<div className="authCardInputItem">
							<label htmlFor="email" className="authCardLabel">
								Email
							</label>
							<input
								type="email"
								className="authCardInput"
								placeholder="Enter email..."
								required
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
								required
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
