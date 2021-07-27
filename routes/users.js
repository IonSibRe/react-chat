const router = require("express").Router();
const {
	userRegister,
	userLogin,
	getCurrentUser,
} = require("../controllers/UsersController");
const verify = require("../utils/api/verifyToken");

router.get("/:id", verify, getCurrentUser);
router.post("/register", userRegister);
router.post("/login", userLogin);

module.exports = router;
