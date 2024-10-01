const express = require("express");
const bookRouter = require("../controller/bookController");

const router = express.Router();


router.get("/all", bookRouter.allBooking);
router.post("/save", bookRouter.createBooking);
router.delete("/cancel/:id", bookRouter.deleteBooking);



module.exports = router;