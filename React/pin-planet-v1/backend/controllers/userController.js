const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!email || !password || !name) {
            return res.status(400).json({ message: "required fields are missing" })
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(409).json({ message: "User already exists", field: "email" });
        }
        const hashedPassword = await bcrypt.hash(password, Number(process.env.PASSWORD_SALT));
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "required fields are missing" })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Invalid credentials", exists: false, field: "email" });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(409).json({ exists: isPasswordMatch, message: "Invalid credentials", field: "password" });
        }
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "3d"
            }
        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 3 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({ user, exists: isPasswordMatch, message: "Login successful" });
    } catch (error) {
        res.status(500).json({ message: error.message, exists: false });
    }
};

const logoutUser = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged Out" });
};

module.exports = { loginUser, logoutUser, createUser };