import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UsersContext } from "../context/UsersContext";

const Home = () => {
	const { setCurrentUser, setCurrentRoom } = useContext(UsersContext);
	const history = useHistory();

	const submitHandler = (e) => {
		e.preventDefault();

		history.push("/chat");
	};

	useEffect(() => {
		setCurrentRoom("JavaScript");
	}, [setCurrentRoom]);

	return (
		<section className="sectionCenter flexCenter">
			<div className="authCard">
				<div className="authCardHeaderWrap">
					<h2 className="authCardHeaderTitle">Next Chat</h2>
				</div>
				<div className="authCardInputWrap">
					<form className="authCardForm" onSubmit={submitHandler}>
						<div className="authCardInputItem">
							<label htmlFor="username" className="authCardLabel">
								Username
							</label>
							<input
								type="text"
								className="authCardInput"
								onChange={(e) => setCurrentUser(e.target.value)}
								placeholder="Enter username..."
								required
							/>
						</div>
						<div className="authCardInputItem">
							<label htmlFor="room" className="authCardLabel">
								Room
							</label>
							<select
								className="authCardSelect"
								onChange={(e) => setCurrentRoom(e.target.value)}
							>
								<option
									value="JavaScript"
									className="authCardOption"
								>
									JavaScript
								</option>
								<option
									value="Python"
									className="authCardOption"
								>
									Python
								</option>
								<option value="Java" className="authCardOption">
									Java
								</option>
								<option value="Ruby" className="authCardOption">
									Ruby
								</option>
							</select>
						</div>
						<button type="submit" className="authCardSubmitBtn">
							Join Chat
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default Home;
