const Booking = require("../model/Booking");
const Bus = require("../model/Bus");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const SECRETE_KEY = process.env.SECRETE_KEY || 'Secret123';



exports.allUser = async(req, res) => {

    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, SECRETE_KEY)
		const email = decoded.email
        const user = await User.findOne({ email: email })
        
        if(!user){
            res.json({ status: 400, error: 'invalid token' })
        }
          console.log("1");
        const users = await User.find({});
        console.log("1 :"+users.toString());
          res.status(200).json(users);
      } catch (error) {
          res.status(500).json({status: 500, message: error.message})
      }
  
  };

  //get all Bookings
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

        const Bookings = await Booking.find();
        res.status(200).json(Bookings);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

};