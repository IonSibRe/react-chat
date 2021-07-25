const Joi = require("joi");

// Register validation
const registerValidation = (data) => {
	const schema = Joi.object({
		username: Joi.string().min(4).required(),
		email: Joi.string().email().min(6).required(),
		password: Joi.string().min(4).required(),
	});

	return schema.validate(data);
};

// Login validation
const loginValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().min(6).required(),
		password: Joi.string().min(4).required(),
	});

	return schema.validate(data);
};

module.exports = { registerValidation, loginValidation };
