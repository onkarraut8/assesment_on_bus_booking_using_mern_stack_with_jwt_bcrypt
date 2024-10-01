const mongoose =  require("mongoose");

const busSchema = mongoose.Schema({
    totalSeats: { type: Number, max: 10, default:10 },
    bookedSeats: { type: Number, max: 10, default:0 },
    date: { type: Date},
});
const Bus = mongoose.model("Bus", busSchema);

module.exports = Bus;