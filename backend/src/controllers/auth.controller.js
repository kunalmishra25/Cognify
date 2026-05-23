const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

async function register(req, res) {
    const { fullname, email, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            { email }
        ]
    })
    if (isUserAlreadyExist) {
        return res.status(409).json({
            message: "User Already Exist"
        })
    }

    if (!fullname || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }
    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullname,
        email,
        password: hash,
    })


    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token);

    res.status(201).json({
        message: "User Registered",
        user: {
            id: user._id,
            email: user.email,
            fullname: user.fullname,
        }
    })
}

async function login(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email: email
    })

    if (!user) {
        return res.status(401).json({
            message: "Invalid Credentials"
        })
    }

    if (!email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid Credentials"
        })
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        message: "Login Successfull",
        user: {
            id: user._id,
            email: user.email,
            fullname: user.fullname,
        }
    })

}

async function logout(req, res) {
    res.clearCookie("token")
    res.status(200).json({
        message: "Logged out successfully"
    })
}

async function getMe(req, res) {
    res.status(200).json({
        user: {
            id: req.user._id,
            email: req.user.email,
            fullname: req.user.fullname
        }
    })
}

module.exports = { register, login, logout, getMe }