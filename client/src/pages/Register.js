import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
	return (
		<section className="sectionCenter flexCenter">
			<div className="authCard">
				<div className="authCardHeaderWrap">
					<h2 className="authCardHeaderTitle">Register</h2>
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
							<label htmlFor="username" className="authCardLabel">
								Username
							</label>
							<input
								type="text"
								className="authCardInput"
								placeholder="Enter username..."
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
