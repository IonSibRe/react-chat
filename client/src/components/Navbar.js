import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UsersContext } from "../context/UsersContext";
import "../styles/Navbar.scss";

const Navbar = () => {
	const { loggedIn, user, logout } = useContext(UsersContext);

	return (
		<nav className="nav">
			<div className="nav-inner sectionCenter">
				<div className="nav-logo-wrap">
					<Link to="/" className="nav-title">
						Next Chat
					</Link>
				</div>
				<div className="nav-user-wrap">
					{loggedIn ? (
						<h4 className="nav-username">
							{" "}
							{user.username} |{" "}
							<button
								type="button"
								onClick={logout}
								className="nav-logout-btn"
							>
								Logout
							</button>{" "}
						</h4>
					) : (
						<Link to="/login" className="nav-user-link">
							<i className="fas fa-user"></i>
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
