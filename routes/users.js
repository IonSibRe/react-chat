const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {
	registerValidation,
	loginValidation,
} = require("../utils/api/validation");

router.post("/register", async (req, res) => {
	// Validation
	const { error } = registerValidation(req.body);
	const errMessage = error ? error["details"][0].message : null;

	if (error) return res.status(400).send(errMessage);

	console.log(error);

	// Check if user already is registered
	const user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send("Email already exists");

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
		res.send({ id: savedUser._id });
	} catch (err) {
		res.status(400).send(err);
	}
});

router.post("/login", async (req, res) => {
	// Validation
	const { error } = loginValidation(req.body);
	const errMessage = error ? error["details"][0].message : null;

	if (error) return res.status(400).send(errMessage);

	// Check if email exists
	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send("Invalid Credentials");

	// Check Password
	const validPassword = await bcrypt.compare(
		req.body.password,
		user.password
	);
	if (!validPassword) return res.status(400).send("Invalid Credentials");

	// Generate JWT
	const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);

	res.header("auth-token", token).json({ token });
});

module.exports = router;
