const express = require("express");
const adminRouter = require("../controller/adminController");

const router = express.Router();


router.get("/allBooking", adminRouter.allBooking);
router.get("/users", adminRouter.allUser);


module.exports = router;