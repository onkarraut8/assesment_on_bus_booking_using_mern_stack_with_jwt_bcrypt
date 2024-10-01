const mongoose =  require("mongoose");

const bookingSchema = mongoose.Schema({
    name: { type: String, required: true },
    mobileNo: { type: Number, required: true },
    noOfSeats: { type: Number, min: 1, max: 2 },
    date: Date,
});
const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;