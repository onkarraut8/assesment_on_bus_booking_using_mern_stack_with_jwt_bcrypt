const express = require("express");
const busRouter = require("../controller/busController");

const router = express.Router();

router.get("/gettodaybus", busRouter.busByToday);


module.exports = router;