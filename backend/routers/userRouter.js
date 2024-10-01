const express = require("express");
const userRoute = require("../controller/userController");
const router = express.Router();

router.post("/signup", userRoute.signup);
router.post("/login", userRoute.login);

module.exports = router;

