const Bus = require("../model/Bus");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const SECRETE_KEY = process.env.SECRETE_KEY || 'Secret123';



// get bus details by today
exports.busByToday = async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0]; // Format to YYYY-MM-DD
        const bus = await Bus.findOne({ date: today });
         
        if (!bus) {
            console.log("bus : "+bus);
            return res.status(404).json(bus);
        }
        res.status(200).json(bus);

    } catch (error) {
        console.log("bus : " + error.message);
        res.status(500).json({ message: error.message })
    }


};