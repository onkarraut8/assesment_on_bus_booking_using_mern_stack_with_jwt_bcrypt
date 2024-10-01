const User = require("../model/User");
const Booking = require("../model/Booking");
const Bus = require("../model/Bus");
const jwt = require("jsonwebtoken");
const SECRETE_KEY = process.env.SECRETE_KEY || 'Secret123';


//Save Booking to database
exports.createBooking = async (req, res) => {
    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, SECRETE_KEY)
        const email = decoded.email
        const mobileNo = decoded.mobileNo
        const today = new Date().toISOString().split('T')[0]; // Format to YYYY-MM-DD
        const user = await User.findOne({
            $or: [{ email: email }, { mobileNo: mobileNo }]
        });

        if (!user) {
            res.json({ status: 'error', error: 'invalid token' })
        }
        var bus = await Bus.findOne({date: today});

        var remainSeats=0;

        if(bus){
          remainSeats = 10 - bus.bookedSeats;
        }else{
            bus = await Bus.create({totalSeats:10, bookedSeats:0, date:today})
            remainSeats = 10 - bus.bookedSeats;
        }
        console.log("date", req.body.noOfSeats);
        if(remainSeats >= req.body.noOfSeats){
            const booking = await Booking.create(req.body)
            bus.bookedSeats += parseInt(req.body.noOfSeats); // Increment booked seats
            await bus.save();
            console.log("booking" + booking.toString());
            res.status(200).json(booking);
        }else{
            console.log("date1", req.body.toString());
            res.json({ status: 'error', error: 'Seat is not available' })
        }

        

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }

};

//get all Bookings by user
exports.allBooking = async (req, res) => {


    try {
        console.log("AL Invalid token");
        const token = req.headers['x-access-token']
        const decoded = jwt.verify(token, SECRETE_KEY)
        const email = decoded.email
        const mobileNo = decoded.mobileNo
        const user = await User.findOne({
            $or: [{ email: email }, { mobileNo: mobileNo }]
        });

        if (!user) {
            console.log("AL Invalid token");
            res.json({ status: 'error', error: 'invalid token' })
        }

        const bookings = await Booking.find({ mobileNo: mobileNo });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

};

// cancel a Booking
exports.deleteBooking = async (req, res) => {
    try {
        const token = req.headers['x-access-token']
        const decoded = jwt.verify(token, SECRETE_KEY)
        const email = decoded.email
        const mobileNo = decoded.mobileNo
        const today = new Date().toISOString().split('T')[0]; // Format to YYYY-MM-DD
        const user = await User.findOne({
            $or: [{ email: email }, { mobileNo: mobileNo }]
        });

        if (!user) {
            res.json({ status: 'error', error: 'invalid token' })
        }

        const { id } = req.params;
        const bus = await Bus.findOne({date: today});
        var booking = await Booking.findOne({ _id: id, mobileNo: mobileNo });

        if(!bus){
            return res.status(404).json({ message: `booking is not canceled with ID ${id}` })
        }

        if (!booking) {
            return res.status(404).json({ message: `Cannot find any booking with ID ${id}` });
        }


        booking = await Booking.findByIdAndDelete(id);
        if (!booking) {
            return res.status(404).json({ message: `cannot find any Booking with ID ${id}` })
        }
       
        bus.bookedSeats -= parseInt(booking.noOfSeats); // Decrement booked seats
        await bus.save();
        res.status(200).json(booking);

    } catch (error) {
        console.log("AL ",error.message);
        res.status(500).json({ message: error.message })
    }


};


