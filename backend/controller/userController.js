const User = require("../model/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRETE_KEY = process.env.SECRETE_KEY || 'Secret123';

exports.signup = async(req, res) => {
    try {
        const { name, role, email,mobileNo, password } = req.body;
        console.log("SU "+name);
        const user = await User.findOne({
            $or: [{ email: email }, { mobileNo: mobileNo }]
        });
        if (user) {
            console.log("User already exists "+ email + " or "+ mobileNo);
            return res.status(400).json({ status: 400, message: "User already exists "+ email + " or "+ mobileNo });
        }
        const hashPassword = await bcryptjs.hash(password, 10);
        const createdUser = new User({
            name: name,
            role: role,
            email: email,
            mobileNo: mobileNo,
            password: hashPassword,
        });
        await createdUser.save();
        console.log("User "+name);
        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: createdUser._id,
                name: createdUser.name,
                role: createdUser.role,
                mobileNo: createdUser.mobileNo,
                email: createdUser.email,
            },
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({status: 500, message: "Internal server error" });
    }
};


exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!user || !isMatch) {
            return res.status(400).json({ status: 400, message: "Invalid username or password" });
        } else {

            const jwtToken = jwt.sign(
                {
                    name: user.name,
                    email: user.email,
                    mobileNo:user.mobileNo,
                },
                SECRETE_KEY
            )


            res.status(200).json({
                message: "Login successful",
                user: {
                    _id: user._id,
                    name: user.name,
                    role: user.role,
                    mobileNo:user.mobileNo,
                    email: user.email,
                },
                token:jwtToken,
            });
        }
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({status: 500, message: "Internal server error" });
    }
};


