import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.scss";

const Navbar = () => {
	const [loggedIn, setLoggedIn] = useState(false);

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
						"Test 1"
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
