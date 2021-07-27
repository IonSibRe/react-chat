const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {
	registerValidation,
	loginValidation,
} = require("../utils/api/validation");

const userRegister = async (req, res) => {
	// Validation
	const { error } = registerValidation(req.body);
	const errMessage = error ? error["details"][0].message : null;

	if (error)
		return res.status(400).json({ success: false, errMsg: errMessage });

	console.log(error);

	// Check if user already is registered
	const user = await User.findOne({ email: req.body.email });
	if (user)
		return res
			.status(400)
			.json({ success: false, errMsg: "Email already exists" });

	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	const newUser = new User({
		username: req.body.username,
		email: req.body.email,
		password: hashedPassword,
	});

	try {
		const savedUser = await User.create(newUser);
		res.status(200).json({ success: true, id: savedUser._id });
	} catch (err) {
		res.status(400).json({ success: false, errMsg: err });
	}
};

const userLogin = async (req, res) => {
	// Validation
	const { error } = loginValidation(req.body);
	const errMessage = error ? error["details"][0].message : null;

	if (error)
		return res.status(400).json({ success: false, errMsg: errMessage });

	// Check if email exists
	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).json({ errMsg: "Invalid Credentials" });

	// Check Password
	const validPassword = await bcrypt.compare(
		req.body.password,
		user.password
	);
	if (!validPassword)
		return res.status(400).json({ errMsg: "Invalid Credentials" });

	// Generate JWT
	const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);

	res.header("Authorization", `Bearer ${token}`)
		.status(200)
		.json({
			success: true,
			id: user._id,
			username: user.username,
			token: `Bearer ${token}`,
		});
};

const getCurrentUser = async (req, res) => {
	try {
		const resUser = await User.findById(req.params.id);
		if (!resUser)
			return res
				.status(404)
				.json({ success: false, errMsg: "User Not Found" });

		res.status(200).json({
			success: true,
			user: { id: resUser._id, username: resUser.username },
		});
	} catch (err) {
		res.status(500).json({ success: false, errMsg: "Server Error" });
	}
};

module.exports = { userRegister, userLogin, getCurrentUser };
